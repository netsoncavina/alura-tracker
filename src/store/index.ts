import IProjeto from '@/interfaces/IProjeto';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  DEFINIR_PROJETOS,
  DEFINIR_TAREFAS,
  EXCLUIR_PROJETO,
  NOTIFICAR,
} from './tipo-mutacoes';
import { INotificacao } from '@/interfaces/INotificacao';
import {
  ALTERAR_PROJETO,
  CADASTRAR_PROJETO,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_PROJETO,
} from './tipo-acoes';
import http from '@/http';
import ITarefa from '@/interfaces/ITarefa';

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
  tarefas: ITarefa[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [],
    tarefas: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((p) => p.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((p) => p.id !== id);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (n) => n.id !== novaNotificacao.id
        );
      }, 2000);
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get<IProjeto[]>('projetos').then((response) => {
        commit(DEFINIR_PROJETOS, response.data);
      });
    },
    async [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      await http.post('/projetos', {
        nome: nomeDoProjeto,
      });
      contexto.commit(ADICIONA_PROJETO, nomeDoProjeto);
    },
    async [ALTERAR_PROJETO]({ commit }, projeto: IProjeto) {
      await http.put(`/projetos/${projeto.id}`, projeto);
      commit(ALTERA_PROJETO, projeto);
    },
    async [REMOVER_PROJETO]({ commit }, id: string) {
      await http.delete(`/projetos/${id}`).then(() => {
        commit(EXCLUIR_PROJETO, id);
      });
    },
    [OBTER_TAREFAS]({ commit }) {
      http.get<ITarefa[]>('tarefas').then((response) => {
        commit(DEFINIR_TAREFAS, response.data);
      });
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}

// export default key;
