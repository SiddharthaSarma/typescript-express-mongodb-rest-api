import { Request, Response } from 'express';
import { Restaurant } from '../models/Restaurant';

export const allRestaurants = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    const pageNumber = parseInt(req.query.pageNumber, 10);
    const records = await Restaurant.find({ cuisine_style: 'Swiss' })
      .sort({ rating: -1 })
      .skip(pageNumber || 0)
      .limit(limit || 20);
    const recordsLength = await Restaurant.countDocuments();
    if (records && records.length) {
      res.json({ data: records, totalLength: recordsLength });
    }
  } catch (error) {
    console.log(error);
  }
};

export const bulkWrite = async (req: Request, res: Response) => {
  var ops: any = [];
  var count = 1;
  var records = await Restaurant.find({
    $where: 'return !this.is_updated'
  }).limit(12000);
  // var records: any = await Restaurant.findById('5c7a81a1ae493d2de40b51cd');
  // records = [records];
  records.forEach(async function(doc: any, i: number) {
    console.log(i);
    if (doc.cuisine_style && typeof doc.cuisine_style[0] === 'string') {
      doc.cuisine_style = doc.cuisine_style[0]
        .replace(/[\[\]']+/g, '')
        .split(',');
    }
    console.log(doc._id);
    console.log(doc.cuisine_style);
    ops.push({
      updateOne: {
        filter: { _id: doc._id },
        update: {
          $set: {
            cuisine_style: doc.cuisine_style ? [...doc.cuisine_style] : [],
            is_updated: true
          }
        }
      }
    });

    // if (ops.length) {
    //   const records = await Restaurant.bulkWrite(ops);
    //   console.log(count);
    //   count++;
    //   ops = [];
    //   res.send(records);
    // }
  });

  if (ops.length > 0) {
    const records = await Restaurant.bulkWrite(ops);
    ops = [];
    res.send(records);
  } else {
    console.log('done');
    res.send('done');
  }
};
