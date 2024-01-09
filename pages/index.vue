<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selectedView" :options="transactionViewOptions" />
    </div>
  </section>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <Trend
      color="green"
      title="Income"
      :amount="4000"
      :last-amount="6000"
      :loading="false"
    />
    <Trend
      color="green"
      title="Income"
      :amount="6000"
      :lastAmount="3000"
      :loading="false"
    />
    <Trend
      color="green"
      title="Expense"
      :amount="5000"
      :lastAmount="3000"
      :loading="false"
    />
    <Trend
      :color="red"
      title="Investments"
      :amount="8000"
      :lastAmount="3000"
      :loading="false"
    />
  </section>

  <section>
    <Transaction
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
    />
  </section>
</template>

<script setup>
import { transactionViewOptions } from "~/constants";
const selectedView = ref(transactionViewOptions[1]);
const transactions = ref([]);

const client = useSupabaseClient();

const { data } = await useAsyncData("transactions", async () => {
  const { data, error } = await client.from("transactions").select();
  if (error) return [];
  return data;
});
transactions.value = data.value;

const transactionsGroupedByDate = computed(() => {
  let grouped = {};

  for (const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split("T")[0];
    console.log("date", date);

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(transaction);
  }
  return grouped;
});
console.log("transactionsGroupedByDate", transactionsGroupedByDate.value);
</script>

<style scoped></style>
