<template>
  <UForm :state="state" :schema="schema" @submit="saveSettings">
    <UFormGroup
      label="Transaction View"
      class="mb-4"
      help="Choose how you would like to view transactions"
    >
      <USelect
        v-model="state.transactionView"
        :options="transactionViewOptions"
      />
    </UFormGroup>

    <UButton
      type="submit"
      color="black"
      variant="solid"
      label="Save"
      :loading="isLoading"
      :disabled="isLoading"
    />
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import { transactionViewOptions } from "~/constants";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { toastSuccess, toastError } = useAppToast();

const isLoading = ref(false);
const state = ref({
  transactionView:
    user.value.user_metadata?.transaction_view ?? transactionViewOptions[1],
});

const schema = z.object({
  transactionView: z.enum(transactionViewOptions),
});

const saveSettings = async () => {
  isLoading.value = true;

  try {
    const { error } = await supabase.auth.updateUser({
      data: {
        transaction_view: state.value.transactionView,
      },
    });

    if (error) throw error;

    toastSuccess({
      title: "Settings updated",
    });
  } catch (error) {
    toastError({
      title: "Error updating settings",
      description: error.message,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
