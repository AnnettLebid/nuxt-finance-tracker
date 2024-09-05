<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"">
    <SummaryTrend
      title="Income"
      :amount="incomeTotal"
      :last-amount="6000"
      :loading="!transactions"
      :classes="{
        title: 'text-teal-600',
      }"
    />

    <SummaryTrend
      title="Expense"
      :amount="expenseTotal"
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
import { Transaction } from "../Transactions/Item.vue";

const props = defineProps<{ transactions: Transaction[] }>();

const income = computed(() =>
  props.transactions?.filter((transaction) => transaction.type === "Income")
);

const expense = computed(() =>
  props.transactions?.filter((transaction) => transaction.type === "Expense")
);

const incomeTotal = computed(() =>
  income.value?.reduce((acc, transaction) => acc + transaction.amount, 0)
);

const expenseTotal = computed(() =>
  expense.value?.reduce((acc, transaction) => acc + transaction.amount, 0)
);
</script>
