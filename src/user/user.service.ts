import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(userId: number): Promise<User> {
        // const user: User = await this.usersRepository.findOneById(userId);
        // if (!user) {
        //     throw new NotFoundException(`${userId} not found.`);
        // }
        return this.usersRepository.createQueryBuilder("user")
            .where("user.id = :id", { id: 1 })
            .getOne();
    }

    async createUser(req) {
        const newUser: User = this.usersRepository.create({
            id: req.id,
            intra_id: req.intra_id,
            nickname: req.nickname,
        });
        await this.usersRepository.insert(newUser);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async update(id: number, req): Promise<User> {
        const userToUpdate: User = await this.findOne(id);
        userToUpdate.nickname = req.nickname;
        return await this.usersRepository.save(userToUpdate);
    }
}
