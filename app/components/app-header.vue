<template>
  <header class="flex justify-between items-center mb-5 text-white">
    <h2 class="text-xl font-bold">Personal Finance tracker</h2>
  </header>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const items = [
  [
    {
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      click: () => navigateTo("/settings/profile"),
    },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: async () => {
        await supabase.auth.signOut();
        return navigateTo("/login");
      },
    },
  ],
];
</script>
