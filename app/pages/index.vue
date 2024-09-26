<template>
  <section
    class="flex flex-col items-center md:justify-between min-h-screen-nav md:flex-row gap-1 mt-8"
  >
    <div class="max-w-full mx-auto gap-1 flex flex-col">
      <h1 class="text-white text-5xl font-bold md:text-7xl">
        Finance Management App Dashboard
      </h1>
      <h class="text-sm text-white mt-2 font-light">
        Transform Your Financial Goals into Reality with Smart Management
      </h>
    </div>
    <NuxtImg
      src="/financial-planning.svg"
      alt="Hero image"
      fit="cover"
      width="640"
    />
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

definePageMeta({
  layout: "main",
});
</script>
