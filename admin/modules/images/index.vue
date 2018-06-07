<template>
	<div class="pt-3 pb-2 mb-3 border-bottom">
      
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 _border-bottom">
        <h2 class="h2">Images</h2>
      
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button class="btn btn-sm btn-outline-secondary" data-toggle="modal" @click="newData={}" data-target="#newModal">New</button>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Alt</th>
              <th>Source</th>
              <th style="text-align:right"> <a href="#" @click.prevent="fetchData()"> <i data-feather="refresh-ccw"></i> </a> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of items">
              <td>{{ item.id }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.alt }}</td>
              <td>
                <a :title="item.src" href="#" @click="select(index+1,item)" data-toggle="modal" data-target="#viewModal">
                  <span data-feather="eye"></span> {{ item.src.slice(0,50) }}... 
                </a>
              </td>
              <td align="right" style="white-space:nowrap">
                <button class="btn btn-outline-secondary btn-xs" @click="editData=item" data-toggle="modal" data-target="#editModal">Edit</button>
                <button class="btn btn-outline-secondary btn-xs" @click="deleteData=item" data-toggle="modal" data-target="#deleteModal">Del</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <!-- Modal view -->
      <div class="modal" id="viewModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ viewData.id }}. {{ viewData.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div style="background:#000;">
              <img :src="viewData.src" width="100%">
            </div>
            <div class="modal-footer">
              <button _click="viewData={}" type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal new -->
      <div class="modal fade" id="newModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <form @submit.prevent="submitNew()">
            <div class="modal-header">
              <h5 class="modal-title">New </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <div class="form-group"> <label>Title </label> <textarea class="form-control" v-model="newData.title"></textarea> </div>
              <div class="form-group"> <label>Alt </label> <input class="form-control" v-model="newData.alt"> </div>
              <div class="form-group"> <label>Source</label> <textarea class="form-control" v-model="newData.src" rows="4"></textarea>   </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
              <button class="btn btn-primary">Save</button>
            </div>
          </form>
          </div>
        </div>
      </div>

      <!-- Modal edit -->
      <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <form @submit.prevent="submitEdit()">
            <div class="modal-header">
              <h5 class="modal-title">Edit video file </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <div class="form-group"> <label>ID:    </label> <b>{{ editData.id }}</b> </div>
              <div class="form-group"> <label>Title </label> <textarea class="form-control" v-model="editData.title"></textarea> </div>
              <div class="form-group"> <label>Alt </label> <input class="form-control" v-model="editData.alt"> </div>
              <div class="form-group"> <label>Source</label> <textarea class="form-control" v-model="editData.src" rows="4"></textarea>  </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
              <button class="btn btn-primary">Save</button>
            </div>
          </form>
          </div>
        </div>
      </div>

      <!-- Modal delete -->
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <form @submit.prevent="submitDelete()">
            <div class="modal-header">
              <h5 class="modal-title text-danger">Delete video file ?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <div class="form-group"> <label>ID:    </label> <b> {{ deleteData.id }}    </b> </div>
              <div class="form-group"> <label>Alt:   </label> <b> {{ deleteData.alt }}   </b> </div>
              <div class="form-group"> <label>Title: </label> <b> {{ deleteData.title }} </b> </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">No</button>
              <button class="btn btn-danger">YES Delete</button>
            </div>
          </form>
          </div>
        </div>
      </div>

 </div>
</template>

                   


<script>
module.exports = {
  data(){ return{
    items: [],
    viewData: {},
    newData: {},
    editData: {},
    deleteData: {}
  }},
  created(){
    this.fetchData()
  },
  updated(){
    feather.replace(),
    $("#viewModal").on('hide.bs.modal',(e)=>{ this.viewData = {} })
  },
  methods:{
    fetchData(){
      progress.start()
      this.$store.dispatch("getCollection",{collection:"images"}).then(ret=>{
        this.items = ret.reverse()
        progress.stop()
      })
    },
    select(index,item){
      this.viewData = item
      this.viewData.index = index
    },
    submitNew(){
      $("#newModal").modal('hide')
      //alert( JSON.stringify( this.newData ))
    },
    submitEdit(){
      $("#editModal").modal('hide')
    },
    submitDelet(){
      $("#deleteModal").modal('hide')
    }
  }
}
</script>