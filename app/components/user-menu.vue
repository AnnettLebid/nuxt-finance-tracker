<template>
  <UDropdown
    v-if="user"
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }"
  >
    <UAvatar alt="Avatar" :src="url" />

    <template #account="{ item }">
      <div class="text-left">
        <p>Signed in as</p>
        <p class="font-medium text-gray-900">
          {{ user.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 ms-auto"
      />
    </template>
  </UDropdown>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { url } = useAvatarUrl();
watchEffect(() => console.log(url.value));

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
