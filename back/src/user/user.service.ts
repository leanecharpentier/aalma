import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AppDataSource } from "DataSource";
import { User } from "typeorm/entities/User";
import { customAlphabet } from "nanoid";
import { InsertResult } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { DeleteResult } from "typeorm/browser";
import { Team } from "typeorm/entities/Team";
import { ImportUsersDto } from "./dto/import-user.dto";
import * as XLSX from "xlsx";

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
   * Create multiple users in the database from an Excel file.
   * @param request connected user to get company info
   * @param file exel file containing users to import
   * @param body contains the mapping info to link the data from the file to the database fields and to link the role names in the file to role ids in the database
   *
   * body must contain 2 fields:
   * - role_mapping: { // map which job matches which role
   *
   *  "3": string[], // CEO roles
   *
   *  "4": string[], // HR roles
   *
   *  "5": string[], // Manager roles
   *
   * }
   *
   * - global_mapping : { // Define where to find the data
   *
   * columns_for_names: number; // Number of columns for name (generally one or two)
   *
   * name_column: string; // If only one column, which one
   *
   * first_name_column: string; // If two columns, the first name one
   *
   * last_name_column: string; // If two columns, the last name one
   *
   * last_name_first: boolean; // If one columns, which of the first or last name is written first
   *
   * email_column: string;
   *
   * role_column: string;
   *
   * team_column: string;
   *
   * }
   *
   * @returns
   */
  async import(
    request: Request,
    file: Express.Multer.File,
    body: ImportUsersDto,
  ): Promise<{ success: boolean; message: string }> {
    // Get info from the connected user (mainly which company)
    let connectedUser = (request as any).user;
    connectedUser = await this.findOne(connectedUser.id);
    const companyId = await connectedUser?.getCompanyId();
    // Get info from front (format not determined yet)
    const roleMapping: { [key: number]: string[] } = JSON.parse(
      body.role_mapping,
    );
    const globalMapping: {
      columns_for_names: number;
      name_column: string;
      first_name_column: string;
      last_name_column: string;
      last_name_first: boolean;
      email_column: string;
      role_column: string;
      team_column: string;
    } = JSON.parse(body.global_mapping);

    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const users: any[] = XLSX.utils.sheet_to_json(sheet);

    // Create users and teams if they don't exist, then assign users to teams and roles
    let successCount = 0;
    const errors: { user: any; error: string }[] = [];
    for (const user of users) {
      const createUserDto = new CreateUserDto();
      if (globalMapping.columns_for_names === 1) {
        createUserDto.name = user[globalMapping.name_column];
        if (globalMapping.last_name_first) {
          createUserDto.firstname =
            user[globalMapping.name_column].split(" ")[1];
          createUserDto.lastname =
            user[globalMapping.name_column].split(" ")[0];
        } else {
          createUserDto.firstname =
            user[globalMapping.name_column].split(" ")[0];
          createUserDto.lastname =
            user[globalMapping.name_column].split(" ")[1];
        }
      } else if (globalMapping.columns_for_names === 2) {
        createUserDto.firstname = user[globalMapping.first_name_column];
        createUserDto.lastname = user[globalMapping.last_name_column];
        createUserDto.name = `${user[globalMapping.first_name_column]} ${user[globalMapping.last_name_column]}`;
      }
      createUserDto.email = user[globalMapping.email_column];
      createUserDto.emailVerified = false;

      // Determine role_id based on the correspondingTable mapping
      const roleId = Number(
        Object.entries(roleMapping).find(([, values]) =>
          values
            .map((v) => v.toLowerCase())
            .includes(user[globalMapping.role_column].toLowerCase()),
        )?.[0] ?? 6,
      );
      createUserDto.role_id = roleId;

      // Get team or create it if it doesn't exist
      const team = await AppDataSource.getRepository(Team)
        .createQueryBuilder("team")
        .where("team.name = :name AND team.company_id = :companyId", {
          name: user[globalMapping.team_column],
          companyId: companyId,
        })
        .getOne();
      if (!team) {
        const newTeam = new Team();
        newTeam.name = user[globalMapping.team_column];
        newTeam.company_id = companyId;
        await AppDataSource.getRepository(Team).save(newTeam);
        createUserDto.team_id = newTeam.id;
      } else {
        createUserDto.team_id = team.id;
      }
      try {
        await this.create(createUserDto);
        successCount++;
      } catch (error) {
        errors.push({ user, error: error.message });
      }
    }

    let message = `${successCount} users imported successfully.`;
    if (errors.length > 0) {
      message += ` However, ${errors.length} users could not be imported. Reasons include: ${errors.map((e) => e.error).join("; ")}. Please check the data and try again.`;
    }

    return {
      success: errors.length === 0,
      message: message,
    };
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
