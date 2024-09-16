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
    <UiSkeleton
      :loading="isLoading"
      v-for="index in 5"
      :class="cn('h-10 mt-4')"
    />
    <div
      class="mt-10"
      v-for="(transactionsOnDay, date) in transactionsGroupedByDate"
      :key="date"
    >
      <DailyTransactionSummary :date="date" :transactions="transactionsOnDay" />
      <TransactionsItem
        v-for="transaction in transactionsOnDay"
        :key="transaction.id"
        :transaction
        @deleted="fetchTransactions()"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { cn } from "../../lib/utils";
import { Transaction } from "./Item.vue";

const props = defineProps<{
  selectedPeriod: Ref<string>;
  transactions: Ref<Transaction[]>;
}>();

const { selectedPeriod } = toRefs(props);
const { current } = useSelectedTimePeriod(selectedPeriod);

const {
  refreshTransactions,
  incomeCount,
  expenseCount,
  transactionsGroupedByDate,
  fetchTransactions,
  isLoading,
} = useTransactions(current);

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};
</script>
