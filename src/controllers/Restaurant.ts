import { Request, Response } from 'express';
import { Restaurant } from '../models/Restaurant';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    const pageNumber = (parseInt(req.query.page, 10) - 1) | 0;
    const records = await Restaurant.find({ cuisine_style: 'Swiss' })
      .sort({ rating: -1 })
      .skip(pageNumber * limit)
      .limit(limit || 20);
    const recordsLength = await Restaurant.countDocuments();
    if (records && records.length) {
      res.json({
        data: records,
        totalLength: recordsLength,
        pageNumber: pageNumber + 1,
        limit: limit || 20
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const bulkWrite = async (req: Request, res: Response) => {
  var ops: any = [];
  var records = await Restaurant.find({
    $where: 'return !this.is_updated'
  }).limit(12000);
  records.forEach(async function(doc: any) {
    if (doc.cuisine_style && typeof doc.cuisine_style[0] === 'string') {
      doc.cuisine_style = doc.cuisine_style[0]
        .replace(/[\[\]']+/g, '')
        .split(',');
    }
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
