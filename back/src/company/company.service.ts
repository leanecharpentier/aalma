import { Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "typeorm/entities/Company";
import { AppDataSource } from "DataSource";
import { InsertResult } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class CompanyService {
  /**
   * Create a new company in the database.
   * @param createCompanyDto data to create a new company
   * @returns Promise<InsertResult>
   */
  async create(createCompanyDto: CreateCompanyDto): Promise<InsertResult> {
    return await AppDataSource.getRepository(Company)
      .createQueryBuilder("company")
      .insert()
      .values(createCompanyDto)
      .execute();
  }

  /**
   * Return all companies in the database.
   * @returns Promise<Company[]>
   */
  async findAll(): Promise<Company[]> {
    return await AppDataSource.getRepository(Company)
      .createQueryBuilder("company")
      .getMany();
  }

  /**
   * Return a company with the given id.
   * @param {number} id Company id
   * @returns Promise<Company | null>
   */
  async findOne(id: number): Promise<Company | null> {
    return await AppDataSource.getRepository(Company)
      .createQueryBuilder("company")
      .where("company.id = :id", { id: id })
      .getOne();
  }

  /**
   * Update a company with the given id.
   * @param id Company id
   * @param updateCompanyDto Updated company data
   * @returns Promise<UpdateResult>
   */
  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<UpdateResult> {
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
   * @returns Promise<DeleteResult>
   */
  async remove(id: number): Promise<DeleteResult> {
    return await AppDataSource.getRepository(Company)
      .createQueryBuilder("company")
      .delete()
      .where("company.id = :id", { id: id })
      .execute();
  }
}
