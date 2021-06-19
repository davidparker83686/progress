<template>
  <div class="row white rounded hoverable my-2" @click="makeCommentActive(comment)">
    <div class="col-12 d-flex justify-content-between">
      <div>
        <h3> {{ comment.title }}</h3>
      </div>
      <div>
        <button type="button" class="btn btn-primary" title="DELETE COMMENT" aria="" @click="deleteComment(comment)">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button type="button"
                class="btn btn-primary"
                title="EDIT COMMENT"
                aria=""
                data-toggle="modal"
                :data-target="'#commenttEditModal' + comment.id"
        >
          <i class="fas fa-edit"></i>
        </button>
      </div>
    </div>
    <div class="col-12" v-if="comment.description">
      <h5> {{ comment.description }}</h5>
    </div>
    <div class="col-12" v-if="comment.image">
      {{ comment.image }}
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      comments: computed(() => AppState.comments),
      activeComments: computed(() => AppState.activeComment),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteComment(comment) {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this comment?', 'You won\'t be able to revert this.', '', 'Yes, Delete')) {
            await commentsService.deleteComment(comment)
            Notification.toast('Successfully Deleted Comment', 'success')
          }
        } catch (error) {
          logger.error(error)
        }
      },
      async makeCommentActive(comment) {
        try {
          await commentsService.makeCommentActive(comment)
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
.white{
  background-color: rgb(255, 255, 255);
}
.white:hover{
background-color: rgb(230, 230, 230);
}
</style>
