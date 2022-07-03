abstract class DataBase {
  abstract getData(): Promise<string[]>;
}

export { DataBase };
