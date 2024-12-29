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

export default defineComponent({
  name: 'Lista',
  setup() {
    const store = useStore();
    return {
      projetos: computed(() => store.state.projetos as IProjeto[]),
    };
  },
});
</script>
