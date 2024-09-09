<template>
  <section>
    <GeneralHeader
      class="mt-10"
      :title="'Transactions'"
      :sub-title="`You have ${incomeCount} incomes and ${expenseCount} expenses this period`"
    >
      <template #cta>
        <TransactionModal v-model="isOpen" @saved="refreshTransactions()" />
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
const {
  fetchTransactions,
  incomeCount,
  expenseCount,
  refreshTransactions,
  transactionsGroupedByDate,
} = useTransactions();

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

await refreshTransactions();
</script>
