#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { convertToCsvString, getDataFromCsv } from "../utils/csv";

const pathToFileToMapParamName = "--path";

const availableParams = [pathToFileToMapParamName];

const readParams = (): Record<string, string> => {
  const params = process.argv.slice(2);

  return params.reduce((result, param) => {
    const [paramName, paramValue] = param.split("=");
    if (availableParams.includes(paramName)) {
      return { ...result, [paramName]: paramValue };
    }

    return result;
  }, {});
};

const params = readParams();

const main = async () => {
  const pathToFile = params[pathToFileToMapParamName];
  const realPath = path.resolve(process.cwd(), pathToFile);

  const data = await getDataFromCsv(realPath);

  const addressesList = Array.from(
    new Set(data.map((item) => item["Adress"]))
  ).map((item) => {
    const result = /Adres: ([\s\S]*)$/.exec(item);

    if (result === null) {
      return item;
    }

    return result[1];
  });

  const csv = await convertToCsvString(["Address", ...addressesList]);

  fs.writeFile(
    path.resolve(process.cwd(), "./src/public/map.csv"),
    csv,
    console.error
  );

  return console.log("Map has been successfully generated");
};

main();
