<template>
  <div class="container-fluid border-top grouppage">
    <div class="row">
      <div class="col-12">
        <h3>MY GROUPING</h3>
        <h5>Track all your groups.</h5>
      </div>
      <div class="col-12">
        <Group v-for="group in state.groups" :key="group.id" :group="group" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
import { groupsService } from '../services/GroupsService'
export default {
  name: 'GroupPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      projects: computed(() => AppState.projects),
      groups: computed(() => AppState.groups),
      activeProjects: computed(() => AppState.activeProjects),
      activeGroups: computed(() => AppState.activeGroups),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        // await reviewsService.getReviewsByUserId(route.params.id)
        await projectsService.getProjectsByUserId(route.params.id)
        await groupsService.getGroupsByUserId(route.params.id)
      } catch (error) {
        console.error(error)
      }
    })
    return {
      state,
      route,
      async makeGroupActive(group) {
        try {
          await groupsService.makeGroupActive(group)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.star{
  color:yellow
}
.review-scroll{
    overflow-y: scroll;
          overflow-x: hidden;
    // overflow-:auto;
    // flex-wrap: nowrap;
    max-height: 25vw;// display: inline-block;
}
@media screen and (max-width:760px){
  .review-scroll{
    overflow-y: scroll;
    max-height: 45vw;// display: inline-block;
      overflow-x: hidden;
  }
}
.lightgrey{
  background-color: rgba(236, 236, 236, 0.315);
}
</style>
