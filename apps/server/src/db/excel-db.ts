import path from "path";

import { getDataFromCsv } from "./../utils/csv";
import { DataBase } from "./db";

class ExcelDataBase extends DataBase {
  async getData(): Promise<string[]> {
    const data = await getDataFromCsv(
      path.resolve(__dirname, "./../../src/data/history.csv")
    );

    const uniqueAdresses = Array.from(
      new Set(data.map((item) => item["Adress"]))
    );

    return uniqueAdresses.map((item) => {
      const result = /Adres: ([\s\S]*)$/.exec(item);

      if (result === null) {
        return item;
      }

      return result[1];
    });
  }
}

export { ExcelDataBase };
