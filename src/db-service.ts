import { openDatabase, SQLiteDatabase, enablePromise } from "react-native-sqlite-storage";
import {Expense} from "./models/Expense";

const tn = "expense";

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: "budget-data.db", location: "default"});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists

  // const deleteQuery =  `DROP TABLE IF EXISTS ${tn}`;

  // await db.executeSql(deleteQuery);

  const query = `CREATE TABLE IF NOT EXISTS ${tn}(
    name TEXT NOT NULL, price int,date TEXT NOT NULL);`;

  await db.executeSql(query);  
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<Expense[]> => {
  try {
    const todoItems: Expense[] = [];
    //const rs = await db.executeSql(`SELECT rowid as id, name, price, date FROM ${tn}`);
    const rs = await db.executeSql(`SELECT rowid as id, name, price, date FROM ${tn}`);
    
    console.log(rs);
    rs.forEach(r => {
      for (let index = 0; index < r.rows.length; index++) {
        todoItems.push(r.rows.item(index));
      }
    });

    console.log(todoItems);
    return todoItems;
  } catch (error) {
    throw Error("Failed to get items !!!");
  }
};

export const saveTodoItems = async (db: SQLiteDatabase, item: Expense) => {
  const insertQuery = `INSERT OR REPLACE INTO ${tn}(rowid, name, price, date) values` +
                      `('${item.id}', '${item.name}', ${item.price}, '${item.date}')`;
  /*
    `INSERT OR REPLACE INTO ${tn}(rowid, name, price, date) values` +
    todoItems.map(i =>  `('${i.id}', '${i.name}', ${i.price}, '${i.date}')`).join(",");
    */

  return db.executeSql(insertQuery);
};

export const updateTodoItems = async (db: SQLiteDatabase, item: Expense) => {
  const updateQuery = (
    "UPDATE expense SET name =name, price =price, date =date where rowid =6 ");
    //["name", "price", "date", 100]);

  return db.executeSql(updateQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tn} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

