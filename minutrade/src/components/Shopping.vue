<template>
  <div>
    <nav-menu></nav-menu>
      <br/>
    <carousel></carousel>
  </div>
</template>

<script>
import ProductsCarosel from './ProductsCarosel'
export default {
  name: 'Shopping',
  components: {
            carousel:  ProductsCarosel,
        },

}
</script>

<style>

.spinner {
    position: absolute;
    left: 50%;
    top: 50px;
    width: 20px;
    height: 20px;
    background-color: #47b784;
    display: block;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
  }
  @-webkit-keyframes sk-rotateplane {
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
  }
  @keyframes sk-rotateplane {
    0% { 
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      background-color: #47b784;
    } 50% { 
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      background-color: #36495d;
    } 100% { 
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      background-color: #47b784;
    }
  }
.vue-star-rating{
  margin: 0 auto;
}
</style>
