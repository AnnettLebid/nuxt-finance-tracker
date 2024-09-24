<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 text-gray-500 font-bold"
  >
    <div class="flex justify-between items-center">{{ date }}</div>

    <div class="flex items-center justify-end space-x-2 mr-10">
      {{ currency }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ date: String, transactions: Array });
const sum = computed(() => {
  return props.transactions.reduce(
    (acc, current) =>
      current.type === "Income" ? acc + current.amount : acc - current.amount,
    0
  );
});

const { currency } = useCurrency(sum);
</script>
