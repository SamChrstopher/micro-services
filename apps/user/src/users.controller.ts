import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Payload() userData: Partial<User>) {
    try {
      return await this.usersService.create(userData);
    } catch (error) {
      return { error: error.message };
    }
  }

  @MessagePattern({ cmd: 'find-user-by-email' })
  async findByEmail(@Payload() email: string) {
    return await this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'get-all-users' })
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'update-user' })
  async updateUser(@Payload() data: { id: string; updateData: Partial<User> }) {
    return await this.usersService.update(data.id, data.updateData);
  }

  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser(@Payload() id: string) {
    return await this.usersService.delete(id);
  }
}