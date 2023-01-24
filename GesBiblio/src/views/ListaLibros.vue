<script>
import { mapState, mapActions } from 'pinia';
import { useDataStore } from '../stores/data';
import LibroItem from '../components/LibroItem.vue'

export default {
    props: {
        id: String,
    },
    components: {
        LibroItem
    },
    data() {
        return {
            tema: "",
            libros: [],
            titulo: "Libros sin filtrar"
        };
    },
    computed: {
        ...mapState(useDataStore, {
            temas: 'temas',
            getAutorById: 'getAutorById',
        })
    },
    methods: {
        ...mapActions(useDataStore, ['getLibrosByAutor', 'getLibros', 'getLibrosByTemas', 'getLibrosByAutorTema', 'delLibro']),

        async getLibrosInBD() {
            if (this.id) {
                this.libros = await this.getLibrosByAutor(this.id)
                const autor = this.getAutorById(this.id)
                this.titulo = "Libros del autor " + autor.nombre + " " + autor.apellidos
            } else {
                const librosBD = await this.getLibros()
                this.libros = librosBD;
            }
        },
        async selectLibros() {
            if(this.tema != "") {
                const index = this.temas.findIndex((elem) => {
                    if(elem.nombre === this.tema) {
                        return true;
                    }
                })
                if(this.id) {
                    this.libros = await this.getLibrosByAutorTema(this.id, this.temas[index].id)
                    const autor = this.getAutorById(this.id)
                    this.titulo = "Libros del autor " + autor.nombre + " " + autor.apellidos + " del tema " + this.tema
                } else {
                    this.libros = await this.getLibrosByTemas(this.temas[index].id);
                    this.titulo = "Libros del tema " + this.tema
                }
                
            } else {
                const librosBD = await this.getLibros()
                this.libros = librosBD;
                this.titulo = "Libros sin filtrar "
            }
            
        },
        async delLibroInBD(elem)  {
            if(confirm('Quieres borrar el libro ' + elem.nombre)) {
                await this.delLibro(elem.id)
                this.libros = await this.getLibros()

            }
        }
    },
    mounted() {
        this.getLibrosInBD()
    },
    watch: {
        tema: 'selectLibros'
    }
};
</script>

<template>
    <header>
        <h1>{{ titulo}}</h1>
    </header>
    <select class="form-select mb-3" aria-label="Default select example" v-model="tema">
        <option value="">---Selecciona un tema---</option>
        <option v-for="tema in temas"
                :key="tema.id"
                            >
                            {{ tema.nombre }}
        </option>
    </select>
    <libro-item v-for="elem in libros" :key="elem.id" v-bind:elem="elem" @delLibro="delLibroInBD">
    </libro-item>
</template>

<style>
</style>
