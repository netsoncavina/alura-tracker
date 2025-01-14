import http from '@/http';
import ITarefa from '@/interfaces/ITarefa';
import { Estado } from '@/store';
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  ALTERAR_TAREFA,
} from '@/store/tipo-acoes';
import {
  DEFINIR_TAREFAS,
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
} from '@/store/tipo-mutacoes';
import { Module } from 'vuex';

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http.get<ITarefa[]>('tarefas').then((response) => {
        commit(DEFINIR_TAREFAS, response.data);
      });
    },
    async [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      await http
        .post('/tarefas', {
          ...tarefa,
        })
        .then((response) => {
          commit(ADICIONA_TAREFA, response.data);
        });
    },
    async [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      await http.put(`/tarefas/${tarefa.id}`, tarefa).then(() => {
        commit(ALTERA_TAREFA, tarefa);
      });
    },
  },
};
