<template>
<ul class="container-profile">
	<li transition="slide">
      <div class="profile"><img :src="avatar" alt=""></div>
      <div class="msg">
        <div class="msg-body">
          <p class="name"><b>Nome:</b> {{ comment.name }} <span class="date">{{ comment.time }}</span></p>
          <p class="message" v-html="comment.comment"></p>
        </div>
      </div>
    </li>
  </ul>

</template>

<script>
export default {
	props: ['comment'],
	computed: {
		avatar: function () {
			return 'https://api.adorable.io/avatars/48/' + this.comment.name.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-')  + '@adorable.io.png'
		}
	}
}
</script>

<style scoped>
  .container-profile {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .msg {
    background: #f8f9fa;
    border-bottom: 1px dotted #ccc;
    margin-top: 10px;
    padding: 10px;
  }
  p.name {
      margin: 0;
      padding: 0;
  }
  p.message {
    font-size: 14px;
  }
  .profile {
    padding: 10px;
    float: left;
  }
  .profile img{
    border-radius: 50%;
  }
</style>
