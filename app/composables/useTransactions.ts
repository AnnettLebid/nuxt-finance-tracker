import { Transaction } from "~/components/Transactions/Item.vue";

interface DateRange {
  from: Date;
  to: Date;
}

const transactions = ref<Transaction[]>([]);

export const useTransactions = (period: Ref<DateRange>) => {
  const client = useSupabaseClient();
  const toast = useToast();

  const isLoading = ref(false);

  const fetchTransactions = async () => {
    isLoading.value = true;
    try {
      const { data } = await useAsyncData(
        `transactions-${period.value.from.toISOString()}-${period.value.to.toISOString()}`,
        async () => {
          const { data, error } = await client
            .from("transactions")
            .select()
            .gte("created_at", period.value.from.toISOString())
            .lte("created_at", period.value.to.toISOString())
            .order("created_at", { ascending: false });

          if (error) return [];

          return data;
        }
      );
      return data.value;
    } finally {
      isLoading.value = false;
    }
  };

  const refreshTransactions = async () => {
    return (transactions.value = await fetchTransactions());
  };

  watch(period, async () => await refreshTransactions());

  const income = computed(() =>
    transactions?.value?.filter((transaction) => transaction.type === "Income")
  );

  const expense = computed(() =>
    transactions?.value?.filter((transaction) => transaction.type === "Expense")
  );

  const incomeCount = computed(() => income?.value?.length);
  const expenseCount = computed(() => expense?.value?.length);

  const incomeTotal = computed(() =>
    income?.value?.reduce((acc, transaction) => acc + transaction.amount, 0)
  );
  const expenseTotal = computed(() =>
    expense?.value?.reduce((acc, transaction) => acc + transaction.amount, 0)
  );

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
    incomeTotal,
    expense,
    expenseTotal,
    incomeCount,
    expenseCount,
    fetchTransactions,
    refreshTransactions,
  };
};
