import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { NOTIFICAR } from './tipo-mutacoes';
import { INotificacao } from '@/interfaces/INotificacao';

import { EstadoProjeto, projeto } from './modulos/projeto';
import { EstadoTarefa, tarefa } from './modulos/tarefa';

export interface Estado {
  notificacoes: INotificacao[];
  tarefa: EstadoTarefa;
  projeto: EstadoProjeto;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefa: {
      tarefas: [],
    },
    projeto: {
      projetos: [],
    },
  },
  mutations: {
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
  actions: {},
  modules: {
    projeto,
    tarefa,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}

// export default key;
