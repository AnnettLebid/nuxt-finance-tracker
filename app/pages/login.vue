<template>
  <UCard v-if="!success">
    <template #header> Sign in to Finance tracker</template>

    <form @submit.prevent="handleLogin">
      <UFormGroup
        label="email"
        name="email"
        class="mb-4"
        :required="true"
        help="You will receive email with a confirmation link"
      >
        <UInput type="email" placeholder="Email" required v-model="email" />
      </UFormGroup>

      <UiButton type="submit" :loading="isLoading">Sign in</UiButton>
    </form>
  </UCard>
  <UCard v-else>
    <template #header> Email has been sent</template>
    <div class="text-center">
      <p class="mb-4">
        We have sent email to <strong>{{ email }}</strong
        >with a link to sign in
      </p>
      <p>Important: the link will expire in 5 minutes!</p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { toastError } = useAppToast();
const supabase = useSupabaseClient();

const success = ref<boolean>(false);
const email = ref<string>("");
const isLoading = ref<boolean>(false);

useRedirectIfAuth();

const handleLogin = async () => {
  isLoading.value = true;
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: { emailRedirectTo: "http://localhost:3000/confirm" },
    });

    if (error) {
      return toastError({
        title: "Error authenticating",
        description: error.message,
      });
    }

    success.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
