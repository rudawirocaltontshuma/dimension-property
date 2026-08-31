import { PageHeader } from "../_lib/page-header";
import { ExpensesByCategoryChart, ExpensesByPropertyChart, MonthlyExpensesChart } from "./_components/expenses-charts";
import { ExpensesTable } from "./_components/expenses-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Expenses" description="Track spending across properties and categories." />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ExpensesByPropertyChart />
        <ExpensesByCategoryChart />
      </div>
      <MonthlyExpensesChart />
      <ExpensesTable />
    </div>
  );
}
