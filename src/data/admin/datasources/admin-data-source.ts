import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { Admin } from "@data/admin/models/admin-model";
import {AdminEntity, AdminModel, AdminMapper } from "@domain/admin/entities/admin"; // Import the entity and mapper

export interface AdminDataSource {
  create(admin: AdminModel): Promise<any>;
}

export class AdminDataSourceImpl implements AdminDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(admin: AdminModel): Promise<AdminEntity> {
    const existingAdmin = await Admin.findOne({ email: admin.email });
    if (existingAdmin) {
      throw ApiError.emailExist();
    }

    const adminData = new Admin(admin);
    const createdAdmin: mongoose.Document = await adminData.save();

    // Convert createdAdmin to an AdminEntity using the mapper
    return AdminMapper.toEntity(createdAdmin.toObject());
  }
}
