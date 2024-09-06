<template>
  <section class="flex items-center justify-between mb-10 site-bg">
    <GeneralHeader
      :title="'Summary'"
      :classes="{
        title: 'text-4xl font-extrabold',
      }"
    />
    <!-- <div>
      <USelectMenu v-model="selectedView" :options="transactionViewOptions" />
    </div> -->
  </section>
  <!-- <section>
    <Form />
  </section> -->

  <SummarySection :transactions />
  <TransactionsSection :transactions />
</template>

<script setup>
import { transactionViewOptions } from "~/constants";

const { transactions } = useTransactions();
const selectedView = ref(transactionViewOptions[1]);
</script>
