import { NextFunction, Request, Response } from "express";
import {
  AdminModel,
  AdminEntity,
  AdminMapper,
} from "@domain/admin/entities/admin";
import { CreateAdminUsecase } from "@domain/admin/usecases/create-admin";
// import { DeleteAdminUsecase } from "@domain/admin/usecases/delete-admin";
// import { GetAdminByIdUsecase } from "@domain/admin/usecases/get-admin-by-id";
// import { UpdateAdminUsecase } from "@domain/admin/usecases/update-admin";
// import { GetAllAdminsUsecase } from "@domain/admin/usecases/get-all-admins";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export class AdminService {
  private readonly createAdminUsecase: CreateAdminUsecase;
  // private readonly deleteAdminUsecase: DeleteAdminUsecase;
  // private readonly getAdminByIdUsecase: GetAdminByIdUsecase;
  // private readonly updateAdminUsecase: UpdateAdminUsecase;
  // private readonly getAllAdminsUsecase: GetAllAdminsUsecase;

  constructor(
    createAdminUsecase: CreateAdminUsecase,
    // deleteAdminUsecase: DeleteAdminUsecase,
    // getAdminByIdUsecase: GetAdminByIdUsecase,
    // updateAdminUsecase: UpdateAdminUsecase,
    // getAllAdminsUsecase: GetAllAdminsUsecase
  ) {
    this.createAdminUsecase = createAdminUsecase;
    // this.deleteAdminUsecase = deleteAdminUsecase;
    // this.getAdminByIdUsecase = getAdminByIdUsecase;
    // this.updateAdminUsecase = updateAdminUsecase;
    // this.getAllAdminsUsecase = getAllAdminsUsecase;
  }

  async createAdmin(req: Request, res: Response): Promise<void> {
    const adminData: AdminModel = AdminMapper.toModel(req.body);

    const newAdmin: Either<ErrorClass, AdminEntity> =
      await this.createAdminUsecase.execute(adminData);

    newAdmin.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AdminEntity) => {
        const resData = AdminMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }
 
}
