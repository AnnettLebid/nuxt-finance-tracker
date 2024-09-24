<template>
  <div
    :class="
      cn(
        'p-3 flex flex-col gap-2 bg-white rounded-lg shadow-sm',
        props.classes?.root
      )
    "
  >
    <p :class="cn('font-bold', props?.classes?.title)">
      <slot name="title">
        {{ title }}
      </slot>
    </p>

    <UiSkeleton :loading>
      <slot name="subtitle">
        {{ currency }}
      </slot>
    </UiSkeleton>

    <div>
      <UiSkeleton :loading>
        <div class="flex space-x-1 items-center text-sm">
          <UIcon
            :name="icon"
            class="w-6 h-6"
            :class="{
              'text-teal-600': trendingUp,
              'text-red-600': !trendingUp,
            }"
          />
          <div class="text-gray-500">
            {{ percentageTrend }}
          </div>
        </div>
      </UiSkeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "../../lib/utils";

interface TrendProps {
  title: string;
  amount: number;
  lastAmount: number;
  loading: boolean;
  classes?: {
    root?: ClassValue;
    title?: ClassValue;
    info?: ClassValue;
  };
}

const props = defineProps<TrendProps>();

const { currency } = useCurrency(props.amount);

const trendingUp = computed(() => props.amount > props.lastAmount);

const icon = computed(() => {
  return trendingUp.value
    ? "i-heroicons-arrow-trending-up"
    : "i-heroicons-arrow-trending-down";
});

const percentageTrend = computed(() => {
  if (props.amount === 0 || props.lastAmount === 0) return "0%";

  const bigger = Math.max(props.amount, props.lastAmount);
  const lower = Math.min(props.amount, props.lastAmount);
  const ratio = ((bigger - lower) / lower) * 100;
  return `${Math.ceil(ratio)}%`;
});
</script>
