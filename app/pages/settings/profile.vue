<template>
  <UForm :state="state" :schema="schema">
    <UFormGroup label="Full Name" name="name" class="mb-4">
      <UInput type="text" placeholder="Name" v-model="state.name" />
    </UFormGroup>
    <UFormGroup
      label="Email"
      :required="true"
      name="email"
      class="mb-4"
      help="You will receive a confirmation email on both the old and the new
    addresses if you modify email"
    >
      <UInput type="email" placeholder="Email" v-model="state.email" />
    </UFormGroup>

    <UiButton
      type="submit"
      label="Save"
      :loading="isLoading"
      @click.prevent="saveProfile"
      >Save</UiButton
    >
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { toastSuccess, toastError } = useAppToast();

const state = ref({
  name: user.value.user_metadata?.full_name,
  email: user.value?.email,
});
const isLoading = ref(false);

const schema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email("Invalid email"),
});

const saveProfile = async () => {
  isLoading.value = true;

  try {
    const data = {
      data: {
        full_name: state.value.name,
      },
    };
    if (state.value.email !== user.value.email) {
      data.email = state.value.email;
    }
    const { error } = await supabase.auth.updateUser(data);

    if (error) throw error;

    toastSuccess({
      title: "Profile updated",
    });
  } catch (error: any) {
    toastError({
      title: "Profile was not updated",
      description: error.message,
    });
  } finally {
    isLoading.value = false;
  }
  return;
};
</script>
