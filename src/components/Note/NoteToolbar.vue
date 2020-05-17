<template>
  <div class="flex my-1">
    <div class="text-lg flex-initial">
      <font-awesome-icon
        class="cursor-pointer"
        :icon="preview ? 'eye' : 'eye-slash'"
        :class="preview ? 'text-blue-600' : 'text-gray-800'"
        @click="togglePreview"
      />
    </div>
    <div class="flex-1"></div>
    <div class="text-lg flex-initial">
      <font-awesome-icon
        class="text-red-600 cursor-pointer"
        icon="trash"
        @click="deleteNote"
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
      this.$emit("preview-pressed");
    },
    deleteNote() {
      this.$emit("delete-pressed");
    }
  }
};
</script>

<style scoped></style>
