import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ListaAutores from '../views/ListaAutores.vue'
import ListaLibros from '../views/ListaLibros.vue'
import AddLibro from '../views/AddLibro.vue'
import DetalleAutor from '../views/DetalleAutor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/autores',
      name: 'ListaAutores',
      component: ListaAutores
    },
    {
      path: '/libros',
      name: 'ListaLibros',
      component: ListaLibros
    },
    {
      path: '/addLibro',
      name: 'AddLibro',
      component: AddLibro
    },
    {
      path: '/detalleAutor/:id',
      name: 'detalleAutor',
      component: DetalleAutor,
      props: true,
    },
    {
      path: '/librosAutor/:id',
      name: 'librosAutor',
      component: ListaLibros,
      props: true,
    },
    {
      path: '/editLibro/:id',
      name: 'editLibro',
      component: AddLibro,
      props: true
    },
  ]
})

export default router
