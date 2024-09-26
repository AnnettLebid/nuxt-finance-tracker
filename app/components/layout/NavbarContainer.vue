<template>
  <nav :class="classNames.root">
    <div :class="classNames.main">
      <slot />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { cn } from "../../lib/utils";
interface NavbarContainerClasses {
  root: ClassValue;
  container: ClassValue;
}

const props = defineProps<{
  classes?: Partial<NavbarContainerClasses>;
}>();

const classNames = computed(() => {
  return {
    root: cn(["h-14 p-2 flex items-center", props?.classes?.root]),
    main: cn(["container items-center flex", props?.classes?.container]),
  };
});
</script>
