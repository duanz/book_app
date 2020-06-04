<template>
  <div>
    <h3 class="mt-5">新用户注册</h3>
    <b-row>
      <b-col md="6">
        <b-form-group
          label="用户名"
          label-for="username"
          :invalid-feedback="validation.username.invalidFeedback"
          :valid-feedback="validateForm()"
        >
          <b-form-input
            id="username"
            placeholder="你将会使用该项登录本网站"
            v-model="user.username"
            :state="validation.username.valid"
            trim
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="6"></b-col>
      <b-col md="6">
        <b-form-group
          label="kindle接收邮箱"
          label-for="kindle"
          :invalid-feedback="validation.email.invalidFeedback"
          :valid-feedback="validateForm()"
        >
          <b-form-input
            id="email"
            placeholder="书籍将发送到该邮箱"
            v-model="user.email"
            :state="validation.email.valid"
            trim
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="确认邮箱"
          label-for="email_re"
          :invalid-feedback="validation.email_re.invalidFeedback"
          :valid-feedback="validateForm()"
        >
          <b-form-input
            id="email_re"
            placeholder="确认邮箱"
            v-model="user.email_re"
            :state="validation.email_re.valid"
            trim
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="密码"
          label-for="password"
          :invalid-feedback="validation.password.invalidFeedback"
          :valid-feedback="validateForm()"
        >
          <b-form-input
            id="password"
            placeholder="你将会使用该项登录本网站"
            v-model="user.password"
            :state="validation.password.valid"
            trim
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="确认密码"
          label-for="password_re"
          :invalid-feedback="validation.password_re.invalidFeedback"
          :valid-feedback="validateForm()"
        >
          <b-form-input
            id="password_re"
            placeholder="确认密码"
            v-model="user.password_re"
            :state="validation.password_re.valid"
            trim
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-button class="fr" variant="outline-success" @click="submitForm()">
      <b-icon icon="box-arrow-in-up-left"></b-icon>注册
      <b-icon icon="box-arrow-in-up-right"></b-icon>
    </b-button>
  </div>
</template>

<script>
// import Vue from "vue";
import { register } from "../api/memberApi";
export default {
  name: "Register",
  data() {
    return {
      errmsg: [],
      checkform: true,
      toastText: "操作成功",
      toastShow: false,
      user: {
        username: "test1",
        password: "123456",
        password_re: "123456",
        email: "test1@test.com",
        email_re: "test1@test.com"
      },
      validation: {
        username: {
          valid: null,
          validated: false
        },
        email: {
          valid: null,
          validated: false
        },
        email_re: {
          valid: null,
          validated: false
        },
        password: {
          valid: null,
          validated: false,
          invalidFeedback: ""
        },
        password_re: {
          valid: null,
          validated: false,
          invalidFeedback: ""
        }
      }
    };
  },
  methods: {
    makeToast: function(msg = "", append = false) {
      this.$bvToast.toast(msg, {
        title: "操作提示",
        autoHideDelay: 5000,
        appendToast: append
      });
    },
    submitForm: function() {
      let self = this;
      self.checkform = true;
      Object.keys(this.$data.validation).forEach(key => {
        if (!this.$data.validation[key].valid) {
          return;
        }
      });
      register(self.$data.user).then(res => {
        if (res.code && res.code != "200") {
          self.$data.errmsg = [];
          self.checkform = false;

          self.makeToast("Oops ! 你的注册失败了，请重试.");

          Object.keys(res.data).forEach(key => {
            let newVal = {
              valid: false,
              validated: false,
              invalidFeedback: res.data[key][0]
            };
            
            self.$data.errmsg.push(key + ":" + res.data[key][0]);
            self.$set(this.validation, key, newVal);
          });
        } else {
          console.log(res);
          self.makeToast("Greate ! 恭喜注册成功.3秒后跳转...");
          setInterval(() => {
            self.$router.push({ name: "home" });
          }, 3000);
        }
      });
    },
    validateForm: function() {
      if(!this.checkform){
        return
      }
      Object.keys(this.$data.user).forEach(key => {
        this.validate(key);
      });
    },
    validate: function(key) {
      if (key === "username") {
        if (this.$data.user[key].length >= 4) {
          this.$data.validation[key].valid = true;
        } else {
          this.$data.validation[key].valid = false;
          this.$data.validation[key].invalidFeedback = "请输入正确的用户名。";
        }
        this.$data.validation[key].validated = true;
      }
      if (key == "email") {
        var reg = new RegExp(
          "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
          // "^[a-z0-9]+([._\\-]*[a-z0-9])*@kindel.cn$"
        ); //正则表达式
        if (!reg.test(this.$data.user[key])) {
          this.$data.validation[key].valid = false;
          this.$data.validation[key].invalidFeedback = "请输入正确的邮箱。";
        } else {
          this.$data.validation[key].valid = true;
        }
        this.$data.validation[key].validated = true;
      }
      if (key === "email_re") {
        if (this.$data.user["email"] == this.user[key]) {
          this.$data.validation[key].valid = true;
        } else {
          this.$data.validation[key].valid = false;
          this.$data.validation[key].invalidFeedback =
            "两次输入的邮箱必须一致。";
        }
        this.$data.validation[key].validated = true;
      }
      if (key == "password") {
        if (this.$data.user[key].length < 6) {
          this.$data.validation[key].valid = false;
          this.$data.validation[key].invalidFeedback = "密码至少6个字符";
        } else {
          this.$data.validation[key].valid = true;
        }
        this.$data.validation[key].validated = true;
      }
      if (key === "password_re") {
        if (this.$data.user[key].length >= 6) {
          if (this.$data.user["password"] == this.user[key]) {
            this.$data.validation[key].valid = true;
          } else {
            this.$data.validation[key].valid = false;
            this.$data.validation[key].invalidFeedback =
              "两次输入的密码必须一致。";
          }
          this.$data.validation[key].validated = true;
        } else {
          this.$data.validation[key].valid = false;
          this.$data.validation[key].invalidFeedback = "密码至少6个字符";
        }
        this.$data.validation[key].validated = true;
      }
    }
  }
};
</script>
<style scoped>
.fr {
  float: right;
}
</style>