import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Payload() userData: Partial<User>) {
    return this.usersService.create(userData);
  }

  @MessagePattern({ cmd: 'get-all-users' })
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'update-user' })
  async updateUser(@Payload() data: { id: string; updateData: Partial<User> }) {
    return this.usersService.update(data.id, data.updateData);
  }

  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser(@Payload() id: string) {
    return this.usersService.delete(id);
  }
}
