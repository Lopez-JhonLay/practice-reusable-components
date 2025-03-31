<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const computedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <el-input
    v-model="computedValue"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :type="props.type"
  />
</template>
