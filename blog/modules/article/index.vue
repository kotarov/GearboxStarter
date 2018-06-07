<template><div class="container">
  <div class="row">
	<div class="col-md-9 blog-main">
		<div v-if="notExists" class="text-center"> 
			<br><br><br>
			<h1>This article not exists </h1>
			<br>
		</div>
		<div v-else>
			<h1> {{ article.title }}</h1>
			<p>
				<i>Date: <b>{{ new Date(article.date).toLocaleDateString("en-US",{year:'numeric',month:'long',day:'numeric'}) }}</b> </i>  <br>
				<i>By: <a href="#">{{ article.author }}</a> </i>
			</p>
			<div v-if="article.image" style="background-size:cover;width:100%;height:400px;background-position:center" 
				:style="{'background-image':'url('+$store.getters.imageUrl(article)+')'}"></div>
			<!-- <img :src="$store.getters.imageUrl(article)" style="width:100%"> -->
			<p class="p-3 bg-light"><i> {{ article.descr }} </i></p>
			<hr>
			<p v-html="content"></p>
		</div>
	</div> <!-- /.main -->
	
	<aside class="col-md-3 blog-sidebar">
          <!--
          <div class="p-3 mb-3 bg-light rounded">
            <h4 class="font-italic">About</h4>
            <p class="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
          </div>
			-->
			<br><br>	
          <div class="p-3">
            <archives-nav></archives-nav>
          </div>

          <div class="p-3">
            <follow-nav></follow-nav>
          </div>
    </aside><!-- /.blog-sidebar -->
  </div> <!-- /.row -->
</div></template>

<script>
module.exports = {
	data(){return{
		notExists: false,
		article: { title:"", date:"", descr:"", author:"" },
		content: ""
	}},
	beforeRouteEnter(to,from,next){ 
		window.scroll(0,0)
		next() 
	},
	beforeRouteUpdate(to,from,next){
		window.scroll(0,0)
		this.fetchArticle( to.params )
		next()		
	},
	created(){
		this.fetchArticle()
	},

	methods:{
		fetchArticle( params ){
			if(!params) params = this.$route.params
			
			let date = params.date //params.year + "-" + params.month + "-" + params.day
			let title = params.title.replace(/\_/g," ")

			let article = this.$store.getters.items.filter( (item) => item.date == date && item.title == title )
			if( article.length == 0 ){
				this.notExists = true
			} else {
				this.notExists = false
				this.article = article[0]
				fetch("../store/articles/"+this.article.id+"/content.html").then(ret=>ret.text())
				.then(ret=>{ this.content = ret })
			}

		}
	}
}
</script>