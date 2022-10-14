import { Body, Delete, Get, Controller, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // READ
    @Get('inquryall')
    getAllUser() {
        return this.userService.findAll();
    }

    @Get('inqury:id')
    getOneUser(@Param('id') userId: number) {
        return this.userService.findOne(userId);
    }

    // CREATE
    @Post('insert')
    createUser(@Body() req) {
        return this.userService.createUser(req);
    }

    // DELETE
    @Delete('delete:id')
    removeUser(@Param('id') userId: number) {
        return this.userService.remove(userId);
    }

    // UPDATE
    @Patch('update:id')
    updateUser(@Param('id') userId: number, @Body() req) {
        return this.userService.update(userId, req);
    }

    //...
}
