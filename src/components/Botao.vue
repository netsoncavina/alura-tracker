<template>
  <button class="button" @click="clicado" :disabled="isAtivo">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span class="text">{{ texto }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BotaoVue",
  emits: ["clicado"],
  props: {
    isAtivo: {
      type: Boolean,
      required: true,
    },
    icone: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
  },
  methods: {
    clicado(): void {
      this.$emit("clicado");
    },
  },
});
</script>

<style scoped>
.text {
  padding-left: 1rem;
}
</style>
