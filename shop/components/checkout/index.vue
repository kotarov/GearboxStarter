<template>
<div class="bg-light">
  <div class="container p-5">
    <div class="py-3 text-center">
      <h2>{{ $t('Checkout form') }}</h2>
<!--
      <p class="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
-->
    </div>
    <br>

    <div class="row">
      <div class="col-md-4 order-md-2 mb-4" _style="position:fixed;top:70px; right:5px">
        <!-- <h4 class="d-flex align-item-center mb-3"></h4>
        <div class="" style="background:rgba(0,0,0,0.5); height:200px">

        </div>-->


        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">{{ $t('Your cart') }}</span>
          <span class="badge badge-secondary badge-pill">{{ $store.getters.productsCartCount }}</span>
        </h4>
        <ul class="list-group mb-3">
          <li v-for="item of items" class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">{{ $store.getters.translateField("name",item) }} <span class="text-muted px-2">x</span> {{ item.cartQty }}</h6>
              <small class="text-muted">{{ $store.getters.translateField("title",item) }}</small>
            </div>
            <span class="text-muted price">{{ $store.getters.formatCurrency(item.cartQty*item.price) }}</span>
          </li>


          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-mutted">
              <h6 class="my-0">{{ $t('Carrier') }}</h6>
             <b>{{ order.carrier ? $store.getters.translateField('name',order.carrier) : "" }}</b>
            </div>
            <span class="text-success price">{{ $store.getters.price(order.carrier ? order.carrier.price : 0) }}</span>
          </li>

          <li class="list-group-item d-flex justify-content-between _bg-light">
            <strong>{{ $t('Total') }} </strong>
            <span class="h3 price">{{ $store.getters.formatCurrency($store.getters.productsCartTotal + parseFloat(order.carrier ? order.carrier.price : 0) ) }}</span>
          </li>
        </ul>
        <!--
        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code">
            <div class="input-group-append">
              <button type="submit" class="btn btn-secondary">Redeem</button>
            </div>
          </div>
        </form>
      -->
      </div>
      <div class="col-md-8 order-md-1">

        <form @submit="alert('submiting')" class="needs-validation" _novalidate>


          <!-- LOGIN
          ========================  -->
          <div class="custom-control custom-checkbox float-right">
            <input v-model="noLogin" id="no-login" type="checkbox" class="custom-control-input">
            <label class="custom-control-label" for="no-login">I will not track this order</label>
          </div>
          <h4 class="mb-3">Account</h4>

          <div v-if="!noLogin" class="row">
            <div class="col-md-6 mb-3">
              <label>User name</label>
              <input v-model="account.userName" type="text" class="form-control" placeholder="" required>
              <div class="invalid-feedback"> Valid user name is required. </div>
            </div>
            <div class="col-md-6 mb-3">
              <label>Password</label>
              <input v-model="account.userPassword" type="password" class="form-control" placeholder="" required>
              <div class="invalid-feedback"> Password is required. </div>
            </div>
          </div>



          <hr class="mb-4">


          <!-- SHIPPING
          =========================== -->
          <h4 class="mb-3">Shipping</h4>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label>First name</label>
              <input v-model="order.shippingFirstName" type="text" class="form-control" required>
              <div class="invalid-feedback"> Valid first name is required. </div>
            </div>
            <div class="col-md-6 mb-3">
              <label>Last name</label>
              <input v-model="order.shippingLastName" type="text" class="form-control" required>
              <div class="invalid-feedback"> Valid last name is required. </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-5 mb-3">
              <label>Phone</label>
              <input v-model="order.shippingPhone" type="phone" class="form-control" required>
              <div class="invalid-feedback"> Please enter a valid phone number for shipping updates.</div>
            </div>
            <div class="col-md-7 mb-3">
              <label for="email">Email <span class="text-muted">(Optional)</span></label>
              <input v-model="order.shippingEmail" type="email" class="form-control">
              <div class="invalid-feedback"> Please enter a valid email address for shipping updates.</div>
            </div>
          </div>

          <div class="mb-3">
            <label>Address</label>
            <input v-model="order.shippingAddress" type="text" class="form-control" required>
            <small class="text-muted">Enter the full address - with country and ZIP code.</small>
            <div class="invalid-feedback"> Please enter your shipping address. </div>
          </div>

          <hr class="mb-4">

          <!--  CARRIER
          ============================ -->
          <h4 class="mb-3">Carrier</h4>
          <div class="d-block my-3">
            <select-carrier v-model="order.carrier"></select-carrier>
          </div>


          <hr class="mb-4">


          <!--  INVOICE
          ============================ -->
          <div class="custom-control custom-checkbox">
            <input v-model="order.iWantInvoice" id="i-want-invoice" type="checkbox" class="custom-control-input">
            <label class="custom-control-label" for="i-want-invoice">I want invoice</label>
          </div>

          <div v-if="order.iWantInvoice" class="mb-4">
            <br><h4 class="mb-3">Invoice</h4>
            <div class="row">
              <div class="col-md-9 mb-3">
                <label>Company name</label>
                <input v-model="order.invoiceCompanyName" type="text" class="form-control" required>
                <div class="invalid-feedback"> Valid company name is required. </div>
              </div>
              <div class="col-md-3 mb-3">
                <label>EIN <span class="text-muted">(Optional)</span></label>
                <input v-model="order.invoiceEin" type="text" class="form-control">
                <div class="invalid-feedback"> Valid last name is required. </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-5 mb-3">
                <label>Phone</label>
                <input v-model="order.invoicePhone" type="phone" class="form-control">
                <div class="invalid-feedback"> Please enter a valid phone number.</div>
              </div>
              <div class="col-md-7 mb-3">
                <label for="email">Email <span class="text-muted">(Optional)</span></label>
                <input v-model="order.invoiceEmail" type="email" class="form-control">
                <div class="invalid-feedback"> Please enter a valid email address.</div>
              </div>
            </div>

            <div class="mb-3">
              <label>Responsive Person</label>
              <input v-model="order.invoiceMol" type="text" class="form-control" required>
              <div class="invalid-feedback"> Please enter Material Responsive Person. </div>
            </div>

            <div class="mb-3">
              <label>Address</label>
              <input v-model="order.invoiceAddress" type="text" class="form-control" required>
              <small class="text-muted">Enter the full address</small>
              <div class="invalid-feedback"> Please enter invoice address - with country and ZIP code. </div>
            </div>

          </div>




          <hr class="mb-4">

          <!--  PAYMENT
          ============================ -->
          <h4 class="mb-3">Payment</h4>
          <div class="d-block my-3">
            <select-payment></select-payment>
          </div>


          <hr class="mb-4">


          <!--  Leave aNOTE
          ============================ -->
          <div class="mb-3">
            <label>Note <span class="text-muted">(Optional)</span></label>
            <textarea v-model="order.note" class="form-control"></textarea>
          </div>



          <div class="custom-control custom-checkbox">
            <input type="checkbox" v-model="saveInformation" class="custom-control-input" id="save-info">
            <label class="custom-control-label" for="save-info">{{ $t('Save this information for next time') }}</label>
          </div>
          <br>
          <button class="btn btn-primary btn-lg btn-block" type="submit">{{ $t('Continue to checkout') }}</button>
        </form>
      </div>
    </div>
</div>
</div></template>

<script>
module.exports = {
  data(){return {
    items: [],
    //iWantInvoice: false,
    saveInformation: false,
    noLogin: false,

    account:{},
    order:{
      //shippingCarrier:"econt",
      //paymentMethod:"credit-card"
    }
  }},
  created(){
    this.items = this.$store.getters.productsCartItems
  },
  components:{
    //addressForm: httpVueLoader("./components/addressForm.vue")
    selectPayment: httpVueLoader("./components/selectPayment.vue"),
    selectCarrier: httpVueLoader("./components/selectCarrier.vue")
  },
  i18n:{
    messages:{
      'bg':{
        'Checkout form':"Форма за поръчване",


        'Save this information for next time':"Запиши данните за следващия път",
        'Continue to checkout':"Приклчи поръчката"
      }
    }
  }
}
</script>
<style scoped>
  .price{ white-space: nowrap} 
</style>
