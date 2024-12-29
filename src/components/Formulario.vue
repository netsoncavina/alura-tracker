<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              v-for="projeto in projetos"
              :key="projeto.id"
              :value="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import IProjeto from '@/interfaces/IProjeto';
import { key } from '@/store';

export default defineComponent({
  data() {
    return {
      descricao: '',
      idProjeto: '',
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: (this.projetos as IProjeto[]).find(
          (projeto: IProjeto) => projeto.id === this.idProjeto
        ),
      });
      this.descricao = '';
    },
  },
  setup() {
    const store = useStore(key);
    const projetos = computed(() => store.state.projetos as IProjeto[]);
    return {
      projetos,
    };
  },
});
</script>
<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
