<template>
  <header
    :class="cn('flex justify-between items-baseline', props?.classes?.root)"
  >
    <div>
      <h3 :class="cn('font-semibold text-lg', props?.classes?.title)">
        {{ title }}
      </h3>
      <h4
        :class="
          cn('font-light text-black/50 text-base', props?.classes?.subtitle)
        "
      >
        {{ subTitle }}
      </h4>
    </div>
    <slot name="cta" />
  </header>
</template>

<script setup lang="ts">
import { cn } from "../../lib/utils.js";

interface HeaderProps {
  title: string;
  subTitle: string;
  classes?: {
    root?: ClassValue;
    title?: ClassValue;
    subtitle?: ClassValue;
  };
}

const props = defineProps<HeaderProps>();
</script>
