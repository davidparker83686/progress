<template>
  <!-- Start of accordian menue -->
  <div class="accordion" id="accordionExample">
    <div class="row card shadow mb-2 mx-0 mx-md-1 project">
      <div class="px-2 px-md-3 lightgrey " id="headingOne">
        <div class="mb-0">
          <button class="btn btn-link btn-block shadow-none text-left px-0"
                  style="text-decoration: none;"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapseOne'+project.id"
                  aria-expanded="true"
                  aria-controls="collapseOne"
          >
            <div class="justify-content-between d-flex">
              <div>
                <span>
                  <h2 class="d-inline">{{ project.title.toUpperCase() }} -</h2>
                  <h4 class="available d-inline" v-if="project.availability == true">
                    Available
                  </h4><h4 class="not-available d-inline" v-if="project.availability == false">
                    Not Available
                  </h4>
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div :id="'collapseOne'+project.id" class="collapse col-12 show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class=" row justify-content-between">
          <div class="col-12 col-md-3 mt-2">
            <img class="img-fluid rounded" :src="project.picture" alt="Project Picture" v-if="project.picture">
          </div>
          <div class="col-12 col-md-9 mt-2">
            <h5><b>{{ project.title.toUpperCase() }}</b></h5>
            <span class=" col-12 col-md-9">
              {{ project.description }}
            </span>
          </div>
          <div class="buttons col-12 mb-2 text-right pt-3 pt-md-0 userbuttons">
            <button v-if="state.account.id === project.creatorId" type="button" class="btn btn-outline-danger" @click.prevent="deleteProject(project.id)">
              Delete
            </button>
            <button v-if="state.account.id === project.creatorId"
                    type="button"
                    class="mx-1 btn btn-outline-primary "
                    data-toggle="modal"
                    :data-target="'#projectEditModal' + project.id"
                    @click="assignActiveProject(project)"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
    <project-edit-modal :project-prop="project" />
  </div>
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
      async toggleAvailability(project) {
        try {
          await projectsService.toggleAvailability(project)
          Notification.toast('Successfully Toggled Availability', 'success')
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
.available {
  color: var(--success)
}
.not-available {
  color: var(--danger)
}
.lightgrey{
  background-color: rgba(236, 236, 236, 0.315);
}
@media screen and (min-width:760px){
  .userbuttons{
justify-content: space-around;
  }
}
</style>
