<template><div class="container py-5">
  <div class="row">
    <div class="col-md-5 row">
      <a data-toggle="lightbox" data-gallery="product" :href="imageUrl" >
        <img class="align-self-start mr-3 col-12 img-fluid img-thumbnail" :src="imageUrl" alt="Generic placeholder image">
      </a>
      <div class="col-12 row py-3">
          <div v-for="file of product.files" class="col-sm-4 col-md-3">
            <a data-toggle="lightbox" data-gallery="product" :href="'../store/products/'+product.id+'/files/'+encodeURIComponent(file.name)" >
              <img v-if="file.type.substring(0,5)=='image'" :src="'../store/products/'+product.id+'/files/'+encodeURIComponent(file.name)" class="img-fluid img-thumbnail">
            </a>
          <!--
            <video v-if="file.type.substring(0,5)=='video'" :src="'../store/products/'+product.id+'/files/'+encodeURIComponent(file.name)" width="100%" height="100%" controls></video>
          -->
          </div>
      </div>
    </div>
    <div class="media-body offset-md-1 col-md-6">
      <h5 class="mt-0 h1">{{ $store.getters.translateField("name",product) }}</h5>
      <div>{{ $store.getters.translateField("title",product) }}</div>


      <br>
      <div v-if="product.packs && product.packs.length > 0" class="p-3 bg-light row">
        <div class="h4 col-12">{{ $t('This product contains') }}</div>
        <hr class="col-11">
        <div v-for="pack of product.packs" class="col-md-3 col-sm-4">
              <!--<thumb-item :item="pack.data"></thumb-item>-->
          <router-link :to="'/Product/'+pack.data.id+'---'+pack.data.name">
            <img class="img-fluid" :src="'../store/products/'+pack.data.id+'/'+pack.data.image" class="img-fluid img-thumbnail">
            <div class="text-center"><strong>{{ pack.data.name }}</strong></div>
            <div class="text-center">x <strong>{{ pack.qty }}</strong></div>
          </router-link>

        </div>
      </div>
      <br>
      <div>{{ $store.getters.translateField("descr",product) }}</div>
      <hr>
      <div class="py-3">
        <span class="h2">{{ $store.getters.price(product.price) }}</span>
        <button class="btn btn-lg btn-primary float-right" @click="addToCart()"
          data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader">{{ $t('Add to cart') }}</button>
        <!-- <span class="float-right m-0">{{ $t('Avaible') }}: {{ product.qty }}</span> -->
      </div>

      <hr class="my-3">
    </div>
  </div>

  <div v-if="containers.length > 0" class="row bg-light my-5 p-3">
    <h3 class="col-12">{{ $t('This product is part of') }}:</h3>

    <div class="col-12 row my-3">
        <div v-for="parentPack of containers" class="col-3">
          <thumb-item :item="parentPack"></thumb-item>
        </div>
    </div>
  </div>

</div></template>

<script>
module.exports = {
  data(){return {
    //id:0,
    product: {},
    containers: []
  }},
  watch:{
    $route(){ this.fetch() }
  },
  computed:{
    imageUrl(){
        return this.product.image ? "../store/products/"+this.product.id+"/"+this.product.image : "../assets/img/NoImage.jpg"
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch(){
      let id = this.$route.params.id
      this.product = this.$store.getters.product(id)
      this.containers = this.$store.getters.productContainers(this.product)
    },
    addToCart(){
      this.$store.dispatch("addProductToCart", {item:this.product,qty:1})
    }
  },
  i18n:{messages:{
    bg:{
      'This product contains':'Този продукт съдържа',
      'This product is part of':'Този продукт е част от'
    }
  }}
}
</script>
