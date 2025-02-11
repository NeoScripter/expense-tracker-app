import { format, isBefore } from 'date-fns';
import { initialData } from './data';
import { groupExpensesByInterval } from './utils/groupExpensesByInterval';
import { useState } from 'react';
import ExpenseFilterPanel from './components/ExpenseFilterPanel ';
import calculateTotal from './utils/calculateTotal';
import logo from './assets/logo.webp';
import { AddExpenseForm } from './components/AddExpenseForm';
import { DATE_GROUPINGS } from './utils/dateGroupings';
import { DatePicker } from './components/DatePicker';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
    // Load expenses from local storage or use initial data
    const [expenses, setExpenses] = useLocalStorage('expenses', initialData);

    // State for grouping expenses by day, week, etc.
    const [dateGrouping, setDateGrouping] = useState(DATE_GROUPINGS.DAY);

    // Stores the search query for filtering expenses
    const [searchQuery, setSearchQuery] = useState('');

    // Controls the visibility of the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Stores the start and end dates for filtering expenses
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Sets start date but ensures it doesn't exceed the end date
    function SelectStartDate(newDate) {
        if (endDate != null && isBefore(endDate, newDate)) return;
        setStartDate(newDate);
    }

    // Sets end date but ensures it doesn't precede the start date
    function SelectEndDate(newDate) {
        if (startDate != null && isBefore(newDate, startDate)) return;
        setEndDate(newDate);
    }

    // Groups expenses based on the selected date interval and filters
    const groupedExpenses = groupExpensesByInterval(
        expenses,
        dateGrouping,
        searchQuery,
        startDate,
        endDate
    );

    // Calculates the total amount from grouped expenses
    const totalAmount = calculateTotal(groupedExpenses);

    return (
        <>
            <div className="p-2 sm:p-4 space-y-4 mx-auto max-w-300">
                <AddExpenseForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    setExpenses={setExpenses}
                />

                <header className="flex items-center justify-between flex-col sm:flex-row">
                    <div className="max-w-50 mb-2">
                        <img src={logo} alt="TrackSpence" />
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary rounded-sm px-6 py-2"
                    >
                        Add expense
                    </button>
                </header>

                <div className="grid items-start sdm:grid-cols-2 sdm:gap-6 px-2 sm:px-0">
                    <DatePicker
                        value={startDate}
                        onChange={SelectStartDate}
                        label="Select start date"
                    />
                    <DatePicker
                        value={endDate}
                        onChange={SelectEndDate}
                        label="Select end date"
                    />
                </div>

                <ExpenseFilterPanel
                    dateGrouping={dateGrouping}
                    setDateGrouping={setDateGrouping}
                    totalAmount={totalAmount}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <div className="grid gap-2 sdm:grid-cols-2">
                    {groupedExpenses.length > 0
                        ? groupedExpenses.map((summary, idx) => (
                              <ExpenseSummary
                                  key={idx + 'summary'}
                                  expenses={summary}
                              />
                          ))
                        : 'No expenses found'}
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
            <div className="border h-full border-gray-200 rounded-xs pb-6 bg-white">
                <header className="flex justify-between gap-2 items-center px-4 sm:px-8 py-5 border-b border-gray-200">
                    <div>{date && format(date, 'MMMM do, yyyy')}</div>
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
