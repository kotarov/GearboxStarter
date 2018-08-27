<template>
  <div class="card mb-4 box-shadow">
    <div class="card-img-top" :style="'background-image:url(\''+imageUrl()+'\')'" alt="Card image cap"></div>
    <div class="card-body">
      <p class="card-text">{{ item.descr }}</p>
      <div class="d-flex flex-wrap justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary">Quick view</button>
          <button @click="addToCart()" type="button" class="btn btn-sm btn-outline-secondary">Add to cart</button>
        </div>
        <small class="text-muted">9 avaible</small>
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
  }
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
