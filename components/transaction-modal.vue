<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Add Transaction </template>

      <UForm :state="state" :schema="schema" ref="form" @submit="save">
        <UFormGroup
          label="Transaction Type"
          :required="true"
          name="type"
          class="mb-4"
        >
          <USelect
            placeholder="Select the transaction type"
            :options="transactionTypes"
            v-model="state.type"
          />
        </UFormGroup>
        <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
          <UInput
            type="number"
            placeholder="Amount"
            v-model.number="state.amount"
          />
        </UFormGroup>
        <UFormGroup
          label="Transaction Date"
          :required="true"
          name="created_at"
          class="mb-4"
        >
          <UInput
            type="date"
            icon=" "
            i-heroicons-calendar-days-20-solid
            v-model="state.created_at"
          />
        </UFormGroup>
        <UFormGroup
          label="Description"
          hint="Optional"
          name="description"
          class="mb-4"
        >
          <UInput
            type="text"
            placeholder="Description"
            v-model="state.description"
          />
        </UFormGroup>
        <UFormGroup
          :required="true"
          label="Category"
          hint="Optional"
          class="mb-4"
          v-if="state.type === 'Expense'"
        >
          <USelect
            placeholder="Category"
            :options="categories"
            v-model="state.category"
          />
        </UFormGroup>
        <UButton
          type="submit"
          color="primary"
          variant="solid"
          label="Save"
          :loading="loading"
        />
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
import { categories, transactionTypes } from "~/constants";
import { z } from "zod";

const initialState = {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  categories: undefined,
};

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue", "saved"]);

const form = ref();
const isLoading = ref(false);
const state = ref({ ...initialState });

const supabase = useSupabaseClient();
const toast = useToast();

const defaultSchema = z.object({
  amount: z.number().positive("Amount needs to be more than 0"),
  created_at: z.string(),
  description: z.string().optional(),
});

const incomeSchema = z.object({
  type: z.literal("Income"),
});
const expenseSchema = z.object({
  type: z.literal("Expense"),
  category: z.enum(categories),
});
const investmentSchema = z.object({
  type: z.literal("Investment"),
});
const savingSchema = z.object({
  type: z.literal("Saving"),
});

const schema = z.intersection(
  z.discriminatedUnion("type", [
    incomeSchema,
    expenseSchema,
    investmentSchema,
    savingSchema,
  ]),
  defaultSchema
);

const save = async () => {
  form.value.validate();
};

const resetForm = () => {
  Object.assign(state.value, initialState);
  form.value.clear();
};

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) {
      resetForm();
      emit("update:modelValue", value);
    }
  },
});
</script>
