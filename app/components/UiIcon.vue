<script setup lang="ts">
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

const props = defineProps<{
  name: string;
  class?: string;
  color?: "primary" | "white" | "neutralDark" | "neutralLight";
  size?: "s" | "m" | "l" | "xl";
}>();

const iconVariants = cva("inline-flex", {
  variants: {
    size: {
      s: "h-3 w-3",
      m: "h-4 w-4",
      l: "h-5 w-5",
      xl: "h-6 w-6",
    },
    color: {
      primary: "#222222",
      white: "#FFFFFF",
      neutralDark: "#808080",
      neutralLight: "#B2B2B2",
    },
  },
  defaultVariants: {
    size: "s",
    color: "primary",
  },
});

const classes = computed(() => {
  return cn(
    iconVariants({ size: props.size, color: props.color }),
    props.class
  );
});
</script>

<template>
  <Icon name="props.name" :class="classes" />
</template>

<style lang="scss" scoped></style>
