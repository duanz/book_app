<template>
  <div>
    <h3>帮助</h3>
    <b-row>
      <b-col sm="12" md="6" lg="6" class="text-center">
    <h5 class="primary">第一步</h5>
        <h6 class="text-left">
          登录你的
          <a href="https://www.amazon.cn/mn/dcw/myx.html">amazon.cn</a>
          账户:
        </h6>
        <p class="text-left">在"管理内容和设备"菜单栏找到"首选项"菜单，并进入</p>
        <img class="img-fluid rounded hoverable" :src="img1" />
      </b-col>

      <b-col sm="12" md="6" lg="6" class="text-center mb-5">
        <h5 class="primary">第二步</h5>
        <h6 class="text-left">
          2.找到"个人文档设置"并单击，在展开内容中找到"已认可的发件人电子邮箱列表",将邮箱
          <span>sanksunny@163.com</span>
          添加至认可的发件人邮箱。
        </h6>
        <img class="img-fluid rounded hoverable" :src="img2" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import img_shebei from "@/assets/shebei.png";
import img_addemail from "@/assets/addemail.png";
export default {
  name: "help",
  data() {
    return {
      img1: img_shebei,
      img2: img_addemail
    };
  }
};
</script>
<style scoped>
</style>