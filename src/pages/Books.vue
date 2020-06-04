<template>
  <div>
    <subscribe-modal v-if="$store.state.subscribeBook.id"></subscribe-modal>

    <div v-if="loading" class="text-center justify-content-between">
      <b-spinner v-for="variant in variants" :variant="variant" :key="variant" type="grow"></b-spinner>
    </div>
    <b-row v-if="books">
      <b-col lg="3" md="4" sm="12" class="mb-2" v-for="(book, idx) in books" :key="idx">
        <book-card :book="book"></book-card>
      </b-col>
    </b-row>
    <div v-if="books.length==0 && !loading" class="text-center text-danager">暂无数据</div>
  </div>
</template>
<script>
import {
  getBookList,
  getBookStateList,
  getBookSubscribeList
  // createBookSubscribe,
  // deleteBookSubscribe
} from "../api/bookApi";
import qs from "qs";
import BookCard from "@/components/BookCard.vue";
import SubscribeModal from "@/components/SubscribeModal.vue";
export default {
  name: "books",
  components: {
    BookCard,
    SubscribeModal
  },
  props: {
    dataType: { type: String, default: "newbook" },
    query: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      variants: [
        "primary",
        "secondary",
        "danger",
        "warning",
        "success",
        "info",
        "dark"
      ],
      loading: true,
      books: [],
      pageinfo: {
        next: "",
        previous: "",
        count: 0,
        current: 0
      },
      filter: {}
    };
  },
  methods: {
    toPage: function(to) {
      if (to === "next") {
        this.$data.filter = qs.parse(this.$data.pageinfo.next);
      } else if (to === "previous") {
        this.$data.filter = qs.parse(this.$data.pageinfo.previous);
      }
      if (!this.$data.filter) {
        alert("这是最后一页了");
        return;
      }
      this.get_book_list();
    },
    set_page_info: function(res) {
      this.$data.pageinfo.count = res.count;
      this.$data.pageinfo.next = res.next ? res.next.split("?")[1] : "";
      this.$data.pageinfo.previous = res.previous
        ? res.previous.split("?")[1]
        : "";
      if (this.$data.pageinfo.next) {
        let data = qs.parse(this.$data.pageinfo.next);
        this.$data.pageinfo.current = parseInt(data["offset"]);
      } else {
        this.$data.pageinfo.current = this.$data.pageinfo.count;
      }
    },
    get_book_list: function() {
      const self = this;
      self.loading = true;
      getBookList(self.$data.filter).then(res => {
        self.set_page_info(res);

        self.$data.books = [];

        res.results.forEach(book => {
          self.$data.books.push(book);
        });
        self.loading = false;
      });
    },
    get_book_state_list: function() {
      const self = this;
      self.loading = true;
      self.$data.books = [];
      getBookStateList(self.$data.filter).then(res => {
        self.set_page_info(res);
        res.results.forEach(book => {
          self.$data.books.push(book);
        });
        self.loading = false;
      });
    },
    get_subscribe_list: function() {
      let self = this;
      self.loading = true;
      getBookSubscribeList({}).then(res => {
        self.set_page_info(res);

        this.$data.books = [];

        res.results.forEach(book => {
          self.$data.books.push(book);
        });
        self.loading = false;
      });
    },
    first: function() {
      console.log(123);
      if (this.dataType == "searchbook") {
        this.$data.filter = { title__icontains: this.query };
        console.log(this.filter);
        this.get_book_list();
      } else if (this.dataType == "newbook") {
        this.$data.filter = { state_type: "new" };
        this.get_book_state_list();
      } else if (this.dataType == "subscribe") {
        this.get_subscribe_list();
      } else if (this.dataType == "hotsubscribe") {
        this.$data.filter = { state_type: "subscribe" };
        this.get_book_state_list();
      }
    }
  },
  mounted: function() {
    this.first();
  },
  watch: {
    query: function(newVal, oldVal) {
      console.log(newVal + "..." + oldVal);
      this.first();
    }
  }
};
</script>