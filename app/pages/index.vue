<script setup>
import { transactionViewOptions } from "../constants";
const selectedView = ref(transactionViewOptions[1]);
const transactions = ref([]);
const isLoading = ref(false);
const isOpen = ref(false);

const client = useSupabaseClient();

const income = computed(() =>
  transactions.value.filter((transaction) => transaction.type === "Income")
);

const expense = computed(() =>
  transactions.value.filter((transaction) => transaction.type === "Expense")
);

const incomeCount = computed(() => income.value.length);
const expenseCount = computed(() => expense.value.length);

const incomeTotal = computed(() =>
  income.value.reduce((acc, transaction) => acc + transaction.amount, 0)
);

const expenseTotal = computed(() =>
  expense.value.reduce((acc, transaction) => acc + transaction.amount, 0)
);

function openModal() {
  isOpen.value = true;
}

const fetchTransactions = async () => {
  try {
    isLoading.value = true;
    const { data } = await useAsyncData("transactions", async () => {
      const { data, error } = await client
        .from("transactions")
        .select()
        .order("created_at", { ascending: false });
      return data;
    });
    return data.value;
  } catch (error) {
    toast.add({
      title: "Something went wrong",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
};

const refreshTransactions = async () =>
  (transactions.value = await fetchTransactions());

await refreshTransactions();

const transactionsGroupedByDate = computed(() => {
  let grouped = {};

  for (const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split("T")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(transaction);
  }
  // const sorted = Object.keys(grouped).sort().reverse();

  // return sorted.reduce((acc, key) => {
  //   acc[key] = grouped[key];
  //   return acc;
  // }, {});
  return grouped;
});
</script>

<template>
  <div>hello</div>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selectedView" :options="transactionViewOptions" />
    </div>
  </section>
  <section>
    <Form />
  </section>
  <!-- <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <Trend
      color="green"
      title="Income"
      :amount="incomeTotal"
      :last-amount="6000"
      :loading="isLoading"
    />
    <Trend
      color="green"
      title="Expense"
      :amount="expenseTotal"
      :lastAmount="3000"
      :loading="isLoading"
    />
    <Trend
      color="green"
      title="Investments"
      :amount="5000"
      :lastAmount="3000"
      :loading="isLoading"
    />
    <Trend
      :color="red"
      title="Savings"
      :amount="8000"
      :lastAmount="3000"
      :loading="isLoading"
    />
  </section> -->

  <!-- <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">Transactions</h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this
        period
      </div>
    </div>
    <div>
      <TransactionModal v-model="isOpen" @saved="refreshTransactions()" />
      <Button @click="openModal"
        ><Icon name="mdi-light:plus-circle" class="mr-1" />Add</Button
      >
    </div>
  </section> -->
  <!-- 
  <section v-if="!isLoading">
    <div
      v-for="(transactionsOnDay, date) in transactionsGroupedByDate"
      :key="date"
    >
      <DailyTransactionSummary :date="date" :transactions="transactionsOnDay" />
      <Transaction
        v-for="transaction in transactionsOnDay"
        :key="transaction.id"
        :transaction="transaction"
        @deleted="fetchTransactions()"
      />
    </div>
  </section> -->

  <!-- <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section> -->
</template>
<!-- 
<script setup>
import { transactionViewOptions } from "~/constants";
const selectedView = ref(transactionViewOptions[1]);
const transactions = ref([]);
const isLoading = ref(false);
const isOpen = ref(false);

const client = useSupabaseClient();

const income = computed(() =>
  transactions?.value.filter((transaction) => transaction.type === "Income")
);

const expense = computed(() =>
  transactions?.value?.filter((transaction) => transaction.type === "Expense")
);

const incomeCount = computed(() => income.value.length);
const expenseCount = computed(() => expense.value.length);

const incomeTotal = computed(() =>
  income.value.reduce((acc, transaction) => acc + transaction.amount, 0)
);

const expenseTotal = computed(() =>
  expense.value.reduce((acc, transaction) => acc + transaction.amount, 0)
);

const fetchTransactions = async () => {
  try {
    isLoading.value = true;
    const { data } = await useAsyncData("transactions", async () => {
      const { data, error } = await client.from("transactions").select();
      return data;
    });
    return data.value;
  } catch (error) {
    toast.add({
      title: "Something went wrong",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
};

const refreshTransactions = async () =>
  (transactions.value = await fetchTransactions());

await refreshTransactions();

const transactionsGroupedByDate = computed(() => {
  let grouped = {};

  for (const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split("T")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(transaction);
  }
  return grouped;
});
</script>

<style scoped></style> -->
