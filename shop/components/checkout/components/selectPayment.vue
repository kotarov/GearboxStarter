<template><div>
  <div class="custom-control custom-radio">
    <input v-model="paymentMethod" value="credit-card" id="payment-credit" type="radio" class="custom-control-input" checked required>
    <label class="custom-control-label" for="payment-credit">Credit card</label>
  </div>
  <div class="custom-control custom-radio">
    <input v-model="paymentMethod" value="debit-card" id="payment-debit" type="radio" class="custom-control-input" required>
    <label class="custom-control-label" for="payment-debit">Debit card</label>
  </div>
  <div class="custom-control custom-radio">
    <input v-model="paymentMethod" value="paypal" id="payment-paypal" type="radio" class="custom-control-input" required>
    <label class="custom-control-label" for="payment-paypal">PayPal</label>
  </div>

</div></template>

<script>
module.exports = {
  data(){return {
    paymentMethod: "credit-card"
  }}
}
</script>
