const currencyStore = {
  state:{
      currency:"lv",
      rates:{eur:1.99,usd:1.45}
  },
  getters:{
    currency(state){ return state.currency },
    price(state,getters){return function(val){ return getters.formatCurrency(val)} },
    formatCurrency(state){return function(val){
      val = parseFloat(val)
      switch(state.currency){
        case "eur": val = "€ "+(val*state.rates[state.currency]).toFixed(2); break;
        case "usd": val = "$ "+(val*state.rates[state.currency]).toFixed(2); break;
        default:    val = val.toFixed(2)+" лв"
      }
      return val
    }}
  },
  actions:{
    init({state,dispatch,commit}){
      state.currency = localStorage.getItem("currency") || (navigator.language || navigator.userLanguage == 'bg' ? 'lv':'eur')
      fetch("../store/currencyRates.json").then(ret=>ret.json())
      .then(ret=>{
        state.rates = ret
      })

    },
    setCurrency({state},c){
      state.currency = c
      localStorage.setItem("currency",c)
    }
  }
}
