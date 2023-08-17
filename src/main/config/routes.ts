import { adminRouter } from "@presentation/routes/admin-routes";


import { type Express, Router } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { employeeRouter } from "@presentation/routes/employee-route";
import { attendanceRouter } from "@presentation/routes/attendance-route";


export default (app: Express): void => {
  const router = Router();

  app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok" });
  });
  app.use("/api/v1/admin", adminRouter);

  app.use("/api/v1/employee",employeeRouter);
  app.use(router);
 app.use("/api/v1/attendance", attendanceRouter)
};
