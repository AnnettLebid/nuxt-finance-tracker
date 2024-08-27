<template>
  <div class="flex flex-col space-y-4">
    <label :class="props.labelClasses">{{ props.label }}</label>
    <base-input
      :placeholder="props.placeholder"
      @update:modelValue="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
interface FormGroupProps {
  label?: String;
  placeholder?: String;
  labelClasses?: String;
  inputClasses?: String;
}
const props = defineProps<FormGroupProps>();
const emit = defineEmits(["update:modelValue"]);

function updateValue(value: string | number) {
  emit("update:modelValue", value);
}
</script>
