import { ACTIONTYPE } from "./contexts/DataContext";
import { createTable,
         deleteTodoItem, 
         getDBConnection, 
         getTodoItems, 
         saveTodoItems } from "./db-service";
import { Expense } from "./models/Expense";


export const init_app = (): ACTIONTYPE => {
    return {
        type: "INIT"
    };
};

export const addItem = async (newTodos:Expense) => {
    const db = await getDBConnection();
    await saveTodoItems(db, newTodos);
};

export const deleteExpense = async (id:number) => {
    const db = await getDBConnection();
    const result = await deleteTodoItem(db, id);
    return result;
};

export const fetchItems = async () =>  {
   const db =  await getDBConnection();
   await createTable(db);
   const storeItems = await getTodoItems(db);
   return storeItems;    
};