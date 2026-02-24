import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/role/role.decorator";
import { RolesGuard } from "src/role/roles.guards";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  findAll() {
    return this.companyService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  findOne(@Param("id") id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  remove(@Param("id") id: string) {
    return this.companyService.remove(+id);
  }
}
