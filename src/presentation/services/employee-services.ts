import { NextFunction, Request, Response } from "express";
import {
  EmployeeModel,
  EmployeeEntity,
  EmployeeMapper,
  LoginModel,
} from "@domain/employee/entities/employee";
import { CreateEmployeeUsecase } from "@domain/employee/usecases/create-employee";
import { DeleteEmployeeUsecase } from "@domain/employee/usecases/delete-employee";
import { GetEmployeeByIdUsecase } from "@domain/employee/usecases/get-employee-by-id";
import { UpdateEmployeeUsecase } from "@domain/employee/usecases/update-Employee";
import { GetAllEmployeesUsecase } from "@domain/employee/usecases/get-all-employee";
import { LoginEmployeeUsecase } from "@domain/employee/usecases/login-employee";
import { ResetPasswordUsecase } from "@domain/employee/usecases/reset-password";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { LogoutAdminUsecase } from "@domain/admin/usecases/logout-admin";
import crypto from "crypto";
import { generateRandomPassword } from "@presentation/middlewares/randomPassword";
import { InvitationApp } from "@data/admin/datasources/admin-data-source";
import { sendEmail } from "@presentation/middlewares/employee/send-email";

export class EmployeeService {
  private readonly CreateEmployeeUsecase: CreateEmployeeUsecase;
  private readonly DeleteEmployeeUsecase: DeleteEmployeeUsecase;
  private readonly GetEmployeeByIdUsecase: GetEmployeeByIdUsecase;
  private readonly UpdateEmployeeUsecase: UpdateEmployeeUsecase;
  private readonly GetAllEmployeesUsecase: GetAllEmployeesUsecase;
  private readonly LoginEmployeeUsecase: LoginEmployeeUsecase;
  private readonly LogoutEmployeeUsecase: LogoutAdminUsecase;
  private readonly ResetPasswordUsecase: ResetPasswordUsecase;

  constructor(
    CreateEmployeeUsecase: CreateEmployeeUsecase,
    DeleteEmployeeUsecase: DeleteEmployeeUsecase,
    GetEmployeeByIdUsecase: GetEmployeeByIdUsecase,
    UpdateEmployeeUsecase: UpdateEmployeeUsecase,
    GetAllEmployeesUsecase: GetAllEmployeesUsecase,
    LoginEmployeeUsecase: LoginEmployeeUsecase,
    LogoutEmployeeUsecase: LogoutAdminUsecase,
    ResetPasswordUsecase: ResetPasswordUsecase
  ) {
    this.CreateEmployeeUsecase = CreateEmployeeUsecase;
    this.DeleteEmployeeUsecase = DeleteEmployeeUsecase;
    this.GetEmployeeByIdUsecase = GetEmployeeByIdUsecase;
    this.UpdateEmployeeUsecase = UpdateEmployeeUsecase;
    this.GetAllEmployeesUsecase = GetAllEmployeesUsecase;
    this.LoginEmployeeUsecase = LoginEmployeeUsecase;
    this.LogoutEmployeeUsecase = LogoutEmployeeUsecase;
    this.ResetPasswordUsecase = ResetPasswordUsecase;
  }

