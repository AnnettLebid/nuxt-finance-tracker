import { Transaction } from "~/components/Transactions/Item.vue";

export const useTransactions = () => {
  const client = useSupabaseClient();
  const toast = useToast();

  const isLoading = ref(false);
  const transactions = ref<Transaction[]>([]);

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

  const refreshTransactions = async () => {
    transactions.value = (await fetchTransactions()) || [];
  };

  const income = computed(() =>
    transactions?.value?.filter((transaction) => transaction.type === "Income")
  );

  const expense = computed(() =>
    transactions?.value?.filter((transaction) => transaction.type === "Expense")
  );

  const incomeCount = computed(
    () =>
      transactions?.value?.filter(
        (transaction) => transaction.type === "Income"
      )?.length
  );
  const expenseCount = computed(() => expense?.value.length);

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
  }) as ComputedRef<{ [key: string]: Transaction[] }>;

  return {
    isLoading,
    transactions,
    transactionsGroupedByDate,
    income,
    expense,
    incomeCount,
    expenseCount,
    fetchTransactions,
    refreshTransactions,
  };
};
