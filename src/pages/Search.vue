<template>
  <div role="conatiner">
    <div :class="!search_title?'margin-top':'margin-bottom'">
      <b-row>
        <b-col sm="12" md="3"></b-col>
        <b-col sm="12" md="6">
          <b-input-group prepend="书名" class="mt-3">
            <b-form-input v-model="title"></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-success" @click="dosearch">搜索</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col md="3"></b-col>
      </b-row>
    </div>
    <b-card v-if="search_title" no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">搜索结果</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <books data-type="searchbook" :query="search_title"></books>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>
<script>
import Books from "@/pages/Books.vue";
export default {
  name: "serach",
  components: {
    Books
  },
  data() {
    return {
      title: "",
      search_title: ""
    };
  },
  methods: {
    dosearch: function() {
      this.search_title = this.title;
    }
  }
};
</script>
<style scoped>
.margin-top {
  margin-top: 15%;
  /* width: 35%; */
}
.margin-bottom {
  margin-bottom: 2%;
  /* width: 35%; */
}
</style>