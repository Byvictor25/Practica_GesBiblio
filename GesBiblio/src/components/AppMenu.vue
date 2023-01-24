<script>

export default {
    data() {
        return {
            
        }
    },
    methods: {

    }
}


</script>
<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<span class="navbar-brand" href="#">Almacén ACME</span>
			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav">
					<router-link to="/" class="nav-link">Home</router-link>
					<router-link to="/autores" class="nav-link">Autores</router-link>
					<router-link to="/libros" class="nav-link">Libros</router-link>
					<router-link to="/addLibro" class="nav-link">Nuevo Libro</router-link>
				</div>
			</div>
		</div>
	</nav>
</template>