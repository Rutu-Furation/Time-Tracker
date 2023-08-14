import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { Admin } from "@data/admin/models/admin-model";
import {AdminEntity, AdminModel, AdminMapper } from "@domain/admin/entities/admin"; // Import the entity and mapper

export interface AdminDataSource {
  create(admin: AdminModel): Promise<any>;
  getById(id: string): Promise<AdminEntity>;
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
  }
