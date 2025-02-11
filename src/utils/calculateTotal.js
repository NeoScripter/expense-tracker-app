export default function calculateTotal(groupedExpenses) {
    return groupedExpenses.reduce((total, summary) => {
        return (
          total +
            summary.reduce(
                // Convert to cents to avoid floating-point issues
                (acc, { amount }) => acc + Math.round(amount * 100), 
                0
            )
        );
    // Convert back to dollars for the final total
    }, 0) / 100; 
}
