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
import { defineComponent } from 'vue';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
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
      const projeto = (this.store as typeof store).state.projeto.projetos.find(
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
        (this.store as typeof store)
          .dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto,
          } as IProjeto)
          .then(() => {
            this.lidarComSucesso();
          });
      } else {
        (this.store as typeof store)
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => {
            this.lidarComSucesso();
          });
      }
    },
    lidarComSucesso() {
      (this.notificar as typeof notificacaoMixin.methods.notificar)(
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
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>
