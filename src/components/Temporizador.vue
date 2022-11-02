<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <button class="button" @click="iniciar">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span class="text">play</span>
    </button>
    <button class="button" @click="finalizar">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span class="text">stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
export default defineComponent({
  name: "TemporizadorVue",
  components: {
    Cronometro,
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
    };
  },
  methods: {
    iniciar() {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos++;
      }, 1000);
    },
    finalizar() {
      clearInterval(this.cronometro);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>

<style scoped>
.text {
  padding-left: 1rem;
}
</style>
