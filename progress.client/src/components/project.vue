<template>
  <router-link :to="{name: 'ProjectDetailsPage', params: {id: project.id}}">
    <div class="row tan rounded hoverable my-2" @click="makeProjectActive(project)">
      <div class="col-12 d-flex justify-content-between">
        <div>
          <h3> {{ project.title }} <span v-if="project.favorite==true"><i class="far fa-star"></i></span></h3>
          <span v-if="project.favorite==true"><i class="far fa-star"></i></span>
        </div>
        <div>
          {{ Date(project.updatedAt).split(' ')[0] }},
          {{ Date(project.updatedAt).split(' ')[1] }} /
          {{ Date(project.updatedAt).split(' ')[2] }} /
          {{ Date(project.updatedAt).split(' ')[3] }}
        </div>
      </div>
      <div class="col-12">
        <h5> {{ project.description }}</h5>
      </div>
    </div>
  </router-link>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
export default {
  name: 'Project',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteProject(id) {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this project?', 'You won\'t be able to revert this.', '', 'Yes, Delete')) {
            await projectsService.deleteProject(id)
            Notification.toast('Successfully Deleted Project', 'success')
          }
        } catch (error) {
          logger.error(error)
        }
      },
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

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-project .nav-link.router-link-exact-active{
  color: var(--primary);
}

.lightgrey{
  background-color: rgba(236, 236, 236, 0.315);
}
@media screen and (min-width:760px){
  .userbuttons{
justify-content: space-around;
  }
}
.tan{
  background-color: rgb(255, 241, 224);
}
.tan:hover{
background-color: rgb(255, 188, 157);
}
</style>
