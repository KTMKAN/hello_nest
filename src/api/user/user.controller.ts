import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Delete,
    Put,
    ParseIntPipe,
    Res,
    HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // READ
    @Get('')
    async findAll(@Res() res: Response) {
        const users = await this.userService.findAll();

        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':id')
    async getOneUser(@Param('id', new ParseIntPipe()) id: number, @Res() res: Response,) {
        const responseDto = await this.userService.findOne(id);

        return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
    }

    // CREATE
    @Post('')
    async create(@Body() req, @Res() res: Response) {
        const user = await this.userService.createUser(req);

        return res.status(HttpStatus.CREATED).json(user);
    }

    // DELETE
    @Delete(':id')
    removeUser(@Param('id') userId: number) {
        return this.userService.remove(userId);
    }
    async delete(@Param('id', new ParseIntPipe()) id: number, @Res() res: Response) {
        await this.userService.remove(id);

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    // UPDATE
    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() req, @Res() res: Response) {
        const updatedUser = await this.userService.update(id, req);

        return res.status(HttpStatus.OK).json(updatedUser);
    }

    //...
}
