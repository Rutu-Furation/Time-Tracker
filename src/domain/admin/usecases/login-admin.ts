import { AdminEntity, AdminModel, LoginModel } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface LoginAdminUsecase {
  execute: (email: string, password: string) => Promise<any>;
}

export class LoginAdmin implements LoginAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(
    email:string,
    password:string
  ): Promise<any> {
    
    return await this.adminRepository.login(email, password);
  }
}
