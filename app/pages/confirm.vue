<template>
  <UCard>
    <template #header>
      <p class="text-xl font-bold">Signing in ...</p>
    </template>
  </UCard>
</template>

<script setup lang="ts">
useRedirectIfAuth();
</script>
