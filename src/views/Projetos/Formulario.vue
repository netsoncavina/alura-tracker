<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjet"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import IProjeto from '@/interfaces/IProjeto';
import { notificacaoMixin } from '@/mixins/notificar';
import { store, useStore } from '@/store';
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutacoes';
import { defineComponent } from 'vue';
import useNotificador from '@/hooks/notificador';
// import { Store } from 'vuex';

export default defineComponent({
  name: 'Formulario',
  props: {
    id: {
      type: String,
    },
  },
  //   mixins: [notificacaoMixin],
  mounted() {
    if (this.id) {
      const projeto = (this.store as typeof store).state.projetos.find(
        (projeto) => projeto.id === this.id
      );
      if (projeto) {
        this.nomeDoProjeto = projeto.nome;
      }
    }
  },
  data() {
    return {
      nomeDoProjeto: '',
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        (this.store as typeof store).commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        } as IProjeto);
        this.$router.push('/projetos');
        return;
      }
      (this.store as typeof store).commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      this.notificar(
        TipoNotificacao.SUCESSO,
        'Sucesso',
        'Projeto salvo com sucesso'
      );
      this.nomeDoProjeto = '';
      this.$router.push('/projetos');
    },
  },

  setup() {
    const store = useStore();
    const { notificar } = useNotificador() as any;
    return {
      store,
      notificar,
    };
  },
});
</script>
