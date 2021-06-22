
<template>
  <div>
    <div class="modal"
         id="projectCreationModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              CREATE A PROJECT
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createProject">
              <div class="form-group">
                <label for="title">Name of Project</label>
                <input type="text"
                       class="form-control"
                       id="title"
                       placeholder="Title..."
                       minlength="1"
                       maxlength="500"
                       v-model="state.newProject.title"
                       required
                >
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text"
                          class="form-control inputheight"
                          id="description"
                          placeholder="Description..."
                          minlength="1"
                          maxlength="1000"
                          v-model="state.newProject.description"
                          required
                >
                </textarea>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                  Dismiss
                </button>
                <button type="submit" class="btn btn-primary">
                  Create
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
import { reactive } from 'vue'
import { projectsService } from '../services/ProjectsService'
import $ from 'jquery'
// import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  name: 'ProjectCreationModal',
  setup() {
    const state = reactive({
      newProject: {}
      // account: computed(() => AppState.account)
    })
    return {
      state,
      async createProject() {
        try {
          await projectsService.createProject(state.newProject)
          state.newProject = {}
          $('#projectCreationModal').modal('hide')
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
