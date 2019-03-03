import * as mongoose from 'mongoose';
export interface IRestaurant extends mongoose.Document {
  name: string;
  city: string;
  cuisine_style: string[];
  ranking: number;
  rating: number;
  number_of_reviews: number;
  is_updated: boolean;
}
