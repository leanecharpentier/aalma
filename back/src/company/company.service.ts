import { Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "typeorm/entities/Company";
import { AppDataSource } from "DataSource";

@Injectable()
export class CompanyService {
  async create(createCompanyDto: CreateCompanyDto) {
    return await AppDataSource.getRepository(Company)
      .createQueryBuilder("company")
      .insert()
      .values(createCompanyDto)
      .execute();
  }

  /**
   * Return all companies in the database.
   * @returns Company[]
   */
  async findAll(): Promise<Company[]> {
    return await AppDataSource.getRepository(Company)
      .createQueryBuilder("company")
      .getMany();
  }

  /**
   * Return a company with the given id.
   * @param {number} id Company id
   * @returns Company | null
   */
  async findOne(id: number): Promise<Company | null> {
    return await AppDataSource.getRepository(Company)
      .createQueryBuilder("company")
      .where("company.id = :id", { id: id })
      .getOne();
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await AppDataSource.getRepository(Company)
      .createQueryBuilder("company")
      .update()
      .set(updateCompanyDto)
      .where("company.id = :id", { id: id })
      .execute();
  }

  /**
   * Delete a company with the given id.
   * @param {number} id Company id
   * @returns DeleteResult
   */
  async remove(id: number) {
    return await AppDataSource.getRepository(Company)
      .createQueryBuilder("company")
      .delete()
      .where("company.id = :id", { id: id })
      .execute();
  }
}
