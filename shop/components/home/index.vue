<template><div>
  <main role="main">

    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Shop example</h1>
        <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p>
      </div>
    </section>

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

}
</script>
