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
import {
  AttendanceModel,
  AttendanceEntity,
  AttendanceMapper,
} from "@domain/attendence/entities/attendence";
import ApiError from "@presentation/error-handling/api-error";
import { CreateAttendance } from "@domain/attendence/usecases/create-attendance";
import { Attendance } from "@data/attendance/models/attendance-models";

// get the current time
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
// get the current date
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = now.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export class AttendanceService {
  private readonly createAttendanceUsecase: CreateAttendance;

  constructor(CreateAttendanceUsecase: CreateAttendance) {
    this.createAttendanceUsecase = CreateAttendanceUsecase;
  }

  async createAttendance(req: Request, res: Response): Promise<void> {
    try {
      // Extract admin data from the request body and convert it to AttendanceModel
      const currentDate = getCurrentDate();
      const currentTime = formatCurrentTime();
      const payload = { ...req.body, Date: currentDate, Check_in: currentTime };
      const adminData: AttendanceModel = AttendanceMapper.toModel(payload);
      // Call the CreateAdminUsecase to create the admin
      console.log("adminData", adminData);
      const newAdmin: AttendanceEntity =
        await this.createAttendanceUsecase.execute(adminData);
      // Convert newAdmin from AttendanceEntity to the desired format using AttendanceMapper
      const responseData = AttendanceMapper.toEntity(newAdmin, true);
      // Send the created admin as a JSON response
      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async updateAttendance(req: Request, res: Response): Promise<void> {
    const currentTime = formatCurrentTime();
    const currentDate = getCurrentDate();
    const user = await Attendance.find({ Date: currentDate });

    // const currentDayDetails = user.find(
    //   (x) => x.Date.toString() == currentDate
    // );
    // console.log(user);
    const id = user[0]?._id;
    console.log(id,"id")
    try {
      await Attendance.findByIdAndUpdate(id, { Check_out: currentTime });
      res.send({ msg: `check-out successfully.` });
    } catch (err: any) {
      res.send({
        msg: "somthing went wrong! cannot update",
        error: err.message,
      });
    }
  }
}
