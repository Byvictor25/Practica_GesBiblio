<script>
import { mapState } from 'pinia';
import { useDataStore } from '../stores/data';
import AutorItem from '../components/AutorItem.vue'

export default {
    components: {
        AutorItem
    },
    computed: {
        ...mapState(useDataStore, {
            autores: 'autores',
        })
    },
    methods: {
        
    }
};
</script>

<template>
    <header>
        <h1>Lista Autores</h1>
    </header>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12" id="almacen">
            <table class="table table-striped table-hover table-responsive">
                <thead class="bg-dark">
                    <tr class="text-white text-center">
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Nacionalidad</th>
                        <th>Retrato</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <autor-item v-for="elem in autores" :key="elem.id" v-bind:elem="elem"
                    ></autor-item>
                </tbody>
                <tfoot id="totalImport">
                    <th colspan="1">Autores Listados:</th>
                    <th class="text-center">{{ this.autores.length }}</th>
                </tfoot>
            </table>
        </div>
    </div>
</template>