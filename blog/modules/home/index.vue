<template>

<main role="main" >
	 <div class="jumbotron bg-dark">
    <div class="container">
      <div>
        <div class="row">
          <div class="col-md px-0">
            <h1 class="display-4 font-italic"> {{ items[0].title }}</h1>
            <p class="lead my-3"> {{ items[0].descr }} </p>
            <p class="lead mb-0">
              <router-link :to="$store.getters.articleUrl(items[0])" class="text-white font-weight-bold">Continue reading...</router-link></p>
          </div>
          <div class="col-md" 
            style="min-height:250px;background-size:cover;background-position:center" 
            :style="{'background-image':'url('+imageUrl(items[0])+')'}"></div>
        </div>
      </div>
    </div>
    </div>

    <div class="container">

      <div class="row mb-2">
        <div class="col-md-6">
          <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-primary text-capitalize">{{ getCategories(items[1]) }}</strong>
              <h3 class="mb-0">
                <router-link :to="$store.getters.articleUrl(items[1])" class="text-dark" href="#">{{ items[1].title }}</router-link>
              </h3>
              <div class="mb-1 text-muted">{{ new Date(items[1].id).toLocaleDateString() }}</div>
              <p class="card-text mb-auto">{{ items[1].descr }} </p>
              <router-link :to="$store.getters.articleUrl(items[1])" href="#">Continue reading</router-link>
            </div>
            <div class="card-img-right flex-auto d-none d-lg-block" 
              style="width:200px;height:248px;background-size:cover;background-position:center" 
              :style="{'background-image':'url('+imageUrl(items[1])+')' }">
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-success">{{ getCategories(items[2]) }}</strong>
              <h3 class="mb-0">
                <router-link :to="$store.getters.articleUrl(items[2])" class="text-dark" href="#">{{ items[2].title }}</router-link>
              </h3>
              <div class="mb-1 text-muted">{{ new Date(items[2].id).toLocaleDateString() }}</div>
              <p class="card-text mb-auto">{{ items[2].descr }}</p>
            </div>
             <div class="card-img-right flex-auto d-none d-lg-block" 
                style="width:200px;height:248px;background-size:cover;background-position:center" 
                :style="{'background-image':'url('+imageUrl(items[2])+')' }">
             </div>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-md-8 blog-main">
          <h3 class="pb-3 mb-4 font-italic border-bottom">
            Most resent
          </h3>

          <div v-for="item of items.slice(3)" class="blog-post">
            <router-link :to="$store.getters.articleUrl(item)"  class="text-dark">
              <h2 class="blog-post-title"> {{ item.title }}</h2>
            </router-link>
            <p class="blog-post-meta">{{ new Date(item.date).toLocaleDateString("en-US",{year:'numeric',month:'long',day:'numeric'}) }} 
              by <router-link :to="'/Search/'+item.author">{{ item.author }}</router-link></p>
            {{ item.descr }}
            <hr>
          </div><!-- /.blog-post -->

          

          <nav class="blog-pagination">
            <!--<a class="btn btn-outline-primary" href="#">Older</a> -->
            <!-- <a class="btn btn-outline-secondary disabled" href="#">Newer</a> -->
          </nav>

        </div><!-- /.blog-main -->

        <aside class="col-md-4 blog-sidebar">
          <!--
          <div class="p-3 mb-3 bg-light rounded">
            <h4 class="font-italic">About</h4>
            <p class="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
          </div>
        -->

          <div class="p-3">
            <archives-nav></archives-nav>
          </div>

          <div class="p-3">
            <follow-nav></follow-nav>
          </div>
        </aside><!-- /.blog-sidebar -->

      </div><!-- /.row -->
    </div> <!-- .container -->
</main>
</template>

<script>
module.exports = {
  data(){return {
  }},
  
  computed:{
    items(){ return this.$store.getters.homeItems }
  },
  
  methods:{
    imageUrl(item){
      return this.$store.getters.imageUrl(item)
    },
    getCategories(item){
      let cats = this.$store.getters.itemCategories(item)
      return cats.map(r=>r.title).join(", ")
    }
  } /**/
}
</script>