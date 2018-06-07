<template>
	<div v-if="!hide">
	<br><br>
	<div v-if="showError" class="alert alert-danger alert-dismissible fade show" role="alert">
		Wrong login name or password 
		<button type="button" class="close" @click="showError=false" > <span>&times;</span> </button>
	</div>
    <form class="form-signin" @submit.prevent="submit">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input _type="email" v-model="loginName" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <input type="password" v-model="pass" id="inputPassword" class="form-control" placeholder="Password" required>
      <div class="checkbox mb-3"> <label class="text-muted"> <input type="checkbox" value="remember-me" disabled> Remember me </label> </div>
      
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

      <br> <p style="color:#aaa"> user: demo <br> pass: 11111 </p>
    </form>
  </div>
</template>

<script>
module.exports = {
	data(){return {
		hide: false,
		showError: false,
		loginName: "",
		pass: ""
	}},
	beforeRouteEnter(to,from,next){
		store.dispatch("logout")
		next()
	},
	methods:{
		submit(){
			this.showError = false
			this.$store.dispatch("login", { loginName: this.loginName, loginPass: this.pass })
			.then((ret)=>{
				//this.hide = true
				let before = router.currentRoute.fullPath.replace("/Login","") || "/"
	          	router.push( before )
			}, (error)=>{
				this.showError = true
			})
		}
	}
}
</script>

<style scoped>
	.form-signin {
	  width: 100%;
	  max-width: 330px;
	  padding: 15px;
	  margin: auto;
	}
	.form-signin .checkbox {
	  font-weight: 400;
	}
	.form-signin .form-control {
	  position: relative;
	  box-sizing: border-box;
	  height: auto;
	  padding: 10px;
	  font-size: 16px;
	}
	.form-signin .form-control:focus {
	  z-index: 2;
	}
	.form-signin input[type="email"] {
	  margin-bottom: -1px;
	  border-bottom-right-radius: 0;
	  border-bottom-left-radius: 0;
	}
	.form-signin input[type="password"] {
	  margin-bottom: 10px;
	  border-top-left-radius: 0;
	  border-top-right-radius: 0;
	}
</style>