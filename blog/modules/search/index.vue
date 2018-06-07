<template>
	<div>
	<div class="jumbotron bg-light">
		<div class="container">
			<div class="row">
				<div class="col-sm-1 col-lg-2"></div>
				<div class="col-sm-10 col-lg-8">
			    	<div class="input-group"> 
			    		<div class="input-group-prepend"><div class="input-group-text">
			    			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-3"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>
			    		</div></div>
			    		<input type="search" v-model="search" class="form-control" :placeholder="'To begin the search, type more then '+searchMinLen+' letters...'"> 
			    	</div>
		    	</div>
		    </div><!-- /.row -->
	    </div>
    </div>
	
	<div class="container">
	<div class="row">
        <div class="col-md-9 blog-main">
          

          <div v-for="item of items" class="blog-post">
            <router-link :to="$store.getters.articleUrl(item)"  class="text-dark">
              <h2 class="blog-post-title"> <span v-html="highlight(item.title)"></span></h2>
            </router-link>
            <p class="blog-post-meta">{{ new Date(item.date).toLocaleDateString("en-US",{year:'numeric',month:'long',day:'numeric'}) }} 
            	by <router-link :to="'/Search/'+item.author" ><span v-html="highlight(item.author)"></span></router-link></p>
            <span v-html="highlight(item.descr,search)"></span>
            <hr>
          </div><!-- /.blog-post -->

          <div v-if="items.length == 0">
          	<h2 v-if="search.length >= searchMinLen">No posts found</h2>
          	<p v-else><i>Minimum search lenght is <b>{{ searchMinLen }}</b> letters</i></p>
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
		items:[],
		search: "",
		searchMinLen: 2
	}},
	watch:{
		$route(){ 
			if(!this.$route.params.term) localStorage.setItem("searchString","")
			this.fetchTerm(); 
			this.fetchItems() 
		},
		search(value){ 
			localStorage.setItem("searchString",value)
			this.fetchItems()
		}
	},
	created(){
		this.fetchTerm()
		this.fetchItems()
	},
	methods:{
		fetchTerm(){
			if( this.$route.params.term ){
				this.search = this.$route.params.term
			} else {
				this.search = localStorage.getItem("searchString")||""
			}
		},
		fetchItems(){
			if(this.search.length >= this.searchMinLen ) {
				let toSearch = this.search.toLowerCase()
				this.items = this.$store.getters.items.filter( v => {
					if( v.title.indexOf( toSearch ) !== -1 
						|| v.descr.toLowerCase().indexOf( toSearch ) !== -1
						|| v.author.toLowerCase().indexOf( toSearch )!== -1
						|| v.categories.toLowerCase().indexOf( toSearch )!== -1
					) return true
				})
			} else {
				this.items = []
			}
			
		},
		highlight(text,query){
			if(!query) query = this.search
			var check = new RegExp(query, "ig");
	        return text.toString().replace(check, function(matchedText,a,b){
	              return ('<span class="highlight">' + matchedText + '</span>');
	        });
		}
	}
}
</script>
<style>
.highlight {
  background: yellow;
}
</style>