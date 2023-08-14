import { AdminEntity } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";

export interface GetAdminByIdUsecase {
  execute: (adminId: string) => Promise<AdminEntity | null>;
}

export class GetAdminById implements GetAdminByIdUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId: string): Promise<AdminEntity | null> {
    return await this.adminRepository.(adminId);
  }
}
