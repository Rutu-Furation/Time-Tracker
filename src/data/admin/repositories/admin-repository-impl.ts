import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { AdminDataSource } from "@data/admin/datasources/admin-data-source";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";

export class AdminRepositoryImpl implements AdminRepository {
  private readonly dataSource: AdminDataSource;

  constructor(dataSource: AdminDataSource) {
    this.dataSource = dataSource;
  }

  async createAdmin(
    admin: AdminModel
  ): Promise<Either<ErrorClass, AdminEntity>> {
    try {
      let i = await this.dataSource.create(admin);
      
      return Right<ErrorClass, AdminEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, AdminEntity>(ApiError.emailExist());
      }
      return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }

  async getAdminById(id: string): Promise<Either<ErrorClass, AdminEntity>> {
    try {
      let response = await this.dataSource.getById(id);
      return Right<ErrorClass, AdminEntity>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, AdminEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }
}