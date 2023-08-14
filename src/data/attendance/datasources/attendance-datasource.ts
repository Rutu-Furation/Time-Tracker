
import { Attendance } from "../models/attendance-models";
import { AttendanceEntity,AttendanceModel } from "@domain/attendence/entities/attendence";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface AttendanceSource {
  create(admin: AttendanceModel): Promise<any>; // Return type should be Promise of AdminEntity
  update(id: string, admin: AttendanceModel): Promise<any>; // Return type should be Promise of AdminEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of AdminEntity or null
  getAllAttendance(): Promise<any>;
}

export class AttendanceSourceImpl implements AttendanceSource {
  constructor(private db: mongoose.Connection) {}

  async create(admin: AttendanceModel): Promise<any> {

    const attendanceData = new Attendance(admin);

    const createdAdmin = await attendanceData.save();
    
    return createdAdmin.toObject();
  }

  async update(id: string, attendance: AttendanceModel): Promise<any> {
    const updatedAdmin = await Attendance.findByIdAndUpdate(id, attendance, {
      new: true,
    }); // No need for conversion here
    return updatedAdmin ? updatedAdmin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Attendance.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const admin = await Attendance.findById(id);
    return admin ? admin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllAttendance(): Promise<any[]> {
    const admins = await Attendance.find();
    return admins.map((admin) => admin.toObject()); // Convert to plain JavaScript objects before returning
  }
}
