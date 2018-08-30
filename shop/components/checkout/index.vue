<template>
<div class="">
  <div class="container p-5 bg-light">
    <div class="py-3 text-center">
      <h2>{{ $t('Checkout form') }}</h2>
<!--
      <p class="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
-->
    </div>
    <br>

    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">{{ $t('Your cart') }}</span>
          <span class="badge badge-secondary badge-pill">{{ $store.getters.productsCartCount }}</span>
        </h4>
        <ul class="list-group mb-3">
          <li v-for="item of items" class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">{{ item.name }} <span class="text-muted px-2">x</span> {{ item.cartQty }}</h6>
              <small class="text-muted">{{ item.title }}</small>
            </div>
            <span class="text-muted">{{ (item.cartQty*item.price).toFixed(2) }}</span>
          </li>

<!--
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Discount</h6>
             <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">{{ (0).toFixed(2) }}</span>
          </li>
-->
          <li class="list-group-item d-flex justify-content-between bg-light">
            <strong>Total </strong>
            <span class="h3">{{ this.$store.getters.productsCartTotal.toFixed(2) }}</span>
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

        <form class="needs-validation" novalidate>

          <h4 class="mb-3">Personal data</h4>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>
<!--
          <div class="mb-3">
            <label for="username">Username</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">@</span>
              </div>
              <input type="text" class="form-control" id="username" placeholder="Username" required>
              <div class="invalid-feedback" style="width: 100%;">
                Your username is required.
              </div>
            </div>
          </div>
-->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="phone">Phone</label>
              <input type="phone" class="form-control" id="phone" placeholder="">
              <div class="invalid-feedback">
                Please enter a valid phone number for shipping updates.
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">Email <span class="text-muted">(Optional)</span></label>
            <input type="email" class="form-control" id="email" placeholder="you@example.com">
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

<!--
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">Phone number</label>
              <input type="text" class="form-control" id="phone" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid phone number is required.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Email address</label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com" value="" required>
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
          </div>
-->

          <br>
          <hr class="mb-4">

          <h4 class="mb-3">Shipping address</h4>
          <address-form></address-form>

          <hr class="mb-4">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" v-model="invoiceAddressIsTheSame" class="custom-control-input" id="same-address">
            <label class="custom-control-label" for="same-address">Invoice address is the same as my shipping address</label>
          </div>

          <div v-if="!invoiceAddressIsTheSame">
            <hr class="mb-4">
            <h4 class="mb-3">Invoice address</h4>
            <address-form></address-form>
          </div>


          <hr class="mb-4">
        <div class="row">
        <div class="col-md-6">
          <h4 class="mb-3">Carrier</h4>
          <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
              <label class="custom-control-label" for="credit">Ekont</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
              <label class="custom-control-label" for="debit">Rapido</label>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h4 class="mb-3">Payment</h4>
          <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
              <label class="custom-control-label" for="credit">Credit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
              <label class="custom-control-label" for="debit">Debit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
              <label class="custom-control-label" for="paypal">PayPal</label>
            </div>
          </div>
        </div>
        </div>
<!--
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cc-name">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required>
              <small class="text-muted">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cc-number">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required>
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="cc-cvv">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>
  -->

          <hr class="mb-4">
          <div class="mb-3">
            <label for="email">Note <span class="text-muted">(Optional)</span></label>
            <textarea class="form-control" id="note" placeholder=""></textarea>
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
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
    invoiceAddressIsTheSame: true,
    saveInformation: false
  }},
  created(){
    this.items = this.$store.getters.productsCartItems
  },
  components:{
    addressForm: httpVueLoader("./components/addressForm.vue")
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
