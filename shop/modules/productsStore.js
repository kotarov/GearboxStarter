const productsStore = {
	state: {
		items:[],
		categories:[]
	},
	getters:{
		products(state)				{ return state.items },
		product(state) {
			return function(id){return state.items.find((e)=>e.id==id)}
		},
		homeProducts(state)			{ return state.items.sort((a,b)=>{
			return Date.parse(b.date) - Date.parse(a.date)
		} ).slice(0,6) },
		allProductCategories(state){ return state.categories },
		//mainMenuCategories(state)	{return state.categories.filter( value => true ) },
/*
		categoryFromId(state){
			return function(idCategory){
				let cat = state.categories.filter( v => {
					if(v.id == idCategory ) return true
				})
				return cat ? cat[0] : {}
			}
		},
*/
/*
		itemCategories(state){ return function(item){
				let retCats = []
				let ids = (item.categories || '').split(",")
				for(let i of state.categories) {
					if(ids.indexOf(i.id)>-1) retCats.push(i)
				}
				return retCats
		}},
*/
		imageUrl(state){ return function(item){
				return '../store/products/'+item.id+'/'+item.image
		}},
		articleUrl(state){ return function(item){
				return "/"+item.date+"/"+ item.title.replace(/\ /g,"_")
		}},
		productContainers(state,getters){ return function(item){
			let ret = []
			//console.log( getters.products )
			for(let p of getters.products){
					if(p.packs && p.packs.length > 0){
						let exists = p.packs.filter(i=>i.id == item.id)
						if(exists.length > 0) ret.push(p)
					}
			}
			return ret
		}}
	},
/************/

	actions:{
		init({state, dispatch, commit}){
			dispatch("fetchProducts")
			dispatch("fetchProductCategories")
		},
		fetchProducts({state, dispatch, commit}){
			let url = "../store/products.json"
			fetch(url).then(ret=>ret.json())
			.then(ret=>{ state.items = ret })
		},

		fetchProductCategories({state,dispatch,commit}){
			let url = "../store/productsCategories.json"
			fetch(url).then(ret=>ret.json())
			.then(ret=>{state.categories=ret})
		},

		/*
		fetchContent({state,dispatch,commit},article){
			let url = "../store/articles/"+article.id+"/content.html"
			return fetch(url).then(ret=>{
				console.log
			})
		}*/
	}
}
