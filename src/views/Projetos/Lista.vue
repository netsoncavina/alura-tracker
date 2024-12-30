<template>
  <section class="projetos">
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus" />
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link class="button" :to="`/projetos/${projeto.id}`">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt" />
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash" />
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
import IProjeto from '@/interfaces/IProjeto';
import { EXCLUIR_PROJETO } from '@/store/tipo-mutacoes';
import { OBTER_PROJETOS } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'Lista',
  setup() {
    const store = useStore();
    const projetos = computed(() => store.state.projetos as IProjeto[]);
    store.dispatch(OBTER_PROJETOS);

    const excluir = (id: string) => {
      store.commit(EXCLUIR_PROJETO, id);
    };

    return {
      projetos,
      excluir,
    };
  },
});
</script>
