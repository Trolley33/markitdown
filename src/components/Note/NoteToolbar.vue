<template>
  <div class="flex my-1">
    <div class="text-lg">
      <font-awesome-icon
        class="cursor-pointer"
        :icon="preview ? 'eye' : 'eye-slash'"
        :class="preview ? 'text-blue-600' : 'text-gray-800'"
        @click="togglePreview"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "note-toolbar",
  props: ["preview"],
  methods: {
    togglePreview() {
      this.$emit("toggle-preview");
    }
  }
};
</script>

<style scoped>
</style>