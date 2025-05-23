import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(
    createDto: CreateCategoryDto,
  ): Promise<{ message: string; category: Category }> {
    this.logger.log(`Creating category: ${createDto.name}`);
    try {
      const existingCategory = await this.categoryModel
        .findOne({ name: createDto.name })
        .exec();

      if (existingCategory) {
        this.logger.warn(`Category already exists: ${createDto.name}`);
        throw new ConflictException('Category already exists');
      }

      const newCategory = new this.categoryModel(createDto);
      const savedCategory = await newCategory.save();
      this.logger.log(`Category created successfully: ${savedCategory._id}`);

      return {
        message: 'Category created successfully',
        category: savedCategory,
      };
    } catch (error) {
      this.logger.error(`Failed to create category: ${error.message}`);
      throw error;
    }
  }

  async createByName(name: string): Promise<Category> {
    this.logger.log(`Creating category by name: ${name}`);
    try {
      const existingCategory = await this.categoryModel.findOne({ name }).exec();
      if (existingCategory) {
        return existingCategory;
      }
      const newCategory = new this.categoryModel({ name });
      return await newCategory.save();
    } catch (error) {
      this.logger.error(`Failed to create category by name: ${error.message}`);
      throw error;
    }
  }

  async findByName(name: string): Promise<Category | null> {
    this.logger.log(`Finding category by name: ${name}`);
    try {
      const category = await this.categoryModel.findOne({ name }).exec();
      if (!category) {
        this.logger.log(`Category not found: ${name}`);
      }
      return category;
    } catch (error) {
      this.logger.error(`Failed to find category by name: ${error.message}`);
      throw error;
    }
  }

  async update(
    id: string,
    updateDto: UpdateCategoryDto,
  ): Promise<{ message: string; category: Category }> {
    this.logger.log(`Updating category: ${id}`);
    try {
      const updatedCategory = await this.categoryModel
        .findByIdAndUpdate(id, updateDto, { new: true })
        .exec();

      if (!updatedCategory) {
        throw new NotFoundException('Category not found');
      }

      return {
        message: 'Category updated successfully',
        category: updatedCategory,
      };
    } catch (error) {
      this.logger.error(`Failed to update category: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<{ message: string; categories: Category[] }> {
    this.logger.log('Finding all categories');
    try {
      const categories = await this.categoryModel.find().exec();
      return {
        message: categories.length > 0
          ? 'Categories retrieved successfully'
          : 'No categories found',
        categories,
      };
    } catch (error) {
      this.logger.error(`Failed to find categories: ${error.message}`);
      throw error;
    }
  }

  async findById(id: string): Promise<{ message: string; category: Category }> {
    this.logger.log(`Finding category by ID: ${id}`);
    try {
      const category = await this.categoryModel.findById(id).exec();
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return {
        message: 'Category retrieved successfully',
        category,
      };
    } catch (error) {
      this.logger.error(`Failed to find category by ID: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    this.logger.log(`Deleting category: ${id}`);
    try {
      const deleted = await this.categoryModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundException('Category not found');
      }
      return { message: 'Category deleted successfully' };
    } catch (error) {
      this.logger.error(`Failed to delete category: ${error.message}`);
      throw error;
    }
  }
}