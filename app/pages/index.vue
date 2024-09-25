<template>
  <section class="flex items-center justify-between min-h-screen">
    <div class="max-w-xs">
      <h1 class="text-white text-7xl font-bold">
        Finance Management App Dashboard
      </h1>
      <h3 class="text-sm text-white mt-2 font-light">
        Transform Your Financial Goals into Reality with Smart Management
      </h3>
    </div>
  </section>
</template>

<script setup>
import { transactionViewOptions } from "~/constants";

const selectedPeriod = ref(transactionViewOptions[0]);

const { current, previous } = useSelectedTimePeriod(selectedPeriod);
const { refreshTransactions, transactions } = useTransactions(current);
const { refreshTransactions: refreshPreviousTransactions } =
  useTransactions(previous);

await Promise.all([refreshTransactions(), refreshPreviousTransactions()]);
</script>
