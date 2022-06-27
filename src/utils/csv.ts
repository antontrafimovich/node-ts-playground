import { stringify } from "csv-stringify";
import fs from "fs";
import csv from "csv-parser";

const convertToCsvString = (values: unknown[]): Promise<string> => {
  return new Promise((res, rej) => {
    const data: string[] = [];

    const stringifier = stringify();

    stringifier.on("readable", function () {
      let row;
      while ((row = stringifier.read()) !== null) {
        data.push(row);
      }
    });

    stringifier.on("error", function (err) {
      console.error(err.message);
    });

    stringifier.on("finish", function () {
      res(data.join(""));
    });

    values.forEach((v) => stringifier.write(v));

    stringifier.end();
  });
};

const getDataFromCsv = <T>(srcPath: string): Promise<T[]> => {
  const results: T[] = [];

  return new Promise((resolve) => {
    fs.createReadStream(srcPath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      });
  });
};

export { convertToCsvString, getDataFromCsv };
