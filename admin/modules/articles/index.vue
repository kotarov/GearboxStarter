<template>
	<div class="pt-3 pb-2 mb-3 border-bottom">

		<!-- Header -->

		<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 _border-bottom">
			<h2 class="h2">{{ title }}</h2>

			<div class="btn-toolbar ml-2 mb-md-0">
				<b-input-group size="sm" class="ml-2 m-y-2" prepend='<i data-feather="search"></i>'>
					<b-form-input v-model="filter" size="sm" class="" placeholder="Filter..."></b-form-input>
				</b-input-group>

				<b-btn-group size="sm" class="ml-2">
					<b-btn variant="outline-secondary" @click="newModal=true">New</b-btn>
					<b-btn variant="outline-secondary" @click="$router.push('/Articles/Categories')">Categories</b-btn>
					<b-btn variant="outline-secondary" @click="fetchCollections()"><i class="fa fa-refresh"></i> Reload</b-btn>
				</b-btn-group>
			</div>
		</div>

		<span class="float-right">
			Found: <b> {{ filteredItems.length }}</b> of {{ items.length }}
		</span>

		<b-form-checkbox-group
			v-model="selectedCollections"
			:options="collections"
			@input="fetchCollections"
		></b-form-checkbox-group>


		<!-- Table -->

		<b-table :id="collections[0]+'_table'" show-empty pagination responsive striped hover small caption-top
		:busy.sync="isBusy"
		:current-page="currentPage"
		:per-page="perPage"
		:fields="fields"
		:items="items"
		stacked="md"
		:filter="filter"
		:sort-by.sync="sortBy"
		:sort-desc.sync="sortDesc"
		:sort-direction="sortDirection"
		@filtered="onFiltered">

			<!-- <template slot="isActive" slot-scope="data">
				<a v-if="data.item.isActive==1" @click.prevent="editField(data.item,'isActive',0)" href="#" class="text-success">Yes</a>
				<a v-else  @click.prevent="editField(data.item,'isActive',1)" href="#" class="text-danger">No</a>
			</template> -->


			<template slot=".collection" slot-scope="data">
				<a href="#" @click.prevent="selectItem(data.item);collectionModal=true">
					[ {{ data.item['.collection'].split('_').pop() }} ]</a>
			</template>

			<template slot="image" slot-scope="data">
				<a href="#" @click.prevent="selectItem(data.item);imageModal=true">
					<img v-if="data.item.image" style="max-width:40px;max-height:30px"
							:src="storePath+data.item['.collection']+'/'+data.item.id+'/'+data.item.image+'?'+imageTimestamp" >
					<span v-else>No image</span>
				</a>
				<a href="#" v-if="data.item.image" @click.prevent="selectItem(data.item);removeImageModal=true" class="btn btn-link" title="Remove image" >&times;</a>
			</template>

			<!--
			<template slot="date" slot-scope="data">
				<span style="white-space:nowrap">{{ new Date(data.item.year+"/"+data.item.month+"/"+data.item.day).toLocaleDateString() }}</span>
			</template>
			-->

			<template slot="categories" slot-scope="data">
				{{ JSON.stringify(data.item.categories) }}
			</template>

			<template slot="title" slot-scope="data">
				<b>{{ data.item.title }}</b> <br> &nbsp; <i>{{ JSON.stringify(data.item.categories) }}</i><br>
				<span v-if="typeof data.item.descr == 'string'" v-html="data.item.descr.slice(0,130)"></span>
				<span v-if="data.item.descr && data.item.descr.length > 130">...</span>
			</template>
<!--
			<template slot="content" slot-scope="data">
				<div style="white-space:nowrap;text-align:center">
					<b-btn size="xs" variant="outline-secondary" @click="selectItem(data.item);viewModal=true">View</b-btn>
					<b-btn size="xs" variant="outline-secondary" @click="selectItem(data.item);fileModal=true">HTML</b-btn>
				</div>
				<div style="white-space:nowrap; text-align:center">
					<button class="btn btn-outline-secondary btn-xs" @click="selectItem(data.item);editModal=true">Edit</button>
					<b-btn size="xs" variant="outline-danger" @click="selectItem(data.item);deleteModal=true">Del</b-btn>
				</div>
			</template>
