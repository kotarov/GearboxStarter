<template>
  <div class="card mb-4 box-shadow">
    <div class="card-img-top" :style="'background-image:url(\''+imageUrl()+'\')'" alt="Card image cap"></div>
    <div class="card-body">
      <p class="card-text" style="min-height:100px">{{ item.descr }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
        </div>
        <small class="text-muted">9 mins</small>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props:["item"],
  methods:{
    imageUrl(){
      return "https://static.boredpanda.com/blog/wp-content/uuuploads/creative-product-packaging-2/creative-packaging-2-note-1.jpg"
    }
  }
}
</script>

<style scoped>
  .card-img-top{
    height: 225px;
    width: 100%;
    display: block;
    background-position: center;
    background-size:cover;
  }
  .card-text {
    min-height: 100px;
  }
</style>
