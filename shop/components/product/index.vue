<template><div class="container py-5">
  <div class="row">
    <div class="col-md-6 row">
      <a data-toggle="lightbox" data-gallery="product" :href="imageUrl" >
        <img class="align-self-start mr-3 col-12" :src="imageUrl" alt="Generic placeholder image">
      </a>
      <div class="col-12 row py-3">
          <div v-for="file of product.files" class="col-4">
            <a data-toggle="lightbox" data-gallery="product" :href="'../store/products/'+product.id+'/files/'+encodeURIComponent(file.name)" >
              <img v-if="file.type.substring(0,5)=='image'" :src="'../store/products/'+product.id+'/files/'+encodeURIComponent(file.name)" class="img-fluid">
            </a>
          <!--
            <video v-if="file.type.substring(0,5)=='video'" :src="'../store/products/'+product.id+'/files/'+encodeURIComponent(file.name)" width="100%" height="100%" controls></video>
          -->
          </div>
      </div>
    </div>
    <div class="media-body col-md-6">
      <h5 class="mt-0 h1">{{ $store.getters.translateField("name",product) }}</h5>
      <div>{{ $store.getters.translateField("title",product) }}</div>
      <hr>
      <div>{{ $store.getters.translateField("descr",product) }}</div>
      <div class="py-3">
        <span class="h2">{{ $store.getters.price(product.price) }}</span>
        <span class="float-right m-0">{{ $t('Avaible') }}: {{ product.qty }}</span>
      </div>


      <hr class="my-3">
      <br>
      <div>
        <button class="btn btn-lg btn-primary" @click="addToCart()"
          data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader">{{ $t('Add to cart') }}</button>
      </div>
    </div>
  </div>

</div></template>

<script>
module.exports = {
  data(){return {
    //id:0,
    product: {}
  }},
  computed:{
    imageUrl(){
        return this.product.image ? "../store/products/"+this.product.id+"/"+this.product.image : "../assets/img/NoImage.jpg"
    }
  },
  created(){
    let id = this.$route.params.id
    this.product = this.$store.getters.product(id)
    console.log( this.$store.getters.translateField("name",this.product) )
    //alert( this.$i18n.ttt("dddd") )
  },
  methods:{
    addToCart(){
      this.$store.dispatch("addProductToCart", {item:this.product,qty:1})
    }
  },
}
</script>
