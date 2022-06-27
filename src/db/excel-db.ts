import { DataBase } from "./db";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

class ExcelDataBase extends DataBase {
  getData(): Promise<string[]> {
    const results = [];
    console.log(csv);
    return new Promise((resolve) => {
      fs.createReadStream(
        path.resolve(__dirname, "./../../src/data/history.csv")
      )
        .pipe(csv())
        .on("data", (data) => {
          results.push(data["Adress"]);
        })
        .on("end", () => {
          resolve(
            Array.from(new Set(results)).map((item) => {
              const result = /Adres: ([\s\S]*)$/.exec(item);

              if (result === null) {
                return item;
              }

              return result[1];
            })
          );
        });
    });
  }
}

export { ExcelDataBase };
