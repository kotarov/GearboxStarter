<template><div>
  <div v-if="items.length == 0" class="display-4 text-muted">
    {{ $t('Your cart is empty') }}
  </div>

  <div v-else class="row">
    <div class="_col-sm-8 col-md-10 _py-4">
      <h4 class="text-white">{{ $t('Your cart') }}</h4>
        <table class="table table-dark _table-striped _table-hover table-borderless">
          <!--<thead><tr>
            <th>Item</th><th>Price</th><th>Qty</th><th align="center">Total</th>
          </tr></tead>-->
          <tbody>
            <tr v-for="item of items">
              <td width="1em">
                <img v-if="!item.image" src="../assets/img/NoImage.jpg" style="max-width:40px;max-height:40px">
                <img v-else :src="'../store/products/'+item.id+'/'+item.image" style="max-width:50px;max-height:50px">
              </td>
              <td><b>{{ $store.getters.translateField("name",item) }}</b><br>{{ $store.getters.translateField("title",item) }}</td>
              <td width="1em" style="white-space:nowrap">{{ $store.getters.formatCurrency(item.price) }}</td>
              <td width="1em">x</td>
              <td style="white-space:nowrap" width="1em">
                <button @click="$store.dispatch('addProductToCart',{item:item,qty:-1})" class="btn btn-sm btn-dark" style="font-weight:bold">-</button>
                &nbsp;&nbsp;{{ item.cartQty }}&nbsp;&nbsp;
                <button @click="$store.dispatch('addProductToCart',{item:item,qty:1})" class="btn btn-sm btn-dark" style="font-weight:bold">+</button>
              </td>
              <td align="right" width="1em" style="white-space:nowrap;font-size:1.2em;">
                {{ $store.getters.formatCurrency(parseFloat(item.price)*parseFloat(item.cartQty)) }}
              </td>
              <td align="right" width="1em">
                <button @click="$store.dispatch('removeProductFromCart',item)"
                  class="btn btn-sm btn-danger">&times;</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
          </tfoot>
        </table>

    </div>
    <div class="col-md-2 _col-sm-4 _offset-md-1 py-md-5 py-sm-1">
      <h4 class="text-white">{{ $t('Summary') }}</h4>
      <ul class="list-unstyled">
        <li><span class="text-warning sum" style="">
          {{ $store.getters.formatCurrency(this.$store.getters.productsCartTotal) }}
          <!--
          <small style="position:relative;left:-10px;top:-10px" class="text-muted">{{ ((this.$store.getters.productsCartTotal.toFixed(2) - this.$store.getters.productsCartTotal.toFixed(0))*100).toFixed(0) }}
          </small>
          -->
        </span></li>
      </ul>
    </div>
  </div>
</div></template>

<script>
module.exports = {
  data(){return {
    items: []
  }},
  created(){
    this.items = this.$store.getters.productsCartItems
  },
  i18n:{
    messages:{
      'bg':{
        'Your cart is empty':"Вашата количка е празна"
      }
    }
  }
}
</script>

<style scoped>
td {
  vertical-align: middle;
}
.sum {
  padding:5px 20px;
  background:#212529;
  white-space:nowrap;
  font-size:2.2em;
  border:1px solid;
}
</style>
