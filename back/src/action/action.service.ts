import { Injectable } from "@nestjs/common";
import { CreateActionDto } from "./dto/create-action.dto";
import { UpdateActionDto } from "./dto/update-action.dto";
import { AppDataSource } from "DataSource";
import { Action } from "typeorm/entities/Action";

@Injectable()
export class ActionService {
  create(createActionDto: CreateActionDto) {
    return "This action adds a new action";
  }

  async findAll() {
    return await AppDataSource.getRepository(Action)
      .createQueryBuilder("action")
      .leftJoinAndSelect("action.category", "category")
      .getMany();
  }

  async findOne(id: string) {
    return await AppDataSource.getRepository(Action)
      .createQueryBuilder("action")
      .leftJoinAndSelect("action.category", "category")
      .where("action.id = :id", { id })
      .getOne();
  }

  update(id: number, updateActionDto: UpdateActionDto) {
    return `This action updates a #${id} action`;
  }

  remove(id: number) {
    return `This action removes a #${id} action`;
  }
}
