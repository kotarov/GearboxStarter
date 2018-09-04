<template><div>
  <main role="main">

    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">{{ $t("All for 3d printing") }}</h1>
        <p class="lead text-muted">{{ $t("Here you can find everything about 3D singing.") }}</p>
<!--
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p>
      -->
      </div>
    </section>
<!--
    <div class="navbar bg-light">
        <div class="container">
          <div class="d-flex w-100 justify-content-center">
            <a href="#" class="navbar-item d-flex align-items-center">
              All </a>
            <a href="#" class="navbar-item d-flex align-items-center">
              Cat One</a>
            <a href="#" class="navbar-item d-flex align-items-center">
              Cat Two </a>
            <a href="#" class="navbar-item d-flex align-items-center">
              Cat three </a>
              <a href="#" class="navbar-item d-flex align-items-center">
                For </a>
          </div>
      </div>
    </div>
-->
    <div class="bg-light py-4">&nbsp;<br></div>

    <div class="navbar bg-light">
        <div class="container">
          <div class="btn-group btn-group-toggle" data-toggle="buttons" style="margin:auto">
            <label v-for="cat of categories" @click="activeCategory = cat" class="btn btn-secondary" :class="{'active':activeCategory.id==cat.id}">
              <input :value="cat.id" type="radio"> {{ $store.getters.translateField('title', cat) }}
            </label>
          </div>
          <div class="py-3 col-12 text-center">
            <br><br>
            <h2>{{ $store.getters.translateField('descr',activeCategory) }}</h2>
          </div>
      </div>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="item of filteredItems" class="col-lg-4 col-md-4">
            <thumb-item :item="item"></thumb-item>
          </div>
        </div>
      </div>
    </div>

  </main>

  <div class="text-muted py-5">
    <div class="container">
      <p>{{ $t('Shop example is Bootstrap, but please download and customize it for yourself!') }}'</p>
      <p>{{ $t('New to Gearbox Starter ?') }} <a href="../">Visit the homepage</a> or ask any question <a href="mail:skotarov@gmail.com">skotarov@gmail.com</a>.</p>
    </div>
  </div>
</div></template>

<script>
module.exports = {
  data(){return {
    items: [],
    filteredItems: [],
    categories:[],
    activeCategory: {}
  }},
  watch:{
    activeCategory(cat){
      this.filteredItems = this.items.filter(i=>{
        if(typeof i.categories == 'string') i.categories = i.categories.split(",")
        return i.categories.indexOf(cat.id) > -1
      })
      localStorage.setItem("selectedCategory",JSON.stringify(cat))
    }
  },
  created(){
    this.items = this.$store.getters.products //homeProducts
    this.categories = this.$store.getters.allProductCategories
    let lsCat = localStorage.getItem("selectedCategory")
    this.activeCategory = lsCat ? JSON.parse(lsCat) : this.categories[0]
  },
  components:{
  },
  i18n:{messages:{
    en:{
      "Here you can find everything about 3D singing.":"Here you can find everything about 3D singing.Mterials, models, tools, products"
    },
    bg:{
      "All for 3d printing":"Всичко за 3D печатането",
      "Here you can find everything about 3D singing.":"Тук можете да намерите всичко за 3D печатането.Материали, модели, инструменти, продукти.",
      //"Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.":"Нещо кратко и водещо за събирането по-долу - съдържанието му, създателят и т.н. Направете го кратък и сладък, но не прекалено кратък, така че хората просто не го пропускат изцяло.",
      //"Shop example is Bootstrap, but please download and customize it for yourself!":"Пример за магазин е Bootstrap, но моля, изтеглете и персонализирайте по своите нужди!",
      "New to Gearbox Starter ?":"Нов сте за Gearbox Starter ?"
    }
  }}
}
</script>
<style scoped>
.jumbotron{
  background-image: url(https://cdn.redshift.autodesk.com/2018/04/3d-printing-timeline-header.gif);
  background-size: cover;
  background-position: top;
  color: #fff;
  min-height:350px;
}
.jumbotron .text-muted {
  background-color: rgba(0,0,0,0.15);
  color: #fff!important;
  text-shadow: 2px 2px #000;
  font-weight: bold;
}
</style>
