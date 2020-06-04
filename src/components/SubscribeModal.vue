<template>
  <div>
    <b-modal
      id="subscribe_modal"
      ref="modal"
      title="订阅设置"
      sub-title="订阅设置"
      v-model="showModal"
      ok-title="保存"
      cancel-title="取消"
      @hidden="resetModal"
      @ok="do_book_subscribe"
    >
    <p class="text-info">即将订阅 {{this.$store.state.subscribeBook.title}}</p>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="每次最少更新章节数量"
          label-for="chapterNum"
          invalid-feedback="每次最少更新章节数量必须填写"
        >
          <b-form-input
            id="chapterNum"
            v-model="subscribeForm.chapterNum"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {
  createBookSubscribe
} from "../api/bookApi";
export default {
  name: "subscribeModal",
  data() {
    return {
        subscribeForm:{
            chapterNum:1,
            book_id:this.$store.state.subscribeBook.id
        },
        showModal:this.$store.state.subscribeBook != {}
    };
  },
  methods: {
    resetModal() {
      this.subscribeForm.chapterNum = 1;
      this.$store.commit('addSubscribeBook', {});
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    do_book_subscribe: function() {
        createBookSubscribe(this.subscribeForm).then(res => {
          console.log(res);
          let book = this.$store.state.subscribeBook;
          book.subscribe_id = res.id
          this.$store.commit('addSubscribeBook', book);
          
          this.$bvToast.toast("成功添加《"+book.title+"》的订阅", {
            title: "操作提示",
            autoHideDelay: 3000,
            appendToast: true
          });
        });
      
    }
  }
};
</script>

<style>
</style>