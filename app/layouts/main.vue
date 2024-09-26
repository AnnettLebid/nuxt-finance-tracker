<template>
  <div>
    <main class="main-content">
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  background: url("../assets/css/bg-desktop.svg") no-repeat center;
  background-size: cover;
}
</style>
