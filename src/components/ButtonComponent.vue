<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "primary",
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>

<template>
  <el-button :type="props.type" @click="handleClick">{{
    props.label
  }}</el-button>
</template>
