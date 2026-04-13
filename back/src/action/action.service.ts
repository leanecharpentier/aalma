import { Injectable, Search } from "@nestjs/common";
import { CreateActionDto } from "./dto/create-action.dto";
import { UpdateActionDto } from "./dto/update-action.dto";
import { AppDataSource } from "DataSource";
import { Action } from "typeorm/entities/Action";

@Injectable()
export class ActionService {
  create(createActionDto: CreateActionDto) {
    return "This action adds a new action";
  }

  async findAll(filters: object) {
    const query = AppDataSource.getRepository(Action)
      .createQueryBuilder("action")
      .leftJoinAndSelect("action.category", "category");
    if (Object.keys(filters).length !== 0) {
      Object.keys(filters).forEach((property) => {
        if (property === "search") {
          query.andWhere(
            "action.name LIKE :search OR description LIKE :search",
            {
              search: `%${filters[property]}%`,
            },
          );
        } else {
          query.andWhere(`${property} = :value`, { value: filters[property] });
        }
      });
    }
    return await query.orderBy("category.id").getMany();
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
