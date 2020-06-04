<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" fixed="top">
      <b-navbar-brand @click="backtop">ikaka.club</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="(item, index) in items"
            :key="index"
            @click="topage(item.name)"
            :active="activeitem==item.name"
          >{{item.nickname}}</b-nav-item>

          <!-- <b-nav-item to="/">首页</b-nav-item>
          <b-nav-item to="/subscribe">订阅</b-nav-item>
          <b-nav-item to="/help">帮助</b-nav-item>-->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input v-model="search.title" size="sm" class="mr-sm-2" placeholder="书名"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" @click="dosearch()">搜索</b-button>
          </b-nav-form>-->

          <b-nav-item-dropdown :text="$store.state.auth?$store.state.userinfo.username:'用户'" right>
            <b-dropdown-item v-if="$store.state.auth" href="#">设置</b-dropdown-item>
            <b-dropdown-item @click="dologin">{{$store.state.auth?'退出':'登录'}}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { logout } from "@/api/memberApi";
export default {
  data() {
    return {
      search: { title: "" },
      items: [
        { name: "home", path: "/", nickname: "首页" },
        { name: "subscribe", path: "/subscribe", nickname: "订阅" },
        { name: "search", path: "/search", nickname: "搜索" },
        { name: "help", path: "/help", nickname: "帮助" }
      ],
      activeitem: this.$route.name
    };
  },
  methods: {
    dologin: function() {
      if (this.$store.state.auth) {
        logout(this);
      } else {
        this.$router.push({ name: "login" });
      }
    },
    topage: function(name) {
      this.activeitem = name;
      this.$router.push({ name: name });
    },
    // dosearch() {
    //   console.log(11);
    //   this.$router.push({ name: "search", params: { search: this.search } });
    // },
    backtop: function() {
      var timer = setInterval(function() {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
    }
  }
};
</script>