  async createEmployee(req: Request, res: Response): Promise<void> {
    const randomPassword = generateRandomPassword(5);

    req.body.password = randomPassword;

    console.log(req.body, "Line 54");
    // Extract Employee data from the request body and convert it to EmployeeModel
    const employeeData: EmployeeModel = EmployeeMapper.toModel(req.body);

    // Call the CreateEmployeeUsecase to create the Employee
    const newEmployee: Either<ErrorClass, EmployeeEntity> =
      await this.CreateEmployeeUsecase.execute(employeeData);

    newEmployee.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: EmployeeEntity) => {
        const responseData = EmployeeMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async deleteEmployee(req: Request, res: Response): Promise<void> {
    const employeeId: string = req.params.employeeId;

    // Call the DeleteEmployeeUsecase to delete the admin
    const response: Either<ErrorClass, void> =
      await this.DeleteEmployeeUsecase.execute(employeeId);

    (await response).cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({ message: "Employee deleted successfully." });
      }
    );
  }

  // async deleteEmployee(req: Request, res: Response): Promise<void> {
  //   const employeeId: string = req.params.employeeId;

  //   const updatedEmployeeEntity: EmployeeEntity = EmployeeMapper.toEntity(
  //     { delStatus: "Deleted" },
  //     true
  //   );
  //   // Call the UpdateEmployeeUsecase to delete the Employee
  //   const updatedEmployee: Either<ErrorClass, EmployeeEntity> =
  //     await this.UpdateEmployeeUsecase.execute(
  //       employeeId,
  //       updatedEmployeeEntity
  //     );

  //   updatedEmployee.cata(
  //     (error: ErrorClass) =>
  //       res.status(error.status).json({ error: error.message }),
  //     (result: EmployeeEntity) => {
  //       const responseData = EmployeeMapper.toModel(result);
  //       return res.json(responseData);
  //     }
  //   );
  // }

  async getEmployeeById(req: Request, res: Response): Promise<void> {
    const employeeId: string = req.params.employeeId;

    // Call the GetEmployeeByIdUsecase to get the table by ID
    const employee: Either<ErrorClass, EmployeeEntity | null> =
      await this.GetEmployeeByIdUsecase.execute(employeeId);
    employee.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: EmployeeEntity | null) => {
        const responseData = EmployeeMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async updateEmployee(req: Request, res: Response): Promise<void> {
    const employeeId: string = req.params.employeeId;
    const employeeData: EmployeeModel = req.body;

    // Get the existing Employee by ID
    const existingEmployee: Either<ErrorClass, EmployeeEntity | null> =
      await this.GetEmployeeByIdUsecase.execute(employeeId);

    if (!existingEmployee) {
      // If Employee is not found, send a not found message as a JSON response
      ApiError.notFound();
      return;
    }

    // Convert employeeData from EmployeeModel to EmployeeEntity using EmployeeMapper
    const updatedEmployeeEntity: EmployeeEntity = EmployeeMapper.toEntity(
      employeeData,
      true
      // existingEmployee
    );

    // Call the UpdateEmployeeUsecase to update the employee
    const updatedEmployee: Either<ErrorClass, EmployeeEntity> =
      await this.UpdateEmployeeUsecase.execute(
        employeeId,
        updatedEmployeeEntity
      );

    updatedEmployee.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: EmployeeEntity) => {
        const responseData = EmployeeMapper.toModel(result);
        return res.json(responseData);
      }
    );
  }

  async getAllEmployees(req: Request, res: Response): Promise<void> {
    // Call the GetAllEmployeesUsecase to get all Employees
    const employees: Either<ErrorClass, EmployeeEntity[]> =
      await this.GetAllEmployeesUsecase.execute();

    employees.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: EmployeeEntity[]) => {
        // Convert Employees from an array of EmployeeEntity to an array of plain JSON objects using EmployeeMapper
        const responseData = result.map((employee) =>
          EmployeeMapper.toModel(employee)
        );
        if (responseData) {
        }
        return res.json(responseData);
      }
    );
  }

  async loginEmployee(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const employeeResult: Either<ErrorClass, any> =
      await this.LoginEmployeeUsecase.execute(email, password);

    employeeResult.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (employee: any) => {
        const isMatch = await employee.matchPassword(password); // You should define the matchPassword method in AdminEntity
        if (!isMatch) {
          const err = ApiError.forbidden();
          console.log(err);
          return res.status(err.status).json(err.message);
        }

        const token = await employee.generateToken();
        console.log(token);

        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        const resData = { employee: EmployeeMapper.toEntity(employee, true) };
        res.cookie("token", token, options).json(resData);
      }
    );
  }

  async logOutEmployee(req: Request, res: Response): Promise<void> {
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

  async resetPassord(req: Request, res: Response): Promise<void> {
    const employees: any = await this.ResetPasswordUsecase.execute(req.body);
    // console.log(employees.value);

    // res.send(employees.value)

    employees.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      async (result: any) => {
        const resetPassordToken = result.getResetPasswordToken();
        // ==========
        const randomOtp = 12345;
        const resetUrl = `${req.protocol}://${req.get(
          "host"
        )}/api/v1/password/reset/${resetPassordToken}`;
        // const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}
        //   Your Otp for reset password is ${randomOtp}`;
        const message = `Your Otp for reset password is ${randomOtp}`;
        try {
          await sendEmail({
            email: result.email,
            message,
          });
          res.status(200).json({
            success: true,
            message: `Email sent to ${result.email}`,
          });
        } catch (error: any) {
          result.resetPasswordToken = undefined;
          result.resetPasswordExpire = undefined;
          await result.save();
          res.status(500).json({
            success: false,
            massage: error.massage,
          });
        }

        // ===========
        return res.json({
          result: result,
        });
      }
    );
  }
}
