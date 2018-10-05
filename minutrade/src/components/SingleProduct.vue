<template>
<div>
  <nav-menu></nav-menu>
  <br/>
   <div class="container">
  <nav class="mb-3">
  <ol class="breadcrumb">
      <li class="breadcrumb-item"><router-link to="/">Inicio</router-link></li>
      <li class="breadcrumb-item"><a href="#">Produto</a></li>
  </ol> 
  </nav>

  <div class="row">
  <div class="col-xl-12 col-md-11 col-sm-12">
  <main class="card">
    <div class="row no-gutters">
      <aside class="col-sm-6 border-right">
  <article class="gallery-wrap"> 
  <div class="img-big-wrap">
    <div><img :src="data.image_url"></div>
  </div> <!-- slider-product.// -->
  </article> <!-- gallery-wrap .end// -->
      </aside>
      <aside class="col-sm-6">
  <article class="card-body">
  <!-- short-info-wrap -->
    <h3 class="title mb-3">{{ data.name }}</h3>
   
  <div class="mb-3"> 
    <var class="price h3 text-warning"> 
      <span class="currency">R$ </span><span class="num">{{ data.price }}</span>
    </var> 
  </div> <!-- price-detail-wrap .// -->

  <dl>
    <dt>Descrição</dt>
    <dd><p> {{ data.short_description }}</p></dd>
  </dl>
  <div class="rating-wrap">
    <h4>Avaliações</h4>
  <star-rating v-model="data.rating" :star-size="40" @rating-selected="setRatingItem(data.rating)"></star-rating>
  </div> <!-- rating-wrap.// -->

    <hr>
    <div class="ct">
      <a  data-toggle="collapse" href="#collapseList" role="button" aria-expanded="false" aria-controls="collapseList" class="btn  btn-warning"> Exibir Lojas </a>
      <a href="#comment" class="btn  btn-outline-primary">Deixar Comentário</a>
    </div>
  <!-- short-info-wrap .// -->
  </article> <!-- card-body.// -->
      </aside> <!-- col.// -->
    </div> <!-- row.// -->
  </main> <!-- card.// -->
  <br/>
  <div class="row">
    <div class="col">
      <div class="collapse multi-collapse" id="collapseList">
        <div class="card card-body">
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
  <!-- PRODUCT DETAIL -->
  <article class="card mt-3">
    <div class="card-body">
      <h4>Detalhes do produto</h4>
    <p>{{ data.description }}</p>
    </div> <!-- card-body.// -->
  </article> <!-- card.// -->

  <!-- PRODUCT DETAIL .// -->
  <hr>
 <div class="brand">

        <div class="great-question">
          <h3>{{ question }}<span>?</span></h3>
          
        </div>

        <div class="comment-list">
        <span v-show="loading" class="spinner"></span>
          <div>
              <comment v-for="comment in comments" :comment="comment"></comment>
          </div>
        </div>

        <comment-form v-on:commented="updateComment"></comment-form>
    </div>
  </div> <!-- col // -->
  </div> <!-- row.// -->

  </div>
</div>
</template>

<script>
import StarRating from 'vue-star-rating'
import Comment from './Comment.vue'
import CommentForm from './CommentForm.vue'
export default {
  name: 'SingleProduct',
  components: {
    StarRating,
    Comment,
    CommentForm
  },
  data () {
    return {
      question: 'O que você acha de nossos produtos',
      comments: [],
      data: {},
      stores: {},
      loading: false
    }
  },
  created () {
      this.loading = true;
      this.$emit('product_info', this.getProduct());
      this.$emit('product_info', this.getAdressStore());
      // Fetch the comments 
      this.$http.get('http://localhost:3000/api/Comments').then((response) => {
          // success callback
          this.comments = response.data;
          this.loading = false;
      }, (response) => {
          // error callback
          console.error(response);
          this.loading = false;
      });
  },

  methods: {
      updateComment (comment) {
        this.comments.push(comment);
      },
      getAdressStore() {
          this.$http.get('https://plausible-nitrogen.glitch.me/addresses').then((response) => {
            // success callback
            this.stores = response.data;
        }, (response) => {
            // error callback
            console.error(response);
        });
      },
       setRatingItem(rating){
         let product = JSON.parse(localStorage.getItem('product'));
         this.$http.patch(`http://localhost:3000/api/Products/${product.id}`, {
           "rating": rating
        });
       },
      getProduct() {
        // Fetch the comments
        let product = JSON.parse(localStorage.getItem('product'));
        this.$http.get(`http://localhost:3000/api/Products/${product.id}`).then((response) => {
            // success callback
            this.data = response.data;
            console.log(this.data);
            this.loading = false;
        }, (response) => {
            // error callback
            console.error(response);
            this.loading = false;
        });
      }
    }

}
</script>

<style lang="scss" scoped>
  .ct {
    padding: 2.5vw 0 0 0;
  }
  .img-big-wrap{
    width: 100%;
    height: auto;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  
</style>
