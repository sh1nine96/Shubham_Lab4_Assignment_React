import React, { useEffect, useState } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import IExpenseItem from '../models/expense';
import { getAllExpenseItems } from '../services/expense';
import { ExpenseByPayees } from './expense-by-payee';
import { ExpenseCreator } from './expense-creator';
import { ExpenseItems } from './expense-items';

const ExpenseTracker = () => {

    const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getAllExpenseItemsInvoker = async () => {
            try {
                const responseData = await getAllExpenseItems();
                console.log(responseData);
                setExpenseItems(responseData);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }

        getAllExpenseItemsInvoker();
    }, []);

    const refreshParent = (newExpenseItem : IExpenseItem) => {
        setExpenseItems(
            [
                ...expenseItems,
                newExpenseItem
            ]
        );
    }

    return (
        <Container className='my-4'>

            <h2>Expense Management Application
                <ExpenseCreator expenseItems={expenseItems} refreshParent={refreshParent}></ExpenseCreator>
            </h2>

            {
                loading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )
            }

            {
                error && !loading && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }

            {
                !error && !loading && (
                    <ExpenseItems expenseItems={expenseItems}></ExpenseItems>
                )
            }

            {
                !error && !loading && (
                    <ExpenseByPayees expenseItems={expenseItems}></ExpenseByPayees>
                )
            }
        </Container>
    )
}

export { ExpenseTracker };