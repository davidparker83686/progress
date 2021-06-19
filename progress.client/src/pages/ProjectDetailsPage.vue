<template>
  <div class="container-fluid border-top projectDetailsPage">
    <!-- title and date and edit/delete button -->
    <div class="row justify-content-between">
      <div>
        <h2>{{ state.activeProject.title }}</h2>
        <br>
        <div>
          {{ Date(state.activeProject.updatedAt).split(' ')[0] }},
          {{ Date(state.activeProject.updatedAt).split(' ')[1] }} /
          {{ Date(state.activeProject.updatedAt).split(' ')[2] }} /
          {{ Date(state.activeProject.updatedAt).split(' ')[3] }}
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-primary" title="DELETE PROJECT" aria="" @click="deleteProject(project)">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button type="button"
                class="btn btn-primary"
                title="EDIT PROJECT"
                aria=""
                data-toggle="modal"
                :data-target="'#projectEditModal' + state.activeProject.id"
        >
          <i class="fas fa-edit"></i>
        </button>
      </div>
    </div>
    <!-- description and ADD COMMENT -->
    <div class="row justify-content-between">
      <div class="col-8">
        <h5>{{ state.activeProject.description }}</h5>
      </div>
      <div class="col-3">
        <button type="button"
                class="btn btn-primary"
                title="ADD COMMENT"
                aria=""
                data-toggle="modal"
                :data-target="'#commentCreationModal' + state.activeProject.id"
        >
          ADD COMMENT
        </button>
      </div>
    </div>
    <!-- v-for comments-->
    <div class="row scroll">
      <div class="col-12">
        <Comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { projectsService } from '../services/ProjectsService'
import { groupsService } from '../services/GroupsService'
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router'
// import { tasksService } from "../services/TasksService"
export default {
  name: 'ProjectDetailsPage',
  // props: {
  //   comment: {
  //     type: Object,
  //     required: true
  //   },
  //   project: {
  //     type: Object,
  //     required: true
  //   }
  // },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      projects: computed(() => AppState.projects),
      activeProject: computed(() => AppState.activeProject),
      comments: computed(() => AppState.comments),
      activeComment: computed(() => AppState.activeComment),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await projectsService.getActiveProject(route.params.id)
        await commentsService.getCommentsByUserProject(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async deleteProject() {
        try {
          await projectsService.deleteProject(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      // async editProject() {
      //   try {
      //     await projectsService.editProject(route.params.id)
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // },
      async addToGroup() {
        try {
          await groupsService.addToGroup(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      }
      // async createComment() {
      //   try {
      //     await commentsService.createComment(route.params.id)
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // }
    }
  }
}
</script>

<style lang="scss">
.hover:hover{
background-color: peachpuff;
}
.scroll{
    overflow-y: scroll;
    // overflow-:auto;
    // flex-wrap: nowrap;
    max-height: 33vw;// display: inline-block;
}
@media screen and (max-width:760px){
  .scroll{
    overflow-y: scroll;
    max-height: 75vw;// display: inline-block;
  }
}
</style>
