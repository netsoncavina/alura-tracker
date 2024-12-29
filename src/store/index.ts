import IProjeto from '@/interfaces/IProjeto';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

interface Estado {
  projetos: IProjeto[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [
      { id: '1', nome: 'Projeto 1' },
      { id: '2', nome: 'Projeto 2' },
      { id: '3', nome: 'Projeto 3' },
    ],
  },
  mutations: {
    ADICIONA_PROJETO(state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
  },
});

// export function useStore(): Store<Estado> {
//   return vuexUseStore(key);
// }

// export default key;
