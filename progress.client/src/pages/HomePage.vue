<template>
  <div class="container-fluid border-top">
    <div class="row ">
      <router-link style="color: inherit;" :to="{name: 'ProjectPage', params: {id: result.creatorId}}">
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
      <router-link style="color: inherit;" :to="{name: 'GroupPage', params: {id: result.creatorId}}">
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
      <router-link style="color: inherit;" :to="{name: 'ProfilePage', params: {id: result.creatorId}}">
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
export default {
  name: 'Home'
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
  color:rgb(0, 195, 255)
}
</style>
