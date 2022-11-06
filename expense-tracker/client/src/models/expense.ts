
interface IExpenseItem {

    payeeName: string,
    expenseDescription: string,
    price: number,
    date: Date,
    id: number

}

export type IExpenseCreateItem = Omit<IExpenseItem, "id">; 

export default IExpenseItem;