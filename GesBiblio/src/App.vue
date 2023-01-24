<script>
import { mapActions } from 'pinia';
import { useDataStore } from './stores/data.js'
import Home from './views/Home.vue';
import AppMenu from './components/AppMenu.vue';

export default {
  components: {
        AppMenu
  },
  methods: {
    ...mapActions(useDataStore, ['loadData'])
  },  
  mounted() {
    this.loadData()
  }
};
</script>

<template>
<app-menu></app-menu>
<div class="container">
  <div class="row">
    <router-view></router-view>
  </div>
</div>

<footer>Gesbiblio 1.0 - Víctor Pérez Doménech</footer>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
</style>
