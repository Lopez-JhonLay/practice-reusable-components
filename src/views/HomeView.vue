<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";

import ButtonComponent from "@/components/ButtonComponent.vue";
import InputTextComponent from "@/components/InputComponent.vue";

import type { Entry } from "@/model";

import { useEntryStore } from "@/stores/entry";

const drawer = ref(false);

const entryFormRef = ref<FormInstance>();

const { saveEntry } = useEntryStore();

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const entryForm: Entry = reactive({
  id: "",
  title: "",
  content: "",
});

const entryFormRules = reactive<FormRules<Entry>>({
  title: [
    { required: true, message: "Please input Entry title", trigger: "blur" },
    { min: 3, max: 20, message: "Length should be 3 to 20", trigger: "blur" },
  ],
  content: [
    { required: true, message: "Please input Entry content", trigger: "blur" },
    { min: 3, max: 280, message: "Length should be 3 to 280", trigger: "blur" },
  ],
});

const submitEntryForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      saveEntry(entryForm);
      formEl.resetFields();
      toggleDrawer();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetEntryForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <div class="drawer-button-container">
    <ButtonComponent label="Add Entry" @click="toggleDrawer" />
  </div>
  <el-drawer
    direction="ltr"
    v-model="drawer"
    title="Journal Entry Form"
    size="30%"
  >
    <el-form
      ref="entryFormRef"
      :rules="entryFormRules"
      :model="entryForm"
      label-width="auto"
      style="max-width: 600px"
    >
      <el-form-item label="Entry Title:" prop="title">
        <InputTextComponent
          v-model="entryForm.title"
          placeholder="ex. OJT"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="Entry Content:" prop="content">
        <InputTextComponent
          type="textarea"
          v-model="entryForm.content"
          :rows="5"
          placeholder="..."
          maxlength="280"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitEntryForm(entryFormRef)">
          Save
        </el-button>
        <el-button type="default" @click="resetEntryForm(entryFormRef)"
          >Reset</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
.drawer-button-container {
  padding: 20px;
}
</style>
