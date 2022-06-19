abstract class DataBase {
  abstract getData(): Promise<unknown>;
}

export { DataBase };
