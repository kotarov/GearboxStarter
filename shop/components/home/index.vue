<template><div>
  <main role="main">

    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">{{ $t('Shop example') }}</h1>
        <p class="lead text-muted">{{ $t("Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.") }}</p>
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
    <div class="bg-light">&nbsp;<br></div>

    <div class="navbar bg-light">
        <div class="container">
          <div class="btn-group btn-group-toggle" data-toggle="buttons" style="margin:auto">
            <label class="btn btn-secondary active">
              <input type="radio" name="options" id="option1" autocomplete="off" checked> All
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="option2" autocomplete="off"> Category One
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="option3" autocomplete="off"> CatRadio
            </label>
          </div>
      </div>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="item of items" class="col-md-4">
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
    items: []
  }},
  created(){
    this.items = this.$store.getters.homeItems
  },
  components:{
  },
  i18n:{messages:{
    bg:{
      "Shop example":"Примерен магазин",
      "Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.":"Нещо кратко и водещо за събирането по-долу - съдържанието му, създателят и т.н. Направете го кратък и сладък, но не прекалено кратък, така че хората просто не го пропускат изцяло.",
      "Shop example is Bootstrap, but please download and customize it for yourself!":"Пример за магазин е Bootstrap, но моля, изтеглете и персонализирайте по своите нужди!",
      "New to Gearbox Starter ?":"Нов сте за Gearbox Starter ?"
    }
  }}
}
</script>
