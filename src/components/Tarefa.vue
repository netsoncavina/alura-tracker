<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="columns is-7">{{ tarefa.descricao }}</div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.tempoDecorrido" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "TarefaVue",
  components: {
    Cronometro,
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
});
</script>

<style scoped>
.box {
  background-color: #a2d1f7;
}
</style>
