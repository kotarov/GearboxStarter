<template>
	<div>
	<div class="jumbotron bg-dark">
		<div class="container">
	    	<div class="display-4">{{ category.title }}</div>
	    	<p class="font-italic">{{ category.descr }} </p>
	    </div>
    </div>
	
	<div class="container">
	<div class="row">
        <div class="col-md-9 blog-main">
          

          <div v-for="item of items" class="blog-post">
            <router-link :to="$store.getters.articleUrl(item)"  class="text-dark">
              <h2 class="blog-post-title"> {{ item.title }}</h2>
            </router-link>
            <p class="blog-post-meta">{{ new Date(item.date).toLocaleDateString("en-US",{year:'numeric',month:'long',day:'numeric'}) }} 
              by <router-link :to="'/Search/'+item.author">{{ item.author }}</router-link></p>
            {{ item.descr }}
            <hr>
          </div><!-- /.blog-post -->

          <div v-if="items.length == 0">
          	<h2>No items</h2>
          </div>

          

          <nav class="blog-pagination">
            <!--<a class="btn btn-outline-primary" href="#">Older</a>-->
            <!-- <a class="btn btn-outline-secondary disabled" href="#">Newer</a> -->
          </nav>

        </div><!-- /.blog-main -->

        <aside class="col-md-3 blog-sidebar">
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

     </div> <!-- ./container -->
</div></template>

<script>
module.exports = {
	data(){ return {
		items:[]
	}},
	computed:{
		category(){ return this.$store.getters.categoryFromId( this.$route.params.category ) },
	},
	watch:{
		$route(){ this.fetchItems() }
	},
	created(){
		this.fetchItems()
	},
	methods:{
		fetchItems(){
			this.items = this.$store.getters.items.filter( v => {
				if( v.categories.indexOf( this.category.id ) !== -1 ) return true
			})
		}
	}
}
</script>