-->
			<template slot="actions" slot-scope="data">
				<div style="white-space:nowrap; text-align:right">
					<button class="btn btn-outline-secondary btn-xs" @click="selectItem(data.item);editModal=true">Edit</button>
					<b-btn size="xs" variant="outline-danger" @click="selectItem(data.item);deleteModal=true">Del</b-btn>
				</div>
				<div style="white-space:nowrap;text-align:right">
					<b-btn size="xs" variant="outline-secondary" @click="selectItem(data.item);viewModal=true">View</b-btn>
					<b-btn size="xs" variant="outline-secondary" @click="selectItem(data.item);fileModal=true">HTML</b-btn>
				</div>

			</template>


		</b-table>


		<!-- Pagination -->

		<b-row>
			<b-col md="1">
				<b-form-select v-model="perPage" size="sm" :options="pageLengths" style="min-width:60px"></b-form-select>
			</b-col>
			<b-col md="6">
				<b-pagination class="my-0" v-model="currentPage" :total-rows="items.length" :per-page="perPage"  />
			</b-col>
			<b-col md="3"></b-col>
			<b-col md="2" class="text-right">
				Found: <b>{{ filteredItems.length }}</b> of {{ items.length }}
			</b-col>
		</b-row>


		<!-- ------- DILAOGS --------- -->

		<!-- Modal NEW -->

		<b-modal v-model="newModal" title="New" @shown="initNewItem()" c="selectedCopy={}" :no-fade="noFade"
			ok-title="Save" cancel-variant="link" @ok="newItem"
		>
			<b-form-group label="Collection:*" horizontal>
				<b-form-select v-model="selectedCopy['.collection']" :options="selectedCollections"></b-form-select></b-form-group>
			<b-form-group label="Date:*" horizontal> <b-form-input type="date" v-model="selectedCopy.date"></b-form-input> </b-form-group>
			<b-form-group label="Title:*" horizontal>
				<b-form-textarea v-model="selectedCopy.title" required autofocus></b-form-textarea></b-form-group>
			<b-form-group label="Descr:"  horizontal> <b-form-textarea v-model="selectedCopy.descr" ></b-form-textarea> </b-form-group>
			<b-form-group label="Author:" horizontal> <b-form-input v-model="selectedCopy.author"></b-form-input>       </b-form-group>
			<b-form-group label="Categories:" horizontal>
				<b-form-select v-model="selectedCopy.categories" :options="categories" multiple></b-form-select></b-form-group>
		</b-modal>

		<!-- Modal EDIT -->

		<b-modal v-model="editModal" title="Edit"  :no-fade="noFade"
			@show=""
			@ok="editItem" ok-title="Save" cancel-title="Exit" cancel-variant="link"
		>
			<b-form-group label="ID:"     horizontal> <b>{{ selectedCopy.id }}</b> </b-form-group>
			<b-form-group label="Date:*" horizontal> <b-form-input type="date" v-model="selectedCopy.date"></b-form-input> </b-form-group>
			<b-form-group label="Title:*" horizontal> <b-form-textarea v-model="selectedCopy.title"></b-form-textarea> </b-form-group>
			<b-form-group label="Descr:"  horizontal> <b-form-textarea v-model="selectedCopy.descr" ></b-form-textarea> </b-form-group>
			<b-form-group label="Author:" horizontal> <b-form-input v-model="selectedCopy.author"></b-form-input>       </b-form-group>
			<b-form-group label="Categories:" horizontal>
				<b-form-select v-model="selectedCopy.categories" :options="categories" multiple></b-form-select>
			</b-form-group>
		</b-modal>


		<!-- Modal VIEW -->

		<b-modal v-model="viewModal" size="lg" @show="fetchFileContent" no-fade
			:title="selectedCopy.title"
			ok-only @ok="selectedCopy = {}" ok-title="Exit" ok-variant="link"
		>
			<div v-html="htmlFileContent"></div>
		</b-modal>


		<!-- Modal DELETE -->

		<b-modal v-model="deleteModal" :no-fade="noFade"
			title="Delete ?" header-text-variant="danger"
			@ok="deleteItem" ok-variant="danger" ok-title="Delete" cancel-variant="link"
		>
			<div> <label class="col-sm-2">&nbsp;</label> <span> {{ selectedItem.id }} - [ {{ selectedItem[".collection"] }} ]</span> </div>
			<div> <label class="col-sm-2">Title: </label> <b> {{ selectedItem.title }} </b> </div>
		</b-modal>


		<!-- Modal IMAGE -->

		<b-modal v-model="imageModal" @show="uploadImageContent = ''"  :no-fade="noFade"
			:title="selectedCopy.title"
			@ok="uploadImage" ok-title="Upload" cancel-variant="link" cancel-title="Exit"
		>
			<div class="form-group">
				<img v-if="selectedCopy.image"  :src="storePath+selectedItem['.collection']+'/'+selectedItem.id+'/'+selectedItem.image+'?'+imageTimestamp" style="max-width:100%">
			</div>
			<b-form-group label="Change Image:*" horizontal>
				<b-form-file v-model="uploadImageContent"></b-form-file>
			</b-form-group>

		</b-modal>

		<!-- Modal REMOVE IMAGE -->
		<b-modal v-model="removeImageModal" @show="" size="sm"  :no-fade="noFade"
			title="Remove Image"
			@ok="removeImage" ok-title="Remove" cancel-variant="link" cancel-title="Exit"
		>
			Remove image ?
		</b-modal>


		<!-- Modal FILE -->

		<b-modal v-model="fileModal" size="screen" no-fade @show="fetchFileContent"  :no-fade="noFade"
			:title="selectedCopy.title + ' ['+htmlFileContent.length+' b]'"
			@ok="changeFileContent" ok-title="Save" cancel-variant="link"
		>
			<summernote v-model="htmlFileContent" autofocus placeholder="Write aArticle content..."></summernote>
		</b-modal>


		<!-- Modal COLLECTION -->

		<b-modal v-model="collectionModal"  :no-fade="noFade"
			title="Change Collection"
			@ok="changeItemCollection" ok-title="Change" cancel-variant="link"
		>
			<b-form-group label="">
			    <b-form-radio-group v-model="selectedCopy['.collection']" :options="collections" stacked> </b-form-radio-group>
			</b-form-group>
		</b-modal>

	</div>
