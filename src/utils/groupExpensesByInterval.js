import { isSameDay, isSameWeek } from 'date-fns';
import { DATE_GROUPINGS } from './dateGroupings';

export function groupExpensesByInterval(expenses, dateGrouping, searchQuery) {
    const isSameInterval = dateGrouping === DATE_GROUPINGS.WEEK ? isSameWeek : isSameDay;
    // Sort the expenses in acsending order
    const sortedExpenses = [...expenses].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Stores grouped expenses by date
    const groupedExpenses = [];
    // Stores expenses for the current date
    let currentGroup = [];
    // Tracks the current processing date
    let currentDate = null;

    for (const expense of sortedExpenses) {
        const expenseDate = new Date(expense.date);

        // Initialize the first date for grouping
        if (currentDate === null) currentDate = expenseDate;

        // If the expense belongs to a new time interval, save the previous group
        if (
            !isSameInterval(expenseDate, currentDate) &&
            currentGroup.length > 0
        ) {
            groupedExpenses.push([...currentGroup]); // Store the completed group
            currentGroup = []; // Start a new group
        }

        // Add expense to the current group if it matches the search query or if search is empty
        if (
            searchQuery.trim() === '' || // Include all if no search
            expense.description
                .toLowerCase()
                .includes(searchQuery.trim().toLowerCase())
        ) {
            currentGroup.push(expense);
        }

        // Update the current date reference for the next iteration
        currentDate = expenseDate;
    }

    // Push the last group if there are remaining expenses or search is empty
    if (currentGroup.length > 0 || searchQuery.trim() === '') {
        groupedExpenses.push([...currentGroup]);
    }

    return groupedExpenses;
}
