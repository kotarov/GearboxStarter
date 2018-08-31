md5=function(){for(var m=[],l=0;64>l;)m[l]=0|4294967296*Math.abs(Math.sin(++l));return function(c){var e,g,f,a,h=[];c=unescape(encodeURI(c));for(var b=c.length,k=[e=1732584193,g=-271733879,~e,~g],d=0;d<=b;)h[d>>2]|=(c.charCodeAt(d)||128)<<8*(d++%4);h[c=16*(b+8>>6)+14]=8*b;for(d=0;d<c;d+=16){b=k;for(a=0;64>a;)b=[f=b[3],(e=b[1]|0)+((f=b[0]+[e&(g=b[2])|~e&f,f&e|~f&g,e^g^f,g^(e|~f)][b=a>>4]+(m[a]+(h[[a,5*a+1,3*a+5,7*a][b]%16+d]|0)))<<(b=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*b+a++%4])|f>>>32-b),e,g];for(a=4;a;)k[--a]=k[a]+b[a]}for(c="";32>a;)c+=(k[a>>3]>>4*(1^a++&7)&15).toString(16);return c}}();


const StoreService = {
	actions:{
		/** Collections **/
		getCollection({state, dispatch, commit},{collectionPath,criteria}){
			progress.start()
			let url = collectionPath+".json"
			return fetch( url )
					.then( ret=> ret.json() )
					.then( ret=>{ progress.stop(); return ret } )
					.catch( error=>{ progress.stop();alert(error) } )
		},

		postUpdateItem({state, dispatch, commit},{collection,items,item,id,data}){
			if(!id) id = item && item.id ? item.id : data.id
			if(!collection || !item || !data || !id) return

			progress.start()
			let url = "api/postUpdateItem.php?collection="+encodeURIComponent(collection)+"&id="+encodeURIComponent(id)
			let fData = new FormData(); for(let key of Object.keys(data)) fData.append(key,typeof data[key]=='object'?JSON.stringify(data[key]):data[key])

			return fetch( url, { method:"post", body: fData } )
					.then( ret=>ret.json() )
					.then( ret=>{ progress.stop();  if(ret.ok) item = Object.assign(item, data);return ret })
					.catch( error=>{ progress.stop(); alert(error) } )
		},
		postInsertItem({state, dispatch, commit},{collection,items,data}){
			if(!collection || !data) return

			progress.start()
			let url = "api/postInsertItem.php?collection="+encodeURIComponent(collection)
			let fData = new FormData(); for(let key of Object.keys(data)) fData.append(key,data[key])
			return fetch( url, { method:"post", body: fData } )
					.then( ret=>ret.json() )
					.then( ret=>{ progress.stop(); if(ret.ok && ret.id) items.push( Object.assign(data,{id:ret.id}) );return ret })
					.catch( error=>{ progress.stop(); alert(error) })
		},
		/** If isset items, item will be removed */
		removeItem({state},{collection,items,item,id}){
			if(!id && item) id = item.id
			if(!collection || !id) return

			progress.start()
			let url = "api/removeItem.php?collection="+collection+"&id="+encodeURIComponent(id)
			return fetch( url )
					.then( ret=>ret.json() )
					.then( ret=>{
						progress.stop()
						if(items){
							if(!item) for(var i=0; i<items.length; i++){
								if(item.id == id) item = items[i]
							}
							if(item) items.splice(items.indexOf(item), 1)
						}
						return ret
					})
					.catch( error => { progress.stop(); alert(error) } )
		},


		/** Files */
		postFile({state,dispatch, commit},{path,name,data}){
			progress.start()
			let url = "api/postFile.php"
			let fData = new FormData();
			let type = "text/html"
			if( typeof data == 'object' ){
				type = data.type
			}
			let blob = new Blob([data],{type:"text/html"})

			// fData.append("path", path)
			// fData.append("name", name)
			fData.append(path, blob, name)

			return fetch( url, { method:"post", body: fData } )
				.then( ret=>ret.json() )
				.then( ret=>{ progress.stop(); return ret })
				.catch( error => { progress.stop();alert(error)} )

		},
		moveFile({state,dispatch,commit},{from,to}){
			progress.start()
			let url = "api/moveFile.php?from="+encodeURIComponent(from)+"&to="+encodeURIComponent(to)
			return fetch( url )
				.then( ret=>ret.json() )
				.then( ret=>{ progress.stop(); return ret })
				.catch( ret=>{progress.stop();alert(error) } )
		},
		removeFile({state,dispatch,commit},{directory,file}){
			if(!directory || !file) return console.error("dispatch('removeFile'): Define directory and file, please !")

			progress.start()
			let url= "api/removeFile.php?directory="+encodeURIComponent(directory)+"&file="+encodeURIComponent(file)
			return fetch( url )
				.then( ret=>ret.json() )
				.then( ret=>{ progress.stop(); return ret })
				.catch( error=>{progress.stop();alert(error)} )
		},
		removeDirectory({state,dispatch,commit},{directory}){
			if(!directory) return

			let url = "api/removeDirectory.php?directory="+encodeURIComponent(directory)
			return fetch( url )
				.then( ret=>ret.json() )
				.then( ret=>{ progress.stop(); return ret })
				.catch( error=>{ progress.stop();alert(error) })
		},


	}
}


