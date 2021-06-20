<template>
  <div class="container-fluid border-top projectpage">
    <div class="row">
      <!-- title -->
      <div class="col-12  my-3 ml-md-5 d-flex ">
        <h3>MY PROJECTS</h3>
        <button type="button"
                class="mx-3 btn btn-none text-primary btn-outline-primary"
                data-toggle="modal"
                data-target="#projectCreationModal"
                title="CREATE PROJECT"
                aria="CREATE PROJECT"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <!-- description -->
      <div class="col-12  ml-md-5">
        <h5>Track all your projects. Adding progress to your projects and assinging them to group or leave them solo. </h5>
      </div>
      <!-- v-for projects -->
      <div class="col-12 my-3 ml-md-5">
        hi
        <Project v-for="project in state.projects" :key="project.id" :project="project" />
      </div>
    </div>
    <project-creation-modal />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
import { groupsService } from '../services/GroupsService'
export default {
  name: 'ProjectPage',
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
      async makeProjectActive(project) {
        try {
          await projectsService.makeProjectActive(project)
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
