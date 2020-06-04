<template>
  <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">我的订阅</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <books dataType="subscribe"></books>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>
<script>
import Books from "@/pages/Books.vue";
export default {
  name: "Subscribe",
  components: {
    Books
  },
  props:{
    search:{type: Object, default(){}}
  },
  data() {
    return {};
  }
};
</script>