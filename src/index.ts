import { config } from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { bulkWrite, getRestaurants } from './controllers/Restaurant';

config();

const uri = process.env.MONGO_URI;
const app = express();

// connnect to mongodb
mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log('error');
  } else {
    console.log('connected to database successfully');
  }
});

app.get('/', getRestaurants);
app.get('/bulk-write', bulkWrite);
app.listen('3000', () => console.log('Started server'));
