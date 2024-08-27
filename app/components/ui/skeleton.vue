<template>
  <div
    v-if="loading"
    :class="cn('bg-slate-200 animate-pulse h-5 w-full rounded-md', props.class)"
  />
  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ClassValue } from "class-variance-authority/types";
import { cn } from "../../lib/utils";

const props = defineProps<{
  class?: ClassValue;
  loading: boolean;
}>();
</script>
