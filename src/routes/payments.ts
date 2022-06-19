import express from "express";
import { DataBase } from "./../db";

const router = express.Router();

const usePaymentsRoutes = (app: express.Express, db: DataBase) => {
  router.get("/load_csv", async (req, res) => {
    const data = await db.getData();

    res.json({ response: data });
  });

  app.use("/payments", router);
};

export { usePaymentsRoutes };
