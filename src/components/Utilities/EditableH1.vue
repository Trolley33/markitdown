<template>
  <div>
    <h1 ref="header" class="w-full" v-if="!editing" @dblclick="startEditing">
      <slot></slot>
    </h1>
    <input
      ref="input"
      v-else
      v-model="tempTitle"
      @blur="finishEditing"
      @keypress.enter="finishEditing"
    />
  </div>
</template>

<script>
export default {
  name: "editable-h1",
  data: () => ({
    editing: false,
    tempTitle: ""
  }),
  methods: {
    startEditing() {
      this.editing = true;
      this.tempTitle = this.$refs.header.innerText;
      const vm = this;
      this.$nextTick(() => {
        vm.$refs.input.focus();
      });
    },
    finishEditing() {
      this.$emit("update", this.tempTitle);
      this.editing = false;
    }
  }
};
</script>

<style scoped>
input {
  margin-bottom: -2px;
  @apply text-4xl w-full bg-transparent;
}

input:focus {
  @apply outline-none border-b border-b-2 border-teal-500;
}
</style>
