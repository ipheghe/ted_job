<template>
  <div class="footer__container grid grid-cols-2 gap-4">
    <div class="links-content flex justify-between items-start">
        <div class="text-left">
          <img src="../assets/FindJobs.png" alt="logo" />
          <p>© 2021 <span>FindJobs</span></p>
        </div>
      <div class="flex flex-col text-left">
        <h3 class=" mb-5">Quick Links</h3>
        <a>Home</a>
        <a>About</a>
        <a>Calendar</a>
        <a>Terms and condition</a>
      </div>
    </div>
    <div class="flex flex-col items-end">
        <h3 class="text-center mr-10 mb-5">Social Media</h3>
        <div class="flex justify-between">
          <a class="ellipse flex items-center justify-center"><img src="../assets/instagram.svg" alt="instagram" /></a>
          <a class="ellipse flex items-center justify-center"><img src="../assets/facebook.png" alt="facebook" /></a>
          <a class="ellipse flex items-center justify-center"><img src="../assets/twitter.svg" alt="twitter" /></a>
        </div>
    </div> 
  </div>
</template>

<script setup>
</script>

<style scoped>
.footer__container {
  padding: 50px 100px;
  width: 100%;
  height: 210px;
  background: #0F4A7B;
  color: white;
}

.links-content {
  padding: 0;
}

.ellipse {
  width: 50px;
  height: 50px;
  background: #000000;
  opacity: 0.28;
  border-radius: 50%;
  margin-right: 5px;
}

.ellipse img {
  color: white;
  z-index: 3;
}

a {
  text-decoration: none;
}

h3 {
  font-family: Gilroy;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: -0.03em;
  color: #FFFFFF;
}

p {
  font-family: Gilroy-Regular;
  font-size: 18px;
  line-height: 180%;
  letter-spacing: 0.01em;
  color: #FFFFFF;
}

span {
  color: #62BECB;
  font-style: italic;
}
</style>