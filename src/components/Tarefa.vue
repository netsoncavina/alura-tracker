<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="columns is-7">Descrição da tarefa</div>
      <div class="column">
        <Cronometro />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "TarefaVue",
  components: {
    Cronometro,
  },
});
</script>

<style scoped>
.box {
  background-color: #a2d1f7;
}
</style>
