<script>
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '../stores/data';

export default {
    props: {
        id: String,
    },
    data() {
        return {
            autor : {}
        }
    },
    computed: {
        ...mapState(useDataStore, {
            getAutorById: 'getAutorById'
        })
    },
    mounted() {
        this.autor = this.getAutorById(Number(this.id))
    }
};
</script>

<template>
    <div class="col-4">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="'/src/assets/img/' + autor.img" class="card-img-top foto" width="100"/>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ autor.nombre }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ autor.nacionalidad }}</h6>
                        <button class="btn btn-secondary" title="Ver libros">
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