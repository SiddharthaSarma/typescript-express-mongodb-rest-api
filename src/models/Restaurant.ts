import * as mongoose from 'mongoose';
import { IRestaurant } from '../interfaces/IRestaurant';

const RestaurantSchema = new mongoose.Schema({
  name: String,
  city: String,
  cuisine_style: [String],
  ranking: Number,
  rating: Number,
  number_of_reviews: Number,
  is_updated: Boolean
});

export const Restaurant = mongoose.model<IRestaurant>(
  'Restaurants',
  RestaurantSchema
);
