<template><div>
  <div v-if="items.length == 0" class="display-4 text-muted">
    Your cart is empty
  </div>

  <div v-else class="row">
    <div class="_col-sm-8 col-md-10 _py-4">
      <h4 class="text-white">Your products</h4>
        <table class="table table-dark table-striped table-borderless table-hover">
          <thead><tr>
            <th>Item</th><th>Price</th><th>Qty</th><th>Total</th>
          </tr></tead>
          <tbody>
            <tr v-if="items.length == 0"><td colspan="4" class="text-center">No items in the cart</td></tr>
            <tr v-else v-for="item of items">
              <td>{{ item.title }}</td>
              <td>{{ item.price }}</td>
              <td style="white-space:nowrap">
                <button @click="$store.dispatch('addProductToCart',{item:item,qty:-1})" class="btn btn-sm btn-dark">-</button>
                {{ item.cartQty }}
                <button @click="$store.dispatch('addProductToCart',{item:item,qty:1})" class="btn btn-sm btn-dark">+</button>
              </td>
              <td>{{ item.price*item.qty }}</td>
              <td>
                <button @click="$store.dispatch('removeProductFromCart',item)" class="btn btn-sm btn-danger">Del</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
          </tfoot>
        </table>

    </div>
    <div class="col-md-2 _col-sm-4 _offset-md-1 py-md-5 py-sm-1">
      <h4 class="text-white">Summary</h4>
      <ul class="list-unstyled">
        <li><h3 class="text-white">{{ total.toFixed(2) }}</h3></li>
      </ul>
    </div>
  </div>
</div></template>

<script>
module.exports = {
  data(){return {
    items: [],
    total: 0
  }},
  created(){
    this.items = this.$store.getters.cartItems
  }

}
</script>
