const blogStore = {
	state: {
		items:[],
		categories:[]
	},
	getters:{
		items(state)				{ return state.items },
		homeItems(state)			{ return state.items.sort((a,b)=>{ 
			return Date.parse(b.date) - Date.parse(a.date)
		} ).slice(0,6) },
		mainMenuCategories(state)	{return state.categories.filter( value => true ) },
		
		categoryFromId(state){
			return function(idCategory){
				let cat = state.categories.filter( v => {
					if(v.id == idCategory ) return true
				})
				return cat ? cat[0] : {} 
			}
		},

		itemCategories(state){
			return function(item){
				let retCats = []
				let ids = (item.categories || '').split(",")
				for(let i of state.categories) {
					if(ids.indexOf(i.id)>-1) retCats.push(i)
				}
				return retCats
			}
		},

		imageUrl(state){
			return function(item){
				return '../store/articles/'+item.id+'/'+item.image
			}
		},
		articleUrl(state){
			return function(item){
				return "/"+item.date+"/"+ item.title.replace(/\ /g,"_")
			}
		},

		existingDates(state){
			let items = []
	        for(let i of state.items ){
	          let d = new Date(i.date)
	          let dd = d.getFullYear()+"/"+(d.getMonth()+1)
	          if(items.indexOf(dd) == -1) items.push(dd)
	        }
	    	return items.sort().reverse()
		}
	},
	actions:{
		init({state, dispatch, commit}){
			dispatch("fetchArticles")
			dispatch("fetchCategories")
		},
		fetchArticles({state, dispatch, commit}){
			let url = "../store/articles.json" 
			fetch(url).then(ret=>ret.json())
			.then(ret=>{ state.items = ret })
		},
		fetchCategories({state,dispatch,commit}){
			let url = "../store/articlesCategories.json"
			fetch(url).then(ret=>ret.json())
			.then(ret=>{state.categories=ret})
		},
		fetchContent({state,dispatch,commit},article){
			let url = "../store/articles/"+article.id+"/content.html"
			return fetch(url).then(ret=>{
				console.log
			})
		}
	}
}