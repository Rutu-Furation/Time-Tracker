import {
  AdminEntity,
  AdminModel,
  LoginModel,
} from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface LogoutAdminUsecase {
  execute: () => Promise<any>;
}

export class LogoutAdmin implements LogoutAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(): Promise<void> {
    return await this.adminRepository.logout();
  }
}
