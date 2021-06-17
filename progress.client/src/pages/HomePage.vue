<template>
  <div class="container-fluid border-top">
    <div class="row ">
      <router-link style="text-decoration: none;" :to="{name: 'ProjectPage', params: {id: state.account.id}}">
        <div type="button" class="col-12 ml-md-5 my-5 hovertext">
          <h2>
            PROJECTS
          </h2>
          <h5>
            TRACK PROGRESS ON ALL YOUR PROJECTS
          </h5>
        </div>
      </router-link>
    </div>
    <div class="row ">
      <router-link style="text-decoration: none;" :to="{name: 'GroupPage', params: {id: state.account.id}}">
        <div type="button" class="col-12 ml-md-5 hovertext">
          <h2>
            MY GROUPS
          </h2>
          <h5>
            COMPILE PROJECTS INTO COLLECTIONS, GROUPINGS , ETC
          </h5>
        </div>
      </router-link>
    </div>
    <div class="row ">
      <router-link style="text-decoration: none;" :to="{name: 'ProfilePage', params: {id: state.account.id}}">
        <div type="button" class="col-12 my-5 ml-md-5 hovertext">
          <h2>
            MY ACCOUNT
          </h2>
          <h5>
            VIEW AND EDIT ACCOUNT INFO
          </h5>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      state,
      route
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.hovertext{
  color: var(--primary)
}
.hovertext:hover{
  color:rgb(0, 195, 255);
  // text-decoration: none;
}
</style>
