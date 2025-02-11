import { format } from 'date-fns';
import { initialData } from './data';
import { groupExpensesByInterval } from './utils/groupExpensesByInterval';
import { useState } from 'react';
import ExpenseFilterPanel from './components/ExpenseFilterPanel ';
import calculateTotal from './utils/calculateTotal';
import logo from './assets/logo.webp';
import { AddExpenseForm } from './components/AddExpenseForm';
import { DATE_GROUPINGS } from './utils/dateGroupings';

function App() {
    const [expenses, setExpenses] = useState(initialData);
    const [dateGrouping, setDateGrouping] = useState(DATE_GROUPINGS.DAY);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const groupedExpenses = groupExpensesByInterval(
        expenses,
        dateGrouping,
        searchQuery
    );

    const totalAmount = calculateTotal(groupedExpenses);

    return (
        <>
            <div className="p-2 sm:p-4 space-y-4 mx-auto max-w-300">
                <AddExpenseForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    setExpenses={setExpenses}
                />

                <div className="flex items-center justify-between flex-col sm:flex-row">
                    <div className="max-w-50 mb-2">
                        <img src={logo} alt="TrackSpence" />
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary rounded-sm px-6 py-2"
                    >
                        Add expense
                    </button>
                </div>

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
    const date = expenses[0] ? new Date(expenses[0].date) : null;
    const total = expenses.reduce(
        (acc, { amount }) => acc + Math.round(amount * 100),
        0
    );

    return (
        <div className="space-y-2">
            <div className="border border-gray-200 rounded-xs pb-6 bg-white">
                <header className="flex justify-between gap-2 items-center px-4 sm:px-8 py-5 border-b border-gray-200">
                    <div>{date && format(date, 'MMMM do')}</div>
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
