<script>
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '../stores/data';

export default {
    props: {
        elem: Object,
    },
    data() {
        return {
            autor : {},
            tema: {}
        }
    },
    computed: {
        ...mapState(useDataStore, {
            getAutorById: 'getAutorById',
            getTemaById: 'getTemaById',
        })
    },
    mounted() {
        this.autor = this.getAutorById(Number(this.elem.autor))
        this.tema = this.getTemaById(Number(this.elem.tema))
    },
    methods: {
        ...mapActions(useDataStore, ['delLibro']),
        remove() {
            this.$emit('delLibro', this.elem)
        }
    }
};
</script>

<template>
    <div class="col-4">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="'/src/assets/img/' + elem.img" class="card-img-top foto" :alt="elem.nombre" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ elem.nombre }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ autor.nombre }} <br>{{ autor.apellidos }}</h6>
                        <p class="card-text"><small class="text-muted"> {{ tema.nombre }}</small></p>
                        <p class="card-text">{{ elem.desc }}</p>
                        <button class="btn btn-secondary" @click="$router.push('/editLibro/' + elem.id)" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-secondary" @click="remove" title="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                        <button class="btn btn-secondary" @click="$router.push('/detalleAutor/' + elem.autor)" title="Ver autor">
                            <i class="bi bi-person"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>