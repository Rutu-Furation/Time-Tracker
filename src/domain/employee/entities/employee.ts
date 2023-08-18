//import { Employee } from "@data/employee/models/employee-model";

export class EmployeeModel {
    constructor(
        public employeeId:string = "",
        public fullName:string = "",
        public email:string = "",
        public password:string = "",
        public contactNumber:string = "",
        public address:string = "",
        public department:string = "",
        public designation:string = "",
        public role:string = "",
        public joiningDate:string = "",
        public profilePicture:string = "",
        public attendanceId:string = "",
        public projectId:string = "",
        public delStatus:string = "",


    ) {}
}
export class LoginModel {
    constructor(
      
      public email: string = "",
      public password: string = "",
    
    ) {}
  }

// Employee Entity provided by Employee Repository is converted to Express API Response
export class EmployeeEntity{
    constructor(
        public id: string | undefined = undefined, // Set as a default value for id
        public employeeId:string,
        public fullName:string ,
        public email:string ,
        public password:string ,
        public contactNumber:string ,
        public address:string ,
        public department:string ,
        public designation:string ,
        public role:string ,
        public joiningDate:string ,
        public profilePicture:string, 
        public attendanceId:string ,
        public projectId:string ,
        public delStatus:string
    ) {}
}

export class LoginEntity {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

export class EmployeeMapper {
    static toEntity(
        employeeData: any,
        includeId?: boolean,
        existingEmployee?: EmployeeEntity
    ): EmployeeEntity {
        if(existingEmployee != null){
        // If existingEmployee is provided, merge the data from employeeData with the existingEmployee
        return{
            ...existingEmployee,
            employeeId:
            employeeData.employeeId !==undefined ? employeeData.employeeId : existingEmployee.employeeId,
            fullName:
            employeeData.fullName !==undefined ? employeeData.fullName : existingEmployee.fullName,
            email:
            employeeData.email !==undefined ? employeeData.email : existingEmployee.email,
            password:
            employeeData.password !==undefined ? employeeData.password : existingEmployee.password,
            contactNumber:
            employeeData.contactNumber !==undefined ? employeeData.contactNumber : existingEmployee.contactNumber,
            address:
            employeeData.address !==undefined ? employeeData.address : existingEmployee.address,
            department:
            employeeData.department !==undefined ? employeeData.department : existingEmployee.department,
            designation:
            employeeData.designation !==undefined ? employeeData.designation : existingEmployee.designation,
            role:
            employeeData.role !==undefined ? employeeData.role : existingEmployee.role,
            joiningDate:
            employeeData.joiningDate !==undefined ? employeeData.joiningDate : existingEmployee.joiningDate,
            profilePicture:
            employeeData.profilePicture !==undefined ? employeeData.profilePicture : existingEmployee.profilePicture,
            attendanceId:
            employeeData.attendanceId !==undefined ? employeeData.attendanceId : existingEmployee.attendanceId,
             projectId:
            employeeData.projectId !==undefined ? employeeData.projectId : existingEmployee.projectId,
            delStatus:
            employeeData.delStatus !==undefined ? employeeData.delStatus : existingEmployee.delStatus,
        };
        }else {
             // If existingEmployee is not provided, create a new EmployeeEntity using employeeData
             const employeeEntity: EmployeeEntity = {
                id: includeId ? (employeeData._id ? employeeData._id.toString() : undefined) : undefined,
                // id: includeId ? (tableData._id ? tableData._id.toString() : undefined) : undefined,
                employeeId: employeeData.employeeId,
                fullName: employeeData.fullName,
                email: employeeData.email,
                password: employeeData.password,
                contactNumber: employeeData.contactNumber,
                address: employeeData.address,
                department: employeeData.department,
                role: employeeData.role,
                designation: employeeData.designation,
                joiningDate: employeeData.joiningDate,
                profilePicture: employeeData.profilePicture,
                attendanceId: employeeData.attendanceId,
                projectId: employeeData.projectId,
                delStatus: employeeData.delStatus,

             };
             return employeeEntity;
        }
    }

        static toModel(employee: EmployeeEntity): any {
            return {
                id: employee.id,
                employeeId:employee.employeeId,
                fullName: employee.fullName,
                email: employee.email,
                password: employee.password,
                contactNumber: employee.contactNumber,
                address: employee.address,
                department: employee.department,
                designation: employee.designation,
                role: employee.role,
                joiningDate: employee.joiningDate,
                profilePicture: employee.profilePicture,
                attendanceId: employee.attendanceId,
                projectId: employee.projectId,
                delStatus: employee.delStatus,
            };
        }
    }
