// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { AttendanceService } from "@presentation/services/attendance-service";
import { AttendanceRepositoryImpl } from "@data/attendance/repositories/attendance-repository-impl";
import { AttendanceSourceImpl } from "@data/attendance/datasources/attendance-datasource";
import { CreateAttendance } from "@domain/attendence/usecases/create-attendance";
import { isAuthenticatedUser } from "@presentation/middlewares/userAuth";


// Create an instance of the EmployeeDataSourceImpl and pass the mongoose connection
const attendanceDataSource = new AttendanceSourceImpl(mongoose.connection);
 
// Create an instance of the EmployeeRepositoryImpl and pass the EmployeeDataSourceImpl
const attendanceRepository = new AttendanceRepositoryImpl(attendanceDataSource);

// Create instances of the required use cases and pass the EmployeeRepositoryImpl
const createAttendanceUsecase = new CreateAttendance(attendanceRepository);


// Initialize employeeService and inject required dependencies
const attendanceService = new AttendanceService(
    createAttendanceUsecase
);

export const attendanceRouter = Router();

attendanceRouter.post("/checkin",isAuthenticatedUser,  attendanceService.createAttendance.bind(attendanceService)),
attendanceRouter.patch("/checkout",isAuthenticatedUser, attendanceService.updateAttendance.bind(attendanceService))
// Create an Express router
