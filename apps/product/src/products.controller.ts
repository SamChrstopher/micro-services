import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

//We're using Controller Decorator to control the services of the application.
@Controller('products') // base route will be /products
export class ProductsController {
  //We are injecting product service as dependency to product controller class via loose-coupling
  //Setters, Getters and binding is done by @Controller (Nest.js is taking care of it).
  constructor(private readonly productsService: ProductsService) {}

  // POST Request with the url parameter "/products"=> we can also add /create or something inside @Post('/create)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // GET /products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // PATCH /products/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  // DELETE /products/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
