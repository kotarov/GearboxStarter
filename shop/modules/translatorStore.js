const translatorStore = {
  state:{},
  getters:{
    translateField(state){return function(field,obj){
      if(typeof obj !== "object") return ""

      let field_l = field+"_"+i18n.locale

      return  obj[field_l] || obj[field] || ""
    }}
  },
  actions:{}
}
