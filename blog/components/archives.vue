<template>
	<div>
		<h4 class="font-italic">Archives</h4>
        <ol class="list-unstyled mb-0">
          <li v-for="item of items">
            <router-link :to="'/'+item">
              {{ new Date(item).toLocaleDateString("en-US",{year:'numeric',month:'long'}) }}
            </router-link>
          </li>
        </ol>
	</div>
</template>

<script>
module.exports = {
    data(){return {
      items: []
    }},
    created(){
      this.fetchItems()
    },
    methods:{
      fetchItems(){
        this.items = this.$store.getters.existingDates
      }
    }
}
</script>