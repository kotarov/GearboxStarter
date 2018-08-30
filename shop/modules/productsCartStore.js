const productsCartStore = {
  state:{
      items:[]
  },
  getters:{
    productsCartItems(state){ return state.items },
    productsCartTotal(state){ return state.items.reduce((a,i)=>a+(parseFloat(i.price)*parseFloat(i.cartQty)),0) },
    producstCartItem(state){return function(item_or_id){
      let id = typeof item_or_id == "object" ? item_or_id.id : item_or_id
      return state.items.filter(i => i.id == id )
    }},
    productsCartCount(state){
      return state.items.reduce((a,i)=>a+i.cartQty,0)
    }
  },
  actions:{
    init({state,dispatch,commit}){
      dispatch("loadProductsCartFromStorage")
    },
    loadProductsCartFromStorage({state,dispatch,commit}){
      let saved = localStorage.getItem('productsCart')
      if(saved){
        saved = JSON.parse(saved)
        state.items = saved.items || '[]'
      }
    },
    saveProductsCartFromStorage({state,dispatch,commit}){
      localStorage.setItem("productsCart", JSON.stringify(state) )
    },


    addProductToCart({state,dispatch,commit},{item,qty}){
        let exists = state.items.filter(i=>i.id==item.id)
        if(exists[0] && exists[0].id){
          exists[0]['cartQty'] += qty
          if(exists[0]['cartQty']<1) dispatch("removeProductFromCart",exists[0]) //delete exists[0]
        } else {
          let cpItem = Object.assign({}, item, {cartQty:qty})
          if(cpItem.cartQty > 0) state.items.push(cpItem)
        }
        dispatch("saveProductsCartFromStorage")
    },
    removeProductFromCart({state,dispatch,commit},item){
      for(let i = 0; i < state.items.length; i++){
        if(state.items[i].id == item.id )
          state.items.splice(i,1)
      }
      dispatch("saveProductsCartFromStorage")
    }
  }
}
