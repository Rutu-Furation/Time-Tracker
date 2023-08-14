import { NextFunction, Request, Response } from "express";
// import {
//   AttendanceModel,
//   AttendanceEntity,
//   AttendanceMapper,
// } from "@domain/admin/entities/admin";

// import { CreateAdminUsecase } from "@domain/admin/usecases/create-admin";
// import { DeleteAdminUsecase } from "@domain/admin/usecases/delete-admin";
// import { GetAdminByIdUsecase } from "@domain/admin/usecases/get-admin-by-id";
// import { UpdateAdminUsecase } from "@domain/admin/usecases/update-admin";
// import { GetAllAdminsUsecase } from "@domain/admin/usecases/get-all-admins";
import { AttendanceModel,AttendanceEntity,AttendanceMapper } from "@domain/attendence/entities/attendence";
import ApiError from "@presentation/error-handling/api-error";
import { CreateAttendance } from "@domain/attendence/usecases/create-attendance";
import { Attendance } from "@data/attendance/models/attendance-models";


function formatCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  }
  
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = now.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
export  class AttendanceService {
      private readonly createAttendanceUsecase: CreateAttendance;

  constructor(
    CreateAttendanceUsecase: CreateAttendance,
  ) {
    this.createAttendanceUsecase = CreateAttendanceUsecase;
  }

  
  
  async createAttendance(req: Request, res: Response): Promise<void> {
    try {
      
      // Extract admin data from the request body and convert it to AttendanceModel
      const adminData: AttendanceModel = AttendanceMapper.toModel(req.body);

      // Call the CreateAdminUsecase to create the admin
      const newAdmin: AttendanceEntity = await this.createAttendanceUsecase.execute(
        adminData
      );

      // Convert newAdmin from AttendanceEntity to the desired format using AttendanceMapper
      const responseData = AttendanceMapper.toEntity(newAdmin, true);

      // Send the created admin as a JSON response
      res.json(responseData);
    } catch (error) {
      if(error instanceof ApiError){
       res.status(error.status).json({ error: error.message });
      }
         ApiError.internalError()
    }
  }

  async updateAttendance(req: Request, res: Response): Promise<void>{
    const { User_id } = req.body;
    const currentTime = formatCurrentTime();
    const currentDate = getCurrentDate();
    const user = await Attendance.find({ User_id });
    const currentDayDetails = user.find((x) => x.Date.toString() == currentDate);
    const id = currentDayDetails?._id;
    try {
      await Attendance.findByIdAndUpdate({ _id: id }, {Check_out:currentTime});
      res.send({ msg: `Product with ID: ${id} has been updated successfully` });
    } catch (err:any) {
      res.send({ msg: "somthing went wrong! cannot update", error: err.message });
    }
  }
}