</template>

<script>
module.exports = {
	data(){return {

		/* Entries */

		title: "Articles",
		collections: ["articles","articles_DISABLED","articles_DELETED"],
		selectedCollections: ["articles","articles_DISABLED"],

		categories:[],

		fields:[
		  //{ key:'isActive',sortable:true },
		  { key: '.collection', sortable:true },
		  { key:'image'},
		  { key:'id', sortable:true },
		  { key: 'date', sortable:true },
		  //{ key:"categories"},
		  { key:'title', label:"Title/Category/Descr", sortable:true, tdClass:"w-50" },
		  { key:'actions', class:"text-right" },
		  //{ key:'content', label:"HTML", class:"text-right" },

		],
		required:[".collection","date","title"],
		storePath: "../store/",

		/* Filters & Pagination */

		filter:"",
		sortBy: null,
		sortDesc: false,
		sortDirection: 'asc',

		pageLengths: [ 2, 10, 25, 60, 100 ],
		perPage: 10,
		currentPage:1,

		/* Table  */

		items: [],
		filteredItems: [],
		isBusy: false,

		selectedItem:{},

		imageTimestamp: Date.now(),

		/* Modals */
		noFade: true,

		selectedCopy: {},
		htmlFileContent: "",
		uploadImageContent: null,
		summernote:null,

		newModal: false,
		viewModal:false,
		editModal:false,
		imageModal: false,
		removeImageModal:false,
		fileModal: false,
		deleteModal: false,
		collectionModal:false,

		/**/
		//monthsOptions: [{text:"Jan",value:1},{text:"Feb",value:2},{text:"Mar",value:3},{text:"Apr",value:4},{text:"May",value:5},{text:"Jun",value:6},{text:"Jul",value:7},{text:"Aug",value:8},{text:"Sep",value:9},{text:"Oct",value:10},{text:"Jan",value:11},{text:"Dec",value:12}]
	}},
	computed:{
		directory(){ return this.selectedItem[".collection"]+'/'+this.selectedItem.id },
	},
	watch:{
		selectedCollections(){ this.saveState() },
		filter(){ this.saveState() },
		sortBy(){ this.saveState() },
		sortDesc(){ this.saveState() },
		sortDirection(){ this.saveState() },
		perPage(){ this.saveState() },
		currentPage(){ this.saveState() },
		selectedItem(){ this.saveState() }
	},
	created(){
		this.loadState()
		this.fetchCollections()
		this.fetchCategories()
	},

	methods:{

		/* Commponent Services */

		saveState(){
			let stateName = this.$router.currentRoute.fullPath
			let state = {
				selectedId: this.selectedItem.id,
				selectedCollections: JSON.stringify( this.selectedCollections ),
				filter:this.filter,
				sortBy: this.sortBy,
				sortDesc: this.sortDesc,
				sortDirection: this.sortDirection,
				perPage: this.perPage,
				currentPage: this.currentPage,
			}
			localStorage.setItem(stateName,JSON.stringify(state))
		},
		loadState(){
			let stateName = this.$router.currentRoute.fullPath
			let state = localStorage.getItem(stateName)
			if(state){
				state = JSON.parse( state )
				//this.selectItem( state.selectedId )
				this.selectedCollections = JSON.parse( state.selectedCollections )
				this.filter = state.filter
				this.sortBy = state.sortBy
				this.sortDesc = state.sortDesc
				this.sortDirection = state.sortDirection
				this.perPage = state.perPage
				this.currentPage = state.currentPage
			}
		},
		selectItem(rowItem){
		  	if(typeof rowItem == 'object'){
		  		this.selectedItem = rowItem
		  	} else {
		  		this.items.map((row)=>{
		  			if(row.id == rowItem) rowItem = row
		  		})
		  	}
		  	this.selectedCopy = Object.assign( {}, rowItem )

			this.items.map((row)=>{
				if(row.id == rowItem.id)
				  row._rowVariant="info";
				else
				  delete(row._rowVariant)
				return row
			})
		},
		onFiltered (filteredItems) {
		  this.filteredItems = filteredItems
		  this.currentPage = 1
		},
		checkRequired( data, required ){
			if(!required) required = this.required
			for(let req of required ){
				if(!data[req]) {
					alert(req + " is required")
					return false
				}
			}
			return true
		},


		/* Files Services */

		uploadImage(event){
			event.preventDefault()

			let img = this.uploadImageContent
			if(!img) return alert("Image is required!")

			let filename = 'cover.'+img.type.split("/").pop()

			if( this.selectedCopy.image !== filename && this.selectedCopy.image ){
				this.$store.dispatch("removeFile",{directory:this.directory,file:this.selectedCopy.image})
			}

			let data = {path:this.directory, name:filename, data:img }
			this.$store.dispatch("postFile", data)
					.then( ret=>{ if( ret.ok ){
						this.imageModal = false
						this.imageTimestamp = Date.now()
						this.editField(this.selectedItem,"image",filename)
					}})
		},
		removeImage(event){
			this.$store.dispatch("removeFile", { directory:this.directory, file: this.selectedItem.image } )
				.then( ret=>{ if(ret.ok) this.editField(this.selectedItem,"image","") })
		},

		fetchFileContent(){
			this.htmlFileContent = ""
			fetch(this.storePath+this.directory+"/content.html")
				.then( ret => ret.text() )
				.then(html=>{
					this.htmlFileContent = html
				})
		},
		changeFileContent(){
			let data = { path:this.directory, name:"content.html", data:this.htmlFileContent }
			this.$store.dispatch("postFile",data)
				.then(ret=>{ if(ret && re.ok){
					this.fileModal = false
				}})
		},


		/* Collections Services */

		fetchCollections(){
			this.isBusy = this.selectedCollections.length
			this.items = []

			for( let collection of this.selectedCollections ){
				this.$store.dispatch("getCollection", {collectionPath:this.storePath+collection}).then( ret=> {
					ret.map(row=>{
						row['.collection'] = collection;
						row.categories = row.categories ? row.categories.split(",") : []
						return row })
					this.items = this.items.concat(ret)
					this.isBusy--
					if(!this.isBussy) this.selectItem( this.selectedItem )
				})
			}

		},
		fetchCategories(){
			if(!this.categories) return
			this.categories = []
			let path = this.storePath+this.collections[0].split("_").shift()+"Categories"
			this.$store.dispatch("getCollection", {collectionPath: path} ).then(ret=>{
				for( let cat of ret) {
					this.categories.push({value:cat.id, text:cat.title})
					//this.categories = ret // TypeError: Cannot read property 'some' of undefined ?!??!
				}

			})
		},
		changeItemCollection(){
			let newCollection = this.selectedCopy['.collection']
			let oldCollection = this.selectedItem[".collection"]
			let oldCollectionDir = oldCollection+"/"+this.selectedCopy.id

			newCollectionDir     = newCollection +"/"+this.selectedCopy.id
			this.selectedCopy[".collection"] = newCollection


			this.$store.dispatch("moveFile", {from:oldCollectionDir,to:newCollectionDir})
				.then( ret=>{ if(ret.ok) {
					this.deleteItem()
					this.newItem()
				}})
		},
		initNewItem(){
			let d = new Date()
			this.selectedCopy = {
				date: d.toISOString().slice(0,10),
				categories: ""
			}
		},
		newItem(event){
			if( !this.checkRequired( this.selectedCopy ) ){
				if(event) event.preventDefault();
				return
			}

			let data = {collection: this.selectedCopy[".collection"], items: this.items, data: this.selectedCopy}
			this.$store.dispatch("postInsertItem",data)
				.then( ret=>{ if(ret && ret.ok){
					this.newModal = false; this.selectItem( ret.id )
				}})
		},
		editItem(event){
			if( !this.checkRequired( this.selectedCopy ) ) {
				event.preventDefault()
				return
			}

			let data = { collection: this.selectedCopy[".collection"], item: this.selectedItem, data:this.selectedCopy }
			this.$store.dispatch("postUpdateItem",data)
				.then( ret=> { if(ret && ret.ok){
					this.editModal = false
					this.selectItem( this.selectedItem ) // force refresh if field was not existing
				}})
		},
		editField(row,field,value){
			let data = {collection: this.selectedItem[".collection"],item:row,data:{[field]:value}}
			this.$store.dispatch("postUpdateItem", data).then(ret=>{ this.selectItem(row) /*force refresh*/})
		},
		deleteItem(cb){
			let data = {collection: this.selectedItem[".collection"],items:this.items,item:this.selectedCopy}
			let dataDir = { directory: this.directory }
			this.$store.dispatch("removeItem",data)
				.then( ret => { if(ret && ret.ok)
					this.$store.dispatch("removeDirectory",dataDir)
						.then( ret=>{
							if(ret && ret.ok ) this.deleteModal = false;
							//if( cb ) cb()
						})
				})
		}
	}, // Methods
	mounted(){

	}
}
</script>


<style scoped>
td .btn { width:40px }
</style>
