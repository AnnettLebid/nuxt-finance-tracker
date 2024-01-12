<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Add Transaction </template>

      <UFormGroup
        label="Transaction Type"
        :required="true"
        name="type"
        class="mb-4"
      >
        <USelect
          placeholder="Select the transaction type"
          :options="transactionTypes"
        />
      </UFormGroup>
      <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
        <UInput type="number" placeholder="Amount" />
      </UFormGroup>
      <UFormGroup
        label="Transaction Date"
        :required="true"
        name="created_at"
        class="mb-4"
      >
        <UInput type="date" icon="" i-heroicons-calendar-days-20-solid />
      </UFormGroup>
      <UFormGroup
        label="Description"
        hint="Optional"
        name="description"
        class="mb-4"
      >
        <UInput type="text" placeholder="Description" />
      </UFormGroup>
      <UFormGroup
        :required="true"
        label="Category"
        hint="Optional"
        class="mb-4"
      >
        <USelect placeholder="Category" :options="categories" />
      </UFormGroup>
      <UButton type="submit" color="primary" variant="solid" label="Save" />
    </UCard>
  </UModal>
</template>

<script setup>
import { categories, transactionTypes } from "~/constants";
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
