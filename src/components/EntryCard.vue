<template>
  <el-row :gutter="20" style="padding: 20px">
    <el-col
      v-for="entry in store.entries"
      :id="entry.id"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
    >
      <el-card class="card-item" style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span>{{ entry.title }}</span>
          </div>
        </template>
        <p>{{ entry.content }}</p>
        <template #footer>{{ entry.date?.toDateString() }}</template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useEntryStore } from "@/stores/entry";

const store = useEntryStore();
</script>

<style scoped>
.card-item {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s;
}
</style>
