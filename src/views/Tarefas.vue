<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje :( </Box>
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
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefas as ITarefa[]),
      store,
    };
  },
});
</script>
