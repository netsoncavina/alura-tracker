import http from '@/http';
import IProjeto from '@/interfaces/IProjeto';
import { Estado } from '@/store';
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETO,
  ALTERAR_PROJETO,
  REMOVER_PROJETO,
} from '@/store/tipo-acoes';
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  DEFINIR_PROJETOS,
  EXCLUIR_PROJETO,
} from '@/store/tipo-mutacoes';
import { Module } from 'vuex';

export interface EstadoProjeto {
  projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
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
  },
  modules: {},
};
