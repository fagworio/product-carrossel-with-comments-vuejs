<template>

  <div>  
    <div class="card-carousel-wrapper">
    <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
    <div class="card-carousel">
      <div class="card-carousel--overflow-container">
        
        <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
          
          <div class="card-carousel--card"  v-for="item in items" :key="item.id" @click="setProductItem(item), setRatingItem(item)">
            <router-link to="/single-product">
                <img class="product-image" :src="item.image_url"/>
            </router-link>
            <star-rating v-model="item.rating" :star-size="28"></star-rating>
              <router-link to="/single-product">
                <div class="card-carousel--card--footer">
                  <p>{{ item.name }}</p>
                  <p>{{ item.tag }}</p>                  
                  <h3>R$: {{ item.price }}</h3>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
  </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'ProductsCarosel',
  components: {
    StarRating
  },
    data() {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
      items: {},
    }
  },
  computed: {
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    getProducts() {
      this.$http.get('http://localhost:3000/api/Products').then((response) => {
          // success callback
          this.items = response.data;
      }, (response) => {
          // error callback
          console.error(response);
      });
    },
    setProductItem(item) {
      // console.log(item);
      let product = { 
        "id": item.id, 
        "rating": item.rating
        };
      localStorage.setItem('product', JSON.stringify(product));
      this.$emit('product_info');
    },
    setRatingItem(item){
        this.$http.patch(`http://localhost:3000/api/Products/${item.id}`, {
           "rating": item.rating
        });
    }
  },  
  created () {
    this.getProducts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $vue-navy: #2c3e50;
  $vue-navy-light: #3a5169;
  $vue-teal: #42b883;
  $vue-teal-light: #42b983;
  $gray: #666a73;
  $light-gray: #f8f8f8;

body {
  background: $light-gray;
  color: $vue-navy;
  font-family: 'Source Sans Pro', sans-serif;
  min-height: 1000px; 
}
img.product-image {
  width: 200px;
  height: 200px;

}
.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: $gray;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 640px;
  
  &--overflow-container {
    overflow: hidden;
  }
  
  &--nav__left,
  &--nav__right {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-top: 2px solid $vue-teal;
    border-right: 2px solid $vue-teal;
    cursor: pointer;
    margin: 0 10px;
    transition: transform 150ms linear;
    &[disabled] {
      opacity: 0.2;
      border-color: black;
    }
  }
  
  &--nav__left {
    transform: rotate(-135deg);
    &:active {
      transform: rotate(-135deg) scale(0.9);
    }
  }
  
  &--nav__right {
    transform: rotate(45deg);
    &:active {
      transform: rotate(45deg) scale(0.9);
    }
  }
}

.card-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);
 
  .card-carousel--card {
    margin: 0 10px;
    cursor: pointer;
    box-shadow: 0 4px 15px 0 rgba(40,44,53,.06), 0 2px 2px 0 rgba(40,44,53,.08);
    background-color: #fff;
    border-radius: 4px;
    z-index: 3;
    margin-bottom: 2px;
    
    &:first-child {
      margin-left: 0;
    }
    
    &:last-child {
      margin-right: 0;
    }
    
    img {
      vertical-align: bottom;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      transition: opacity 150ms linear;
      
      &:hover {
        opacity: 0.5;
      }
    }
    
    &--footer {
      border-top: 0;
      padding: 7px 15px;
      
      p {
        padding: 3px 0;
        margin: 0;
        margin-bottom: 2px;
        font-size: 14px;
        font-weight: 400;
        color: $vue-navy;
    
      }
    }
  }
}

h1 {
  font-size: 3.6em;
  font-weight: 100;
  text-align: center;
  margin-bottom: 0;
  color: $vue-teal;
}
</style>

