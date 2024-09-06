<template>
  <section>
    <GeneralHeader
      class="mt-10"
      :title="'Transactions'"
      :sub-title="`You have ${incomeCount} incomes and ${expenseCount} expenses this period`"
    >
      <template #cta>
        <!-- <TransactionModal v-model="isOpen" @saved="refreshTransactions()" /> -->
        <UiButton @click="openModal" variant="secondary">
          <Icon name="mdi-light:plus-circle" class="mr-1" />
          Add
        </UiButton>
      </template>
    </GeneralHeader>

    <div
      class="mt-10"
      v-for="(transactionsOnDay, date) in transactionsGroupedByDate"
      :key="date"
    >
      <DailyTransactionSummary :date="date" :transactions="transactionsOnDay" />
      <div v-for="transaction in transactionsOnDay">
        <TransactionsItem
          :key="transaction.id"
          :transaction
          @deleted="fetchTransactions()"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Transaction } from "./Item.vue";

const props = defineProps<{ transactions: Transaction[] }>();

const { fetchTransactions, incomeCount, expenseCount } = useTransactions();

const transactionsGroupedByDate = computed(() => {
  let grouped = {};

  for (const transaction of props?.transactions) {
    const date = new Date(transaction.created_at).toISOString().split("T")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(transaction);
  }
  return grouped;
}) as ComputedRef<{ [key: string]: Transaction[] }>;
</script>
