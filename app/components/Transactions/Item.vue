<template>
  <div
    class="grid grid-cols-3 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex justify-between items-center col-span-2 space-x-4">
      <div class="flex items-center space-x-1">
        <UIcon :name="icon" :class="[iconColor]" />
        <div>{{ transaction.description }}</div>
      </div>
      <UBadge color="white" v-if="transaction.category"
        >{{ transaction.category }}
      </UBadge>
    </div>

    <div class="flex items-center justify-end space-x-2">
      <div>{{ currency }}</div>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton
          :loading="isLoading"
          color="white"
          variant="ghost"
          trailing-icon="i-heroicons-ellipsis-horizontal"
        />
      </UDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Transaction {
  id: number;
  category: string;
  created_at: string;
  description: string;
  type: "Expense" | "Income" | "Investment";
  amount: number;
}

interface TransactionProps {
  transaction: Transaction;
}
const props = defineProps<TransactionProps>();
const emit = defineEmits(["deleted"]);

const { currency } = useCurrency(props.transaction.amount);
const supabase = useSupabaseClient(); //will not create another connection
const toast = useToast();

const isLoading = ref(false);

const isIncome = computed(() => props.transaction.type === "Income");

const icon = computed(() =>
  isIncome.value ? "i-heroicons-arrow-up-right" : "i-heroicons-arrow-down-right"
);

const iconColor = computed(() =>
  isIncome.value ? "text-green-600" : "text-red-600"
);

const deleteTransaction = async (id: number) => {
  isLoading.value = true;
  try {
    await supabase.from("transactions").delete().eq("id", props.transaction.id);
    toast.add({
      title: "Transaction deleted",
      icon: "i-heroicons-check-circle",
      color: "green",
    });
    emit("deleted", props.transaction.id);
  } catch (error) {
    toast.add({
      title: "Transaction deleted",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
};

const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit"),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: deleteTransaction,
    },
  ],
];
</script>
