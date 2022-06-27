#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { convertToCsvString, getDataFromCsv } from "../utils/csv";

const pathToSourceFileParamName = "--source";
const pathToMapFileParamName = "--map";

const availableParams = [pathToSourceFileParamName, pathToMapFileParamName];

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
  const pathToMapFile = path.resolve(
    process.cwd(),
    params[pathToMapFileParamName]
  );

  const pathToSourceFile = path.resolve(
    process.cwd(),
    params[pathToSourceFileParamName]
  );

  const sourceData = await getDataFromCsv<{
    Adress: string;
    "Data waluty": string;
    Kwota: string;
  }>(pathToSourceFile);

  const mapData = await getDataFromCsv<{ Address: string; Type: string }>(
    pathToMapFile
  );

  const mappedSourceData = sourceData.map((item) => {
    return {
      address: item["Adress"],
      date: item["Data waluty"],
      value: item["Kwota"],
    };
  });

  const resultData = mappedSourceData
    .filter((item) => Number.parseFloat(item.value) < 0)
    .map((item, index) => {
      return [
        index,
        item.value,
        item.date,
        mapData.find((mapDataItem) =>
          item.address.includes(mapDataItem.Address)
        )?.Type,
      ];
    });

  const csv = await convertToCsvString([
    ["Id", "Value", "Date", "Type"],
    ...resultData,
  ]);

  fs.writeFile(
    path.resolve(process.cwd(), "./src/public/result.csv"),
    csv,
    console.error
  );

  return console.log("Result file has been successfully generated");
};

main();
