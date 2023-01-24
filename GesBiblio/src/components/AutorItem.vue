<script>
import { mapActions } from 'pinia';
import { useDataStore } from '../stores/data';

export default{
    props: {
        elem: Object,
    },
    data() {
        return {

        }
    }
};
</script>

<template>
    <tr class="text-center">
        <td>{{ elem.id }}</td>
        <td>{{ elem.nombre }}</td>
        <td>{{ elem.apellidos }}</td>
        <td>{{ elem.nacionalidad }}</td>
        <td><img :src="'src/assets/img/' + elem.img" width="100"></td>
        <td>
            <button @click="$router.push('/detalleAutor/' + elem.id)" class="btn btn-success">
                <span class="material-icons">visibility</span>
            </button>
            <button @click="$router.push('/librosAutor/' + elem.id)" class="btn btn-info">
                <span class="material-icons">menu_book</span>
            </button>
        </td>
    </tr>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>