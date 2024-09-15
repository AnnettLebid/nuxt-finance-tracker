<template>
  <section class="flex items-center justify-between mb-10 site-bg">
    <GeneralHeader
      :title="'Summary'"
      :classes="{
        title: 'text-4xl font-extrabold',
      }"
    />
    <div>
      <USelectMenu v-model="selectedPeriod" :options="transactionViewOptions" />
    </div>
  </section>
  <!-- <section>
    <Form />
  </section> -->

  <SummarySection :selectedPeriod />
  <TransactionsSection :selectedPeriod :transactions />
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
