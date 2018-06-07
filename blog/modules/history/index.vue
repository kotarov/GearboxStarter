<template><div>
	<div class="jumbotron bg-light">
		<div class="container">
	    	<div class="display-4">{{ dateString }}</div>
	    	<div class="font-italic">Archive history</div>
	    </div>
    </div>

	<div class="container">
		<div class="row">
        <div class="col-md-9 blog-main">
          

          <div v-for="item of items" class="blog-post">
            <router-link :to="$store.getters.articleUrl(item)"  class="text-dark">
              <h2 class="blog-post-title"> {{ item.title }}</h2>
            </router-link>
            <p class="blog-post-meta">{{ new Date(item.date).toLocaleDateString("en-US",{year:'numeric',month:'long',day:'numeric'}) }} by <a href="#">{{ item.author }}</a></p>
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

	</div> <!-- /.container -->
</div></template>

<script>
module.exports = {
	data(){return{
		items:[],
		//dateParams:{year:"numeric"},
	}},
	computed:{
		dateString(){ 
			let p = this.$route.params 
			
			let dateParams = { year:"numeric" }
			if(p.month) dateParams.month = "long"
			if(p.day) dateParams.day = "numeric"

			let date =p.year + (p.month ? "/" + p.month : "" ) + (p.day ? "/"+p.day:"")
			
			return new Date(date).toLocaleDateString("en-US", dateParams)
		}
	},
	watch:{
		dateString(){ this.fetchItems() }
	},
	created(){
		this.fetchItems()
	},
	methods:{
		fetchItems() {
			this.items = this.$store.getters.items.filter( v=>{
				let iDate = new Date(v.date) 
				let year = this.$route.params.year
		
				if( year && year == iDate.getFullYear() ){
					let month = this.$route.params.month 
					if(!month) return true
					if( month && month == iDate.getMonth()+1 ){
						let day = this.$route.params.day
						if(!day) return true
						if( day && day == iDate.getDate()){
							return true
						}
					}
				}
			})
		}

	}
}
</script>