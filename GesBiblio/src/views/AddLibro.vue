<script>
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '../stores/data';
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        id: String,
    },
    data() {
        return {
            newLibro: {},
            mySchema: {
                nombre: (value) => {
                    if (!value) return "El campo nombre es obligatorio";
                    if (value.length < 3 || value.length > 50) return "El nombre tiene que tener entre 2 y 50 caracteres";
                    return true;
                },
                ISBN: (value) => {
                    if (!value) return "El campo ISBN es obligatorio";
                    const regex = /^\d{10}$/i;
                    if (!regex.test(value)) return "El ISBN tiene que tener 10 dígitos";
                    return true;
                },
                tema: (value) => {
                    if (!value) return "El campo tema es obligatorio";
                    return true;
                },
                autor: (value) => {
                    if (!value) return "El campo autor es obligatorio";
                    return true;
                },
            }
        }
    },
    computed: {
        ...mapState(useDataStore, {
            autores: 'autores',
            temas: 'temas'
        })
    },
    methods: {
        ...mapActions(useDataStore, ['addLibro', 'getLibro', 'editLibro']),
        async onSubmit(values) {
            if(values.id){
                await this.editLibro(values)
                this.newLibro = ""
                this.$router.push('/libros')
            } else {
                await this.addLibro(values)
                this.newLibro = ""
                this.$router.push('/libros')
            }
        },
        async getLibroInBD() {
            if(this.id) {
                this.newLibro = await this.getLibro(this.id)
            }
        },

    },
    mounted() {
        this.getLibroInBD()
    }
};
</script>

<template>
    <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-sm-6 col-md-4 col-lg-4 m-2" id="add-libro">
            <Form :initial-values="newLibro" @submit="onSubmit" :validation-schema="mySchema">
                <fieldset>
                    <legend class="bg-dark text-white text-center" v-if="newLibro.id">Editar Libro</legend>
                    <legend class="bg-dark text-white text-center" v-else>Añadir Libro</legend>
                    <div class="form-group">
                        <label for="new-Libro-id">Id:</label>
                        <Field type="text" class="form-control" name="id" disabled></Field>
                        <ErrorMessage name="id"/>
                    </div>
                    <div class="form-group">
                        <label for="new-Libro">Nombre:</label>
                        <Field type="text" class="form-control" name="nombre"></Field>
                        <ErrorMessage name="nombre"/>
                    </div>
                    <div class="form-group">
                        <label for="new-Libro">ISBN:</label>
                        <Field type="number" class="form-control" name="ISBN"></Field>
                        <ErrorMessage name="ISBN"/>
                    </div>
                    <div class="form-group">
                        <label for="newprod-cat">Autor:</label>
                        <Field as="select" class="form-select" name="autor" required>
                            <option value="" disabled>--- Selecciona Autor ---</option>
                            <option
                            v-for="autor in autores"
                            :key="autor.id"
                            :value="autor.id"
                            >
                            {{autor.nombre}}
                            </option>
                        </Field>
                        <ErrorMessage name="autor"/>
                    </div>
                    <div class="form-group">
                        <label for="newprod-cat">Tema:</label>
                        <Field as="select" class="form-select" name="tema" required>
                            <option value="" disabled>--- Selecciona Tema ---</option>
                            <option
                            v-for="tema in temas"
                            :key="tema.id"
                            v-bind:tema="tema"
                            :value="tema.id"
                            >
                            {{tema.nombre}}
                            </option>
                        </Field>
                        <ErrorMessage name="tema"/>
                    </div>
                    <div class="form-group">
                        <label for="newprod-units">Descripción: </label>
                        <Field as="textarea" class="form-control" type="text" name="desc">
                        </Field>
                        <ErrorMessage name="desc"/>
                    </div>
                    <div class="form-group">
                        <label for="newprod-price">Imagen:</label>
                        <Field type="text" name="img" class="form-control"></Field>
                        <ErrorMessage name="img"/>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-default btn-dark">Guardar</button>
                    <button type="reset" class="btn btn-danger" v-if="this.id" @click="$router.push('/editLibro/' + this.id)">Reset</button>
                    <button type="reset" class="btn btn-danger" v-else >Reset</button>
                    <button type="reset" class="btn btn-warning" @click="$router.push('/libros')">Cancelar</button>
                </fieldset>
            </Form>
        </div>
    </div>
</template>

<style>
form div span {
    color: red;
}
</style>