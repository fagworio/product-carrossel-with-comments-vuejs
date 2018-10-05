<template>
<div>
  <nav-menu></nav-menu>
  <br/>
  <span v-show="loading" class="spinner"></span>
   <div class="container">
  <nav class="mb-3">
  <ol class="breadcrumb">
      <li class="breadcrumb-item"><router-link to="/">Inicio</router-link></li>
      <li class="breadcrumb-item"><a href="#">Lojas</a></li>
  </ol> 
  </nav>
    <div class="row">
      <div class="col-xl-12 col-md-11 col-sm-12">
      <h3>Conheça as nossas lojas</h3>
            <br />
            <ul>
              <li v-for="store in stores">
                <p>{{ store.store }}, {{ store.address }}</p>
              </li>
            </ul>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'ListStores',

  data () {
    return {
      stores: {},
      loading: true
    }
  },
  created () {
      this.loading = true;
      this.getAdressStore()
      this.loading = false;
  },

  methods: {
    getAdressStore() {
        this.$http.get('https://plausible-nitrogen.glitch.me/addresses').then((response) => {
          // success callback
          this.stores = response.data;
      }, (response) => {
          // error callback
          console.error(response);
      });
    },
  }
}
</script>

<style lang="scss" scoped>

  
</style>
