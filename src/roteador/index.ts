import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: () => import('@/views/Tarefas.vue'),
  },
  {
    path: '/projetos',
    component: () => import('@/views/Projetos.vue'),
    children: [
      {
        path: '',
        name: 'Lista',
        component: () => import('@/views/Projetos/Lista.vue'),
      },
      {
        path: 'novo',
        name: 'Novo projeto',
        component: () => import('@/views/Projetos/Formulario.vue'),
      },
      {
        path: ':id',
        name: 'Editar projeto',
        component: () => import('@/views/Projetos/Formulario.vue'),
        props: true,
      },
    ],
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
