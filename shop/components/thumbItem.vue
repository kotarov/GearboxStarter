<template>
  <div class="card mb-4 box-shadow">
    <router-link :to="'/Product/'+item.id+'---'+item.name.replace(/\ /g,'-')">
      <div class="card-img-top" :style="'background-image:url(\''+imageUrl()+'\')'" alt="Card image cap"></div>
    </router-link>
    <div class="card-body">
      <p><strong>{{ $store.getters.translateField("name",item) }}</strong></p>
      <div class="card-text">{{ $store.getters.translateField("title",item) }}</div>
      <div class="d-flex flex-wrap justify-content-between align-items-center">
        <div class="btn-group">
          <!--<button type="button" class="btn btn-sm btn-outline-secondary">Quick view</button>-->
          <button @click="addToCart()" type="button" class="btn btn-outline-secondary"
            data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader"
          >{{ $t('Add to cart') }}</button>
        </div>
        <big class="h3">{{ $store.getters.formatCurrency(item.price) }}</big>
        <!--
        <small class="text-muted">{{ item.qty }} {{ $t('avaible') }}</small>
      -->
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props:["item"],
  methods:{
    imageUrl(){
      return this.item.image ? "../store/products/"+this.item.id+"/"+this.item.image : "../assets/img/NoImage.jpg"
    },
    addToCart(){
      this.$store.dispatch("addProductToCart", {item:this.item,qty:1})
    }
  },
  i18n:{messages:{
    bg:{
      'avaible':"налични"
    }
  }}
}
</script>

<style scoped>
  .card-img-top{
    height: 225px;
    width: 100%;
    display: block;
    background-position: center;
    background-size:cover;
  }
  .card-text {
    min-height: 50px;
  }
</style>
