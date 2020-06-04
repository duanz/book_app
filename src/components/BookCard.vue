<template>
  <div>
    <b-card v-if="show" :title="book.title" :sub-title="book.author" class="overflow-hidden">
      <b-card-text class="book-desc">{{book.desc}}</b-card-text>
      <span href="javascript:;" class="card-link" style="color:#ff6a00;">
        <b-icon icon="heart-fill" style="color:red;" class="mr-1"></b-icon>90
      </span>
      <b-link
        v-if="!book.subscribe_id"
        href="javascript:;"
        class="card-link"
        style="float:right;"
        @click="do_book_subscribe()"
      >订阅</b-link>
      <b-link
        v-if="book.subscribe_id"
        href="javascript:;"
        class="card-link"
        style="float:right;"
        @click="do_book_subscribe()"
      >取消订阅</b-link>
    </b-card>
  </div>
</template>
<script>
import { deleteBookSubscribe } from "../api/bookApi";
export default {
  name: "bookCard",
  props: {
    book: {
      type: Object,
      default() {
        return {
          id: 1,
          title: "这是书名",
          cover: "https://picsum.photos/400/400/?image=20",
          author: "作者名",
          desc:
            "作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介，作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介"
        };
      }
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    do_book_subscribe: function() {
      if (this.book.subscribe_id) {
        if (!confirm("确定要取消该订阅吗？")) {
          return;
        }
        deleteBookSubscribe(this.book.subscribe_id).then(res => {
          console.log(res);
          this.book.subscribe_id = 0;
          this.show = false;

          this.$bvToast.toast("成功取消《"+this.book.title+"》的订阅", {
            title: "操作提示",
            autoHideDelay: 3000,
            headerClass:"text-success",
            bodyClass:"text-info",
            appendToast: true
          });
        });
      } else {
        if (!this.$store.state.auth) {
          this.$router.push({
            path: "/login",
            query: { redirect: this.$route.path }
          });
        }
        this.$store.commit("addSubscribeBook", this.book);
      }
    }
  }
};
</script>
<style scoped>
.book-desc {
  padding: 0 0 0 0;
  text-indent: 2em;
  width: auto;
  margin-top: 12px;
  float: right;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #999999;
  line-height: 25px;
  letter-spacing: 1px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>