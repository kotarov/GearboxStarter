<template><div>
<!--
  <div v-for="c of carriers" class="custom-control custom-radio">
    <input v-model="carrier" :value="c.id" :id="'carrier-'+c.id" type="radio" class="custom-control-input" required>
    <label class="custom-control-label" :for="'carrier-'+c.id">{{ $store.getters.translateField('name',c) }}</label>
  </div>
-->
  <ul class="list-group">
    <li v-for="c of carriers" c=".sort((a,b)=>a.price > b.price)" class="list-group-item"
            :class="{active:carrier==c.id}" @click="carrier=c.id" style="cursor:pointer;z-index:1">
      <img :src="'assets/img/carriers/'+c.id+'.png'" width="80px" height="40px" class="img-thumbnail">
      <span class="mx-3">{{ $store.getters.translateField('name',c) }}</span>
      <span class="float-right">{{ $store.getters.price(c.price) }}</span>
    </li>
  </ul>
</div></template>

<script>
module.exports={
  props:["value"],
  data(){return {
    carrier:"",
    carriers:[
      { id:"econt", name:"Econt", name_bg:"Еконт", price:5.10 },
      { id:"rapido", name:"Rapido", name_bg:"Рапидо", price:6.00},
      { id:"speedy", name:"Speedy", name_bg:"Спиди", price:6.50 }
    ]
  }},
  watch:{
    carrier(val){
      this.$emit("input",this.carriers.find( c=>c.id==val) )
    }
  },
  created(){
    this.carrier = "econt"
  },
  methods:{

  }
}
</script>
