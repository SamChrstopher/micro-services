import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//We're Combining Union types to Product and MongoDB Document using mongo urm
export type ProductDocument = Product & Document;

//Creating Schema using Schema Decorator and asking Schema to have an option of timestamps when creating the document
@Schema({ timestamps: true })
export class Product {
  //Using Prop() decorator for validation, used for MongoDB validation for the Mongo Schema
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: Object }) // Can also create a sub-schema
  rating: {
    rate: number;
    count: number;
  };
}
//Class being forwarded for MongoDB as a collection through Mongoose Schema
export const ProductSchema = SchemaFactory.createForClass(Product);
