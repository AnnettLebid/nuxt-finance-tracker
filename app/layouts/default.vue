<template>
  <div>
    <main class="container main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
// Link to Google Fonts
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
      crossorigin: "",
    },
  ],
});
</script>

<style scoped lang="scss">
.main-content {
  background: url("../assets/css/bg-desktop.svg") no-repeat center;
  background-size: cover;
}
</style>
