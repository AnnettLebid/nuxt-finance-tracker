<script setup lang="ts">
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { type ClassValue } from "clsx";
import { cn } from "../lib/utils";

interface ButtonProps {
  class?: ClassValue;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  disabled?: boolean;
  loading?: boolean;
}

const props = defineProps<ButtonProps>();
defineEmits(["click"]);
console.log("props", props);

const buttonVariants = cva(
  `flex items-center rounded-md hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500`,
  {
    variants: {
      variant: {
        primary: "bg-blue-400",
        danger: "bg-red-500",
        alert: "bg-yellow-500",
      },
      size: {
        small: "py-2 px-4",
        large: "text-xl py-3 px-6",
      },
    },
    defaultVariants: {
      size: "small",
      variant: "primary",
    },
  }
);
const classes = computed(() => {
  return cn(
    buttonVariants({ variant: props.variant, size: props.size }),
    props.class
  );
});
console.log("classes", classes.value);
</script>
<template>
  <button :class="classes" :disabled="disabled" @click="$emit('click', $event)">
    <template v-if="loading">
      <Spinner />
    </template>
    <slot v-else />
  </button>
</template>
