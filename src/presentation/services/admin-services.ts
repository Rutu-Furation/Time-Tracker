import { NextFunction, Request, Response } from "express";
import {
  AdminModel,
  AdminEntity,
  AdminMapper,
  LoginModel,
} from "@domain/admin/entities/admin";
import { CreateAdminUsecase } from "@domain/admin/usecases/create-admin";
import { DeleteAdminUsecase } from "@domain/admin/usecases/delete-admin";
import { GetAdminByIdUsecase } from "@domain/admin/usecases/get-admin-by-id";
import { UpdateAdminUsecase } from "@domain/admin/usecases/update-admin";
import { GetAllAdminsUsecase } from "@domain/admin/usecases/get-all-admins";
import { LoginAdminUsecase } from "@domain/admin/usecases/login-admin";
import { LogoutAdminUsecase } from "@domain/admin/usecases/logout-admin";

import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { generateRandomPassword } from "@presentation/middlewares/randomPassword";


export class AdminService {
  private readonly createAdminUsecase: CreateAdminUsecase;
  private readonly deleteAdminUsecase: DeleteAdminUsecase;
  private readonly getAdminByIdUsecase: GetAdminByIdUsecase;
  private readonly updateAdminUsecase: UpdateAdminUsecase;
  private readonly getAllAdminsUsecase: GetAllAdminsUsecase;
  private readonly loginAdminUsecase: LoginAdminUsecase;
  private readonly logoutAdminUsecase: LogoutAdminUsecase;

  constructor(
    createAdminUsecase: CreateAdminUsecase,
    deleteAdminUsecase: DeleteAdminUsecase,
    getAdminByIdUsecase: GetAdminByIdUsecase,
    updateAdminUsecase: UpdateAdminUsecase,
    getAllAdminsUsecase: GetAllAdminsUsecase,
    loginAdminUsecase: LoginAdminUsecase,
    logoutAdminUsecase: LogoutAdminUsecase
  ) {
    this.createAdminUsecase = createAdminUsecase;
    this.deleteAdminUsecase = deleteAdminUsecase;
    this.getAdminByIdUsecase = getAdminByIdUsecase;
    this.updateAdminUsecase = updateAdminUsecase;
    this.getAllAdminsUsecase = getAllAdminsUsecase;
    this.loginAdminUsecase = loginAdminUsecase;
    this.logoutAdminUsecase = logoutAdminUsecase;
  }

  async createAdmin(req: Request, res: Response): Promise<void> {

    const randomPassword = generateRandomPassword(5)

    req.body.password = randomPassword;

    console.log(req.body, "Line 54")

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

  async getAdminById(req: Request, res: Response): Promise<void> {
    const adminId: string = req.params.adminId;
    // Call the GetAdminByIdUsecase to get the admin by ID
    const admin: Either<ErrorClass, AdminEntity> =
      await this.getAdminByIdUsecase.execute(adminId);

    admin.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AdminEntity) => {
        const resData = AdminMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllAdmins(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllAdminsUsecase to get all admins
    const admins: Either<ErrorClass, AdminEntity[]> =
      await this.getAllAdminsUsecase.execute();

    admins.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (admins: AdminEntity[]) => {
        const resData = admins.map((admin) => AdminMapper.toEntity(admin));
        return res.json(resData);
      }
    );
  }

  async updateAdmin(req: Request, res: Response): Promise<void> {
    const adminId: string = req.params.adminId;
    const adminData: AdminModel = req.body;
    // Get the existing admin by ID
    const existingAdmin: Either<ErrorClass, AdminEntity> =
      await this.getAdminByIdUsecase.execute(adminId);

    existingAdmin.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: AdminEntity) => {
        const resData = AdminMapper.toEntity(result, true);
        const updatedAdminEntity: AdminEntity = AdminMapper.toEntity(
          adminData,
          true,
          resData
        );

        // Call the UpdateAdminUsecase to update the admin
        const updatedAdmin: Either<ErrorClass, AdminEntity> =
          await this.updateAdminUsecase.execute(adminId, updatedAdminEntity);

        updatedAdmin.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: AdminEntity) => {
            // Convert updatedAdmin from AdminEntity to plain JSON object using AdminMapper
            const responseData = AdminMapper.toModel(response);

            // Send the updated admin as a JSON response
            res.json(responseData);
          }
        );
      }
    );
  }

  async deleteAdmin(req: Request, res: Response): Promise<void> {
    const adminId: string = req.params.adminId;

    // Call the DeleteAdminUsecase to delete the admin
    const response: Either<ErrorClass, void> =
      await this.deleteAdminUsecase.execute(adminId);

    (await response).cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({ message: "Admin deleted successfully." });
      }
    );
  }

  async loginAdmin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const adminResult: Either<ErrorClass, any> =
      await this.loginAdminUsecase.execute(email, password);

    adminResult.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (admin: any) => {
        const isMatch = await admin.matchPassword(password); // You should define the matchPassword method in AdminEntity
        if (!isMatch) {
          const err = ApiError.forbidden();
          return res.status(err.status).json(err.message);
        }

        const token = await admin.generateToken();

        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        const resData = { admin: AdminMapper.toEntity(admin, true) };
        res.cookie("token", token, options).json(resData);
      }
    );
  }

  async logOut(req: Request, res: Response): Promise<void> {
    try {
      res
        .status(200)
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Logged Out",
        });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}


