export default function calculateTotal(groupedExpenses) {
    return groupedExpenses.reduce((total, summary) => {
        return (
          total +
            summary.reduce(
                (acc, { amount }) => acc + Math.round(amount * 100),
                0
            )
        );
    }, 0) / 100;
}