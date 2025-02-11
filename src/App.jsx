import { format, isSameDay, isSameWeek } from 'date-fns';
import { expenses } from './data';
import { groupExpensesByInterval } from './utils/groupExpensesByInterval';
import { useState } from 'react';


function App() {
    const [dateGrouping, setDateGrouping] = useState(() => isSameWeek);
    
    const groupedExpenses = groupExpensesByInterval(expenses, dateGrouping);
    return (
        <div className="p-4 space-y-2 mx-auto max-w-300">
            {groupedExpenses.map((summary, idx) => (
                <ExpenseSummary key={idx + 'summary'} expenses={summary} />
            ))}
        </div>
    );
}

export default App;

function ExpenseSummary({ expenses }) {
    const date = new Date(expenses[0].date);
    const total = expenses.reduce(
        (acc, { amount }) => acc + Math.round(amount * 100),
        0
    );

    return (
        <div className="space-y-2">
            <div className="border border-gray-200 rounded-xs pb-6 bg-white">
                <header className="flex justify-between gap-2 items-center px-4 sm:px-8 py-5 border-b border-gray-200">
                    <div>{format(date, 'MMMM do')}</div>
                    <div>Total: ${total / 100}</div>
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
