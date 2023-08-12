//import { Employee } from "@data/employee/models/employee-model";

export class EmployeeModel {
    constructor(
        public full_name:string = "",
        public email:string = "",
        public password:string = "",
        public contact_number:string = "",
        public address:string = "",
        public department:string = "",
        public joining_date:string = "",
        public profile_picture:string = "",
        public attendance_id:string = "",
        public project_id:string = "",
        public del_status:string = ""



    ) {}
}

// Employee Entity provided by Employee Repository is converted to Express API Response
export class EmployeeEntity{
    constructor(
        public id: string | undefined = undefined, // Set as a default value for id
        public full_name:string ,
        public email:string ,
        public password:string ,
        public contact_number:string ,
        public address:string ,
        public department:string ,
        public joining_date:string ,
        public profile_picture:string, 
        public attendance_id:string ,
        public project_id:string ,
        public del_status:string
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
            full_name:
            employeeData.full_name !==undefined ? employeeData.full_name : existingEmployee.full_name,
            email:
            employeeData.email !==undefined ? employeeData.email : existingEmployee.email,
            password:
            employeeData.password !==undefined ? employeeData.password : existingEmployee.password,
            contact_number:
            employeeData.contact_number !==undefined ? employeeData.contact_number : existingEmployee.contact_number,
            address:
            employeeData.address !==undefined ? employeeData.address : existingEmployee.address,
            department:
            employeeData.department !==undefined ? employeeData.department : existingEmployee.department,
            joining_date:
            employeeData.joining_date !==undefined ? employeeData.joining_date : existingEmployee.joining_date,
            profile_picture:
            employeeData.profile_picture !==undefined ? employeeData.profile_picture : existingEmployee.profile_picture,
            attendance_id:
            employeeData.attendance_id !==undefined ? employeeData.attendance_id : existingEmployee.attendance_id,
             project_id:
            employeeData.project_id !==undefined ? employeeData.project_id : existingEmployee.project_id,
            del_status:
            employeeData.del_status !==undefined ? employeeData.del_status : existingEmployee.del_status,
        };
        }else {
             // If existingEmployee is not provided, create a new EmployeeEntity using employeeData
             const employeeEntity: EmployeeEntity = {
                id: includeId ? (employeeData._id ? employeeData._id.toString() : undefined) : undefined,
                // id: includeId ? (tableData._id ? tableData._id.toString() : undefined) : undefined,
                full_name: employeeData.full_name,
                email: employeeData.email,
                password: employeeData.password,
                contact_number: employeeData.contact_number,
                address: employeeData.address,
                department: employeeData.department,
                joining_date: employeeData.joining_date,
                profile_picture: employeeData.profile_picture,
                attendance_id: employeeData.attendance_id,
                project_id: employeeData.project_id,
                del_status: employeeData.del_status,

             };
             return employeeEntity;
        }
    }

        static toModel(employee: EmployeeEntity): any {
            return {
                id: employee.id,
                full_name: employee.full_name,
                email: employee.email,
                password: employee.password,
                contact_number: employee.contact_number,
                address: employee.address,
                department: employee.department,
                joining_date: employee.joining_date,
                profile_picture: employee.profile_picture,
                attendance_id: employee.attendance_id,
                project_id: employee.project_id,
                del_status: employee.del_status,
            };
        }
    }
