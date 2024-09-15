<template>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 mb-10"
  >
    <SummaryTrend
      title="Income"
      :amount="incomeTotal"
      :last-amount="prevIncomeTotal"
      :loading="isLoading"
      :classes="{
        title: 'text-teal-600',
      }"
    />

    <SummaryTrend
      title="Expense"
      :amount="expenseTotal"
      :last-amount="prevExpenseTotal"
      :loading="isLoading"
      :classes="{ title: 'text-red-600' }"
    />
    <SummaryTrend
      title="Investments"
      :amount="5000"
      :last-amount="3000"
      :loading="isLoading"
      :classes="{ title: 'text-teal-600' }"
    />
    <SummaryTrend
      title="Savings"
      :amount="8000"
      :last-amount="3000"
      :loading="isLoading"
      :classes="{ title: 'text-teal-600' }"
    />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedPeriod: Ref<string>;
}>();

const { selectedPeriod } = toRefs(props);
const { current, previous } = useSelectedTimePeriod(selectedPeriod);

const { incomeTotal, expenseTotal } = useTransactions(current);
const {
  incomeTotal: prevIncomeTotal,
  expenseTotal: prevExpenseTotal,
  isLoading,
} = useTransactions(previous);
</script>
