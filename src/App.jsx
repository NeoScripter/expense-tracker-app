import { format } from 'date-fns';
import { initialData } from './data';
import { groupExpensesByInterval } from './utils/groupExpensesByInterval';
import { useState } from 'react';
import ExpenseFilterPanel from './components/ExpenseFilterPanel ';
import calculateTotal from './utils/calculateTotal';

function App() {
    const [expenses, setExpenses] = useState(initialData);
    const [dateGrouping, setDateGrouping] = useState('day');
    const [searchQuery, setSearchQuery] = useState('');

    const groupedExpenses = groupExpensesByInterval(
        expenses,
        dateGrouping,
        searchQuery
    );

    const totalAmount = calculateTotal(groupedExpenses);

    return (
        <>
            <div className="p-2 sm:p-4 space-y-4 mx-auto max-w-300">
                <ExpenseFilterPanel
                    dateGrouping={dateGrouping}
                    setDateGrouping={setDateGrouping}
                    totalAmount={totalAmount}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <div className="space-y-2">
                    {groupedExpenses.map((summary, idx) => (
                        <ExpenseSummary
                            key={idx + 'summary'}
                            expenses={summary}
                        />
                    ))}
                </div>
            </div>{' '}
        </>
    );
}

export default App;

function ExpenseSummary({ expenses }) {
    const date = new Date(expenses[0].date || '');
    const total = expenses.reduce(
        (acc, { amount }) => acc + Math.round(amount * 100),
        0
    );

    return (
        <div className="space-y-2">
            <div className="border border-gray-200 rounded-xs pb-6 bg-white">
                <header className="flex justify-between gap-2 items-center px-4 sm:px-8 py-5 border-b border-gray-200">
                    <div>{format(date, 'MMMM do')}</div>
                    <div>Spent: ${total / 100}</div>
                </header>

                <div className="grid px-4 sm:px-8 text-balance">
                    {expenses.map((expense) => (
                        <ExpenseItem key={expense.id} expense={expense} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ExpenseItem({ expense }) {
    return (
        <div className="flex items-center justify-between gap-2 py-3 border-b border-gray-200">
            <div>{expense.description}</div>
            <div>${Math.round(expense.amount * 100) / 100}</div>
        </div>
    );
}
