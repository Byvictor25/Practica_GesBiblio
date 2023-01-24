import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const SERVER = import.meta.env.VITE_SERVERURL
import axios from 'axios'

export const useDataStore = defineStore('data', {
  state() {
    return {
      temas: [],
      autores: []
    }
  },
  actions: {
    async loadData() {
      try {
        const response = await axios.get(SERVER + '/temas')
        this.temas = response.data
        const response1 = await axios.get(SERVER + '/autores')
        this.autores = response1.data
      } catch (error) {
        alert(error)
      }
    },

    async getLibros() {
      try {
        const response = await axios.get(SERVER + '/libros')
        return response.data
      } catch (error) {
        alert(error)
      }
    },
    async getAutor(id) {
      try {
        const response = await axios.get(SERVER + '/autores/' + id)
        return response.data
      } catch(error) {
        alert("Error al cargar el producto: " + error)
      }
    },

    async delLibro(id) {
      try {
        const response = await axios.delete(SERVER + '/libros/' + id)
      } catch(error) {
        alert(error)
      }
    },

    async addLibro(newLibro) {
      try {
        const response = await axios.post(SERVER + '/libros', {
            ISBN: newLibro.ISBN,
            nombre: newLibro.nombre,
            tema: newLibro.tema,
            autor: newLibro.autor,
            desc: newLibro.desc,
            img: newLibro.img || "default.jpg" 
        })
      } catch(error) {
        alert("Error al añadir un libro nuevo: " + error)
      }
    },

    async getLibro(id) {
      try {
        const response = await axios.get(SERVER + '/libros/' + id)
        return response.data
      } catch(error) {
        alert("Error al cargar el libro: " + error)
      }
    },

    async editLibro(libro) {
      try {
        const response = await axios.put(SERVER + '/libros/' + libro.id, {
          ISBN: libro.ISBN,
          nombre: libro.nombre,
          tema: libro.tema,
          autor: libro.autor,
          desc: libro.desc,
          img: libro.img || "default.jpg" 
        })
      } catch(error) {
        alert("Error al editar un libro: " + error)
      }
    },

    async getLibrosByAutor(autor) {
      try {
        const response = await axios.get(SERVER + '/libros?autor=' + autor)
        return response.data
      } catch(error) {
        alert(error)
      }
    },

    async getLibrosByTemas(tema) {
      try {
        const response = await axios.get(SERVER + '/libros?tema=' + tema)
        return response.data
      } catch(error) {
        alert("Error al cambiar el tema" + error)
      }
    },

    async getLibrosByAutorTema(autor, tema) {
      try {
        const response = await axios.get(SERVER + '/libros?autor=' + autor + "&tema=" + tema)
        return response.data
      } catch(error) {
        alert("Error al cambiar el tema" + error)
      }
    }
  },
  getters: {
    getAutorById: (state) =>  (id) => {
      return state.autores.find((autor) => autor.id == id)
    },
    getTemaById: (state) =>  (id) => {
      return state.temas.find((tema) => tema.id == id)
    },
  }
})
