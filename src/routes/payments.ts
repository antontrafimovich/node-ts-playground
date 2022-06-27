import express from "express";
import fs from "fs";

import { convertToCsvString } from "../utils/csv";
import { DataBase } from "./../db";

const router = express.Router();

const usePaymentsRoutes = (app: express.Express, db: DataBase) => {
  router.get("/load_csv", async (req, res) => {
    const data: string[] = await db.getData();
    const csv = await convertToCsvString(data);
    fs.writeFile("newfile.csv", csv, console.error);

    res.json({ response: csv });
  });

  app.use("/payments", router);
};

export { usePaymentsRoutes };
