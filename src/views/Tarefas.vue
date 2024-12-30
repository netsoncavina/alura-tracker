<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />

    <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje :( </Box>
  </div>
  <div
    class="modal"
    :class="{ 'is-active': tarefaSelecionada }"
    v-if="tarefaSelecionada"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando a tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descrição da tarefa
          </label>
          <input
            type="text"
            v-model="tarefaSelecionada.descricao"
            class="input"
            id="descricaoDaTarefa"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-success" @click="alterarTarefa">
            Salvar alterações
          </button>
          <button class="button" @click="fecharModal">Cancelar</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import ITarefa from '../interfaces/ITarefa';
import { useStore } from '@/store';
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from '@/store/tipo-acoes';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return (this.tarefas as ITarefa[]).length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      (this.store as ReturnType<typeof useStore>).dispatch(
        CADASTRAR_TAREFA,
        tarefa
      );
    },
    selecionarTarefa(tarefa: ITarefa): void {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal(): void {
      this.tarefaSelecionada = null;
    },
    alterarTarefa(): void {
      (this.store as ReturnType<typeof useStore>)
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => {
          this.fecharModal();
        });
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefa.tarefas as ITarefa[]),
      store,
    };
  },
});
</script>
