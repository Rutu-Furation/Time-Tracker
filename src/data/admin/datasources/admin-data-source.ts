import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { Admin } from "@data/admin/models/admin-model";
import {AdminEntity, AdminModel, AdminMapper } from "@domain/admin/entities/admin"; // Import the entity and mapper

export interface AdminDataSource {
  create(admin: AdminModel): Promise<any>;
  getById(id: string): Promise<AdminEntity>;
  getAllAdmins(): Promise<AdminEntity[]>;
  update(id: string, admin: AdminModel): Promise<any>; // Return type should be Promise of AdminEntity
  delete(id: string): Promise<void>;
}

  export class AdminDataSourceImpl implements AdminDataSource {
    constructor(private db: mongoose.Connection) {}

    async create(admin: AdminModel): Promise<any> {
      const existingAdmin = await Admin.findOne({ email: admin.email });
      if (existingAdmin) {
        throw ApiError.emailExist();
      }

      const adminData = new Admin(admin);

      const createdAdmin = await adminData.save();

      return createdAdmin.toObject();
    }

    async getById(id: string): Promise<AdminEntity> {
      try {
        const admin = await Admin.findById(id);
        if (!admin) {
          throw ApiError.notFound();
        }
        return admin && admin.toObject();
      } catch (error) {
        throw ApiError.badRequest();
      }
    }

    async getAllAdmins(): Promise<any[]> {
      try {
        const admins = await Admin.find();
        return admins.map((admin) => admin.toObject());
      } catch (error) {
        throw ApiError.notFound();
      }
    }

    async update(id: string, admin: AdminModel): Promise<any> {
      try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
          new: true,
        }); // No need for conversion here
        return updatedAdmin ? updatedAdmin.toObject() : null; // Convert to plain JavaScript object before returning
      } catch (error) {
        throw ApiError.badRequest();
      }
    }

    async delete(id: string): Promise<void> {
      await Admin.findByIdAndDelete(id);
    }
  }
