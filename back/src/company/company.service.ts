import { Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "typeorm/entities/Company";
import { AppDataSource } from "DataSource";
import { InsertResult } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { DeleteResult } from "typeorm/browser";
import { User } from "typeorm/entities/User";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";

@Injectable()
export class CompanyService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  /**
   * Create a new company in the database.
   * @param createCompanyDto data to create a new company
   * @returns Promise<InsertResult>
   */
  async create(
    createCompanyDto: CreateCompanyDto,
    connectedUser: User,
  ): Promise<InsertResult | { success: boolean; message: string }> {
    try {
      const existingCompany = await AppDataSource.getRepository(Company)
        .createQueryBuilder("company")
        .where("company.name = :name", { name: createCompanyDto.name })
        .getOne();
      if (!existingCompany) {
        return await AppDataSource.getRepository(Company)
          .createQueryBuilder("company")
          .insert()
          .values(createCompanyDto)
          .execute();
      } else {
        this.activityLogService.log({
          userId: connectedUser.id,
          action: "company.created",
          status: ACTIVITY_FAIL,
          details: `Company ${createCompanyDto.name} already exists`,
        });
        return {
          success: false,
          message: `Company ${createCompanyDto.name} already exists`,
        };
      }
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "company.created",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
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
    connectedUser: User,
  ): Promise<UpdateResult | { success: boolean; message: string }> {
    try {
      return await AppDataSource.getRepository(Company)
        .createQueryBuilder("company")
        .update()
        .set(updateCompanyDto)
        .where("company.id = :id", { id: id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "company.updated",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  /**
   * Delete a company with the given id.
   * @param {number} id Company id
   * @returns Promise<DeleteResult>
   */
  async remove(
    id: number,
    connectedUser: User,
  ): Promise<DeleteResult | { success: boolean; message: string }> {
    try {
      return await AppDataSource.getRepository(Company)
        .createQueryBuilder("company")
        .delete()
        .where("company.id = :id", { id: id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "company.deleted",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }
}
