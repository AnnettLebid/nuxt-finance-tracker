<template>
  <label class="flex cursor-pointer select-none items-center">
    <div class="relative">
      <input
        type="checkbox"
        class="sr-only"
        @change="toggle"
        :aria-checked="toggled.toString()"
      />
      <div class="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
      <div
        :class="{ 'translate-x-full !bg-primary': toggled }"
        class="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"
      ></div>
    </div>
  </label>
</template>

<script setup>
// const modelValue = defineModel<boolean>();
const props = defineProps(["toggled"]);
console.log("props", props);
const emit = defineEmits(["input"]);
const toggle = () => emit("input", !props.value);

watch(
  () => props,
  (newVal, oldVal) => {
    console.log(newVal);
    console.log(oldVal);
  }
);
</script>
