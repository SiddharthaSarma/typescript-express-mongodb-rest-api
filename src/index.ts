import { config } from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { allRestaurants, bulkWrite } from './controllers/Restaurant';
config();
const uri = process.env.MONGO_URI;
const app = express();
mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log('error');
  } else {
    console.log('connected to database successfully');
  }
});

app.get('/', allRestaurants);
app.get('/bulk-write', bulkWrite);
app.listen('3000', () => console.log('Started server'));
