import { type Express, Router } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { employeeRouter } from "@presentation/routes/employee-route";


export default (app: Express): void => {
  const router = Router();

  app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok" });
  });
  app.use("/employee",employeeRouter);
  app.use(router);

};