const UserService = {
	//namespaced: false,
	state:{
		loginName:"",
		loginPass: "",

		firstName:"",
		lastName:"",
		isLogged: false
	},
	getters:{
		isLogged(state){
			return state.isLogged
			//state.loginName != "" ? true : false
		},
		userFullName(state){
			return state.firstName + " " + state.lastName
		}
	},

	actions:{
		init({state, dispatch, commit}){
			dispatch("loadLoginData")
			dispatch("login")
		},

		saveLoginData({state}){
			let data = JSON.stringify( {loginName: state.loginName, loginPass: state.loginPass} )
			localStorage.setItem("login", btoa(data))
		},
		loadLoginData({state}){
			let data = atob(localStorage.getItem("login"))
			try {
				data = JSON.parse(data)
			} catch(e) {
				data = {}
			}

			state.loginName = data.loginName
			state.loginPass = data.loginPass
		},
		addRoutes({state},routes){
			const newRouter = new VueRouter({ routes: CONFIG.routes, linkActiveClass:"active" })
			router.matcher = newRouter.matcher

			router.addRoutes( (routes||state.menu||[] ).map( r => {
				return { path: r.path, component: httpVueLoader("./modules/"+r.component) }
			} ))
		},


		login({state,dispatch,commit}, loginData ){
			if(!loginData){
				loginData = {loginName:state.loginName,loginPass:state.loginPass}
			} else {
				loginData.loginPass = md5(loginData.loginPass)
			}
			if(!loginData.loginName) return

			let url = "users/" + loginData.loginName + "." + loginData.loginPass +".json"
			//let url = "https://firebasestorage.googleapis.com/v0/b/rest-31b69.appspot.com/o/demo."+loginData.loginPass+".json?alt=media&token=ddd6b40a-6fe0-4c1f-b084-1d4e1088bb8e"

			return new Promise((resolve, reject)=>{
				fetch(url, { mode: 'no-cors' } )
              	.then(ret=>ret.json())
              	.then(ret=>{
              		for(let key of Object.keys(ret) ){
              			state[key] = ret[key]
              		}
              		state.loginName = loginData.loginName
              		state.loginPass = loginData.loginPass
              		state.isLogged = true

	              	dispatch("saveLoginData" )
	              	dispatch("addRoutes")

	              	resolve()
              	}, error=>{
              		dispatch("logout")
              		reject()
              	}).catch(e => {
              		dispatch("logout")
	   				reject(e);
				});
            })
		},
		logout({state, dispatch, commit}){
			state.isLogged = false
			localStorage.removeItem("login")
			for(let key of Object.keys(state)){
				state[key] = ""
			}
		}
	}
}
