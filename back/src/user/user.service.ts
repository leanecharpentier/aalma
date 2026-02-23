import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AppDataSource } from "DataSource";
import { User } from "typeorm/entities/User";
import { customAlphabet } from "nanoid";
import { InsertResult } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class UserService {
  /**
   * Create a new user in the database.
   * @param createUserDto data to create a new user
   * @returns Promise<InsertResult>
   */
  async create(createUserDto: CreateUserDto): Promise<InsertResult> {
    const generateId = customAlphabet(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      32,
    );
    createUserDto.id = generateId(32);
    createUserDto.name = `${createUserDto.firstname} ${createUserDto.lastname}`;
    return await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
  }

  /**
   * Get all users from the database.
   * @returns Promise<User[]>
   */
  async findAll(): Promise<User[]> {
    return await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .getMany();
  }

  /**
   * Get one user from the database by id.
   * @param id string User id
   * @returns Promise<User | null>
   */
  async findOne(id: string): Promise<User | null> {
    return await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: id })
      .getOne();
  }

  /**
   * Update a user in the database by id.
   * @param id string User id
   * @param updateUserDto Updated user data
   * @returns Promise<UpdateResult>
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    if (updateUserDto.firstname) {
      await this.findOne(id).then((user) => {
        updateUserDto.name = `${updateUserDto.firstname} ${user?.lastname}`;
      });
    }
    if (updateUserDto.lastname) {
      await this.findOne(id).then((user) => {
        updateUserDto.name = `${user?.firstname} ${updateUserDto.lastname}`;
      });
    }
    if (updateUserDto.name) {
      updateUserDto.firstname = updateUserDto.name?.split(" ")[0];
      updateUserDto.lastname = updateUserDto.name?.split(" ")[1];
    }
    return await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where("id = :id", { id: id })
      .execute();
  }

  /**
   * Delete a user from the database by id.
   * @param id string User id
   * @returns Promise<DeleteResult>
   */
  async remove(id: string): Promise<DeleteResult> {
    return await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();
  }
}
