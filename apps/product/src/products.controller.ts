import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  create(data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @MessagePattern({ cmd: 'get_all_products' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'get_product' })
  findOne(id: string) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(data: { id: string; dto: UpdateProductDto }) {
    return this.productsService.update(data.id, data.dto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(id: string) {
    return this.productsService.remove(id);
  }
}
