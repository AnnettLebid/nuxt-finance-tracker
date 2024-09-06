import { Transaction } from "~/components/Transactions/Item.vue";

export const useTransactions = () => {
  const isLoading = ref(false);
  const transactions = ref<Transaction[]>([]);

  const client = useSupabaseClient();
  const toast = useToast();

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

  refreshTransactions();

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

  return {
    isLoading,
    transactions,
    income,
    expense,
    incomeCount,
    expenseCount,
    fetchTransactions,
    refreshTransactions,
  };
};
