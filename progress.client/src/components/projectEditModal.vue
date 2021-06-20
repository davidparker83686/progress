<template>
  <div>
    <div class="modal "
         id="projectEditModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <!-- :id="'exampleModal'+project.id" -->
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              EDIT YOUR PROJECT
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createReview">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text"
                       class="form-control"
                       id="title"
                       :placeholder="activeProject.title"
                       minlength="3"
                       maxlength="40"
                       v-model="state.editedProject.title"
                >
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text"
                          class="form-control inputheight"
                          id="description"
                          :placeholder="activeProject.description"
                          minlength="3"
                          maxlength="2000"
                          v-model="state.editedProject.description"
                >
                </textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                  Dismiss
                </button>
                <button type="submit" class="btn btn-primary" @click="editProject()">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { projectsService } from '../services/ProjectsService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
// import $ from 'jquery'
export default {
  name: 'ProjectEditModal',
  props: {
    projectProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      editedProject: {}
    })
    onMounted(async() => {
      try {
        await projectsService.getActiveProject(route.params.id)
      } catch (error) {
        console.error(error)
      }
    })
    return {
      state,
      async editProject() {
        try {
          await projectsService.editProject(state.editedProject)
          state.editedProject = {}
          '#projectEditModal'.modal('hide')
          Notification.toast('Successfully Edited Project', 'success')
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped>
.inputheight{
  height: 200px;
  }
</style>
