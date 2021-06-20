<template>
  <div>
    <div class="modal "
         :id="'commentEditModal'+ commentProp.id"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <!-- :id="'exampleModal'+comment.id" -->
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              EDIT YOUR COMMENT
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createReview">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text"
                       class="form-control"
                       id="title"
                       placeholder="Title..."
                       minlength="0"
                       maxlength="40"
                       v-model="state.editedComment.title"
                >
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text"
                          class="form-control inputheight"
                          id="description"
                          placeholder="Description..."
                          minlength="3"
                          maxlength="2000"
                          v-model="state.editedComment.description"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input type="text"
                       class="form-control"
                       id="image"
                       placeholder="Image..."
                       minlength="3"
                       maxlength="5000"
                       v-model="state.editedComment.image"
                >
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                  Dismiss
                </button>
                <button type="submit" class="btn btn-primary" @click="editComment()">
                  Save
                </button>
                <!-- <button type="submit" class="btn btn-primary">
                  Create
                </button> -->
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
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'CommentEditModal',
  props: {
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      editedComment: {}
    })
    return {
      state,
      async editComment() {
        try {
          await commentsService.editComment(state.editedComment)
          state.editedComment = {}
          $('#commentEditModal' + props.commentProp.id).modal('hide')
          Notification.toast('Successfully Edited Comment', 'success')
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
