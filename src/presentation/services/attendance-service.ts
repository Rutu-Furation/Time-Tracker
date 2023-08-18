import { NextFunction, Request, Response } from "express";

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

// time difference
function calculateTimeDifference(time1: string, time2: string) {
  const [h1, m1, s1] = time1.split(":").map(Number);
  const [h2, m2, s2] = time2.split(":").map(Number);
  const totalSeconds1 = h1 * 3600 + m1 * 60 + s1;
  const totalSeconds2 = h2 * 3600 + m2 * 60 + s2;
  const timeDifferenceSeconds = Math.abs(totalSeconds2 - totalSeconds1);
  const hours = Math.floor(timeDifferenceSeconds / 3600);
  const minutes = Math.floor((timeDifferenceSeconds % 3600) / 60);
  const seconds = timeDifferenceSeconds % 60;
  return { hours, minutes, seconds };
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
      const payload = { ...req.body, date: currentDate, checkIn: currentTime };
      // console.log(payload)
      const adminData: AttendanceModel = AttendanceMapper.toModel(payload);

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
    const { userId } = req.body;
    // find the attendance details by User_id 
    const user = await Attendance.find({ userId });

    // now find the current day check-in object
    const currentDayDetails = user.find((x) => x.date == currentDate);

    // if current day check-in status is found then update that object with Duration, check-out time
    if(currentDayDetails){
      const id = currentDayDetails._id;
      const check_inTime = currentDayDetails.checkIn;
      console.log(check_inTime)
      const { hours, minutes, seconds } = calculateTimeDifference(
      check_inTime,
      currentTime
    );
    const Duration = `${hours}:${minutes}:${seconds}`;

    try {
      await Attendance.findByIdAndUpdate(id, {
        checkOut: currentTime,
        duration: Duration,
      });
      res.send({ msg: `check-out successfully.` });
    } catch (err: any) {
      res.send({ 
        msg: "somthing went wrong! cannot checkout.",
        error: err.message,
      });
    }
    }else{
      res.send("cannot find the check-in status of current day.")
    }
  }
}
