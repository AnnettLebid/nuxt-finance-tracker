<template>
  <LayoutNavbarContainer :classes="{ container: 'justify-between' }">
    <div class="flex items-center gap-1">
      <div class="relative">
        <p class="text-6xl text-white font-extrabold">C</p>
        <p
          class="text-white font-extrabold absolute inset-0 flex items-center justify-center"
        >
          P
        </p>
      </div>
      <div>
        <p class="text-white font-extrabold text-md leading-none">Personal</p>
        <p class="text-white font-semibold text-3xl leading-none">Capital</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <UiButton
        variant="primary"
        class="rounded-full text-white"
        @click="() => navigateTo({ path: '/login' })"
      >
        Log in
      </UiButton>
    </div>
  </LayoutNavbarContainer>
</template>

<script setup lang="ts"></script>
