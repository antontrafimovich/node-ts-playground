import { stringify } from "csv-stringify";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const convertToCsvString = (values: unknown[]): Promise<string> => {
  return new Promise((res, rej) => {
    const data: string[] = ["Address\n"];

    const stringifier = stringify({
      delimiter: ":",
    });

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

    values.forEach((v) => stringifier.write([v]));

    stringifier.end();
  });
};

const getDataFromCsv = (
  srcPath: string
): Promise<(object & { Address: string })[]> => {
  const results: (object & { Address: string })[] = [];

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
