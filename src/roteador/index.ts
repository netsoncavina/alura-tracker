import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: () => import('@/views/Tarefas.vue'),
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: () => import('@/views/Projetos.vue'),
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
