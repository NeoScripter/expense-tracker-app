export function groupExpensesByInterval(expenses, isSameInterval) {
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

        // Initialize first date
        if (currentDate === null) currentDate = expenseDate;

        if (isSameInterval(expenseDate, currentDate)) {
            // Add to the current group
            currentGroup.push(expense);
        } else {
            // Store completed group
            groupedExpenses.push([...currentGroup]);
            // Start a new group
            currentGroup = [expense];
        }

        // Update reference for next iteration
        currentDate = expenseDate;
    }
    // Push the last remaining group to the expenses
    if (currentGroup.length > 0) {
        groupedExpenses.push([...currentGroup]);
    }

    return groupedExpenses;
}
