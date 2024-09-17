<template>
  <div class="grid grid-cols-6 gap-8">
    <UVerticalNavigation :links="links" class="col-span-2" />
    <div class="col-span-4">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    label: "Profile",
    to: "/settings/profile",
    icon: "i-heroicons-user-circle",
  },
  {
    label: "Avatar",
    to: "/settings/avatar",
    icon: "i-heroicons-user",
  },
  {
    label: "Settings",
    icon: "i-heroicons-bell",
    to: "/settings/settings",
  },
];
</script>
