import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from 'typeorm/entities/Company';
import { AppDataSource } from 'DataSource';

@Injectable()
export class CompanyService {
  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

  findAll() {
    return `This action returns all company`;
  }

  async findOne(id: number): Promise<Company | null> {
    return await AppDataSource
    .getRepository(Company)
    .createQueryBuilder("company")
    .where("company.id = :id", { id: id })
    .getOne();
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
