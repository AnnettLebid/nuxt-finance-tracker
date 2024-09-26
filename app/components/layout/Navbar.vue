<template>
  <LayoutNavbarContainer :classes="{ container: 'justify-between' }">
    <Logo />
    <div class="flex items-center gap-2">
      <UserMenu v-if="user" />
      <UiButton
        v-else
        variant="primary"
        class="rounded-full text-white"
        @click="() => navigateTo({ path: '/login' })"
      >
        Log in
      </UiButton>
    </div>
  </LayoutNavbarContainer>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>
