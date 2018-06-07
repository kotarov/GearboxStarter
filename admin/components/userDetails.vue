
<template>
<div>
<div class="card mb-3" style="margin:3rem auto; max-width:600px">
  <!--<img class="card-img-top" src="http://whosmyguide.com/sites/all/themes/bootstrap_wmg/img/user/user_background_full_blur.jpg" style="height:80px" alt="Card image cap"> -->
  <div class="" style="height:35px;background:#eaeaea;"></div>
  <div class="card-body">
  	<div class="media">
	  	<img class="mr-3" width="100px" src="../assets/img/avatar.jpg">
	    <div class="media-body">
		    <h5 class="card-title">{{ $store.getters.userFullName }}</h5>
		    <p class="card-text">
		    	<b>Email:</b> {{ $store.state.user.email }}<br>
		    	<b>Login:</b> {{ $store.state.user.loginName }}</br>
		    	<b>Pass:</b> ********</br>
		    </p>
		    <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
		</div>
	</div>
  </div>
</div>
</div>
</template>