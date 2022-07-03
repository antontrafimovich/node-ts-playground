import express from "express";

import { convertToCsvString } from "../utils/csv";
import { DataBase } from "./../db";

const router = express.Router();

const usePaymentsRoutes = (app: express.Express, db: DataBase) => {
  router.get("/load_csv", async (req, res) => {
    const data: string[] = await db.getData();
    const csv = await convertToCsvString(data.map((item) => [item]));

    res.json({ response: csv });
  });

  app.use("/payments", router);
};

export { usePaymentsRoutes };
