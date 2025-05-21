import { IsString, IsNumber, IsNotEmpty, IsObject } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsObject()
  rating: {
    rate: number;
    count: number;
  };
}
