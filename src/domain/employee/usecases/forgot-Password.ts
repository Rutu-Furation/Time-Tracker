// import { EmployeeEntity, EmployeeModel, LoginModel } from "@domain/employee/entities/employee";
// import { EmployeeRepository } from "@domain/employee/repositories/employee-repository";
// import { ErrorClass } from "@presentation/error-handling/api-error";
// import { Either } from "monet";

// export interface ForgotPasswordUsecase {
//   execute: (email: string) => Promise<any>;
// }

// export class ForgotPassword implements ForgotPasswordUsecase {
//   private readonly employeeRepository: EmployeeRepository;

//   constructor(employeeRepository: EmployeeRepository) {
//     this.employeeRepository = employeeRepository;
//   }

//   async execute(
//     email:string,
//   ): Promise<any> {
    
//     return await this.employeeRepository.forgotPassword(email);
//   }
// }
