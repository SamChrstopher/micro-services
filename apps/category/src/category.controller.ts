// src/category/category.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'create-category' })
  create(@Payload() createDto: CreateCategoryDto) {
    return this.categoryService.create(createDto);
  }

  @MessagePattern({ cmd: 'update-category' })
  update(@Payload() payload: { id: string; updateDto: UpdateCategoryDto }) {
    return this.categoryService.update(payload.id, payload.updateDto);
  }

  @MessagePattern({ cmd: 'find-all-categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @MessagePattern({ cmd: 'find-category-by-id' })
  findById(@Payload() id: string) {
    return this.categoryService.findById(id);
  }

  @MessagePattern({ cmd: 'delete-category' })
  delete(@Payload() id: string) {
    return this.categoryService.delete(id);
  }
}
