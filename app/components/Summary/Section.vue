<template>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <SummaryTrend
      title="Income"
      :amount="8000"
      :last-amount="6000"
      :loading="!transactions"
      :classes="{
        title: 'text-teal-600',
      }"
    />

    <SummaryTrend
      title="Expense"
      :amount="5000"
      :last-amount="3000"
      :loading="!transactions"
      :classes="{ title: 'text-red-600' }"
    />
    <SummaryTrend
      title="Investments"
      :amount="5000"
      :last-amount="3000"
      :loading="!transactions"
      :classes="{ title: 'text-teal-600' }"
    />
    <SummaryTrend
      title="Savings"
      :amount="8000"
      :last-amount="3000"
      :loading="!transactions"
      :classes="{ title: 'text-teal-600' }"
    />
  </section>
</template>

<script setup lang="ts">
import { Transaction } from "../Transaction.vue";

const props = defineProps<{ transactions: Transaction[] }>();

const income = computed(() =>
  props.transactions?.filter((transaction) => transaction.type === "Income")
);
const incomeTotal = computed(() =>
  income.value?.reduce((acc, transaction) => acc + transaction.amount, 0)
);
// const expenseTotal = computed(() =>
//   props.expense.value?.reduce((acc, transaction) => acc + transaction.amount, 0)
// );
</script>
