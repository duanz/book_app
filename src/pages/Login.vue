<template>
  <b-container style="width:60%;margin-top:20%;">
      <b-form @submit.stop.prevent>
    <b-row>
          <label for="text-password">用户名</label>
          <b-input type="text" id="text-username" v-model="form.username"></b-input>
    </b-row>
    <b-row>
          <label for="text-password">密码</label>
          <b-input type="password" id="text-password" v-model="form.password"></b-input>
    </b-row>
    <b-row class="mt-2">
        <b-link to="/register" class="mr-5">注册</b-link>
        <b-link href="javascript:;" @click="dologin" class="mr-5">登录</b-link>
        <!-- <b-button @click="dologin">登录</b-button> -->
    </b-row>
      </b-form>
  </b-container>
</template>

<script>
import { login } from "@/api/memberApi";
export default {
  name: "login",
  computed: {
    state() {
      return this.name.length >= 4 ? true : false;
    },
    invalidFeedback() {
      if (this.name.length > 4) {
        return "";
      } else if (this.name.length > 0) {
        return "Enter at least 4 characters";
      } else {
        return "Please enter something";
      }
    },
    validFeedback() {
      return this.state === true ? "Thank you" : "";
    }
  },
  data() {
    return {
      redirect: this.$route.query.redirect||'/',
      form: { username: "", password: "" },
    };
  },
  methods:{
    dologin: function(){
      login(this, this.form);
    }
  }
};
</script>
