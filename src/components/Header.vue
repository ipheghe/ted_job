<template>
  <div class="header__container">
      <div class="flex justify-between text-left menu">
        <div class="text-left">
          <img :src="FindJobs" alt="logo" />
          <p>for employers</p>
        </div>
        <div class="flex justify-end items-center" v-if="!hideSearchBar">
          <a>Jobs</a>
          <a>Company Review</a>
          <a>Find Salaries</a>
          <button class="post-job" @click="$router.push({ name: 'Jobs' })">Post Job</button>
        </div>
        <button type="button" class="post-job logout" v-if="hideSearchBar" @click="(event) => $emit('logout', event)">Logout</button>
      </div>
      <h1 class="text-left mt-7">{{ !hideSearchBar ? 'Find Your Dream Job' : 'Jobs' }}</h1>
      <div class="search-bar" v-if="!hideSearchBar">
        <div class="search-content first">
          <img src="../assets/search.svg" alt="search" />
          <input
            class="search__input first"
            v-model="searchValue" 
            placeholder=""
            :name="searchValue"
            type="text"
          >   
        </div>
        <div class="search-content second">
            <img src="../assets/location.svg" alt="location" />
            <input
              class="search__input"
              v-model="locationValue" 
              placeholder=""
              :name="locationValue"
              type="text"
            > 
          <button
            class="search-btn"
            @click="(event) => $emit('handleClick', { event, searchValue, locationValue })"
          >
            Search
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, defineProps,  } from 'vue'
import FindJobs from '../assets/findJobs.png'

  defineProps({
    hideSearchBar: Boolean
  })

  const searchValue = ref('');
  const locationValue = ref('');
</script>

<style scoped>
.header__container {
  padding: 25px 100px;
  width: 100%;
  height: 243px;
  background: #0F4A7B;
  color: white;
  position: relative;
}

.menu {
  width: 100%;
}

.post-job {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 85px;
  height: 40px;
  background: #FFEDED;
  border-radius: 6px;
  color: #0F4A7B;

}

.search-bar {
  position: absolute;
  bottom: -40px;
  left: 120px;
  width: 85%;
  height: 80px;
  padding: 12px 24px;
  background: white;
  box-shadow: 0px 4px 17px rgba(15, 74, 123, 0.15);
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(2, 50%);
}

.search-content {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
}

.search-content.first {
  border-right: 0.8px solid #62BECB;
  width: 100%;
  max-width: 100%;
  padding-right: 15px;
}

.search-content.second {
  display: grid;
  padding-left: 20px;
  width: 100%;
  grid-template-columns: 25px 1fr 100px;
}

.search-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: #EA5566;
  border-radius: 10px;
  color: white;
}

.search-bar img {
  margin-right: 20px;
}

button {
  outline: none;
}

.links-content {
  padding: 0;
}

a {
  text-decoration: none;
  margin-right: 15px;
}

h1 {
  font-family: Gilroy;
  font-size: 40px;
  line-height: 47px;
  letter-spacing: 0.12em;
  color: #FFFFFF;
  margin-left: 20px;
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

.search__input {
  width: 100%;
  height: 100%;
  outline: none;
  color: black;
}

.search-input.first {
  width: 90%;
}

@media screen and (max-width: 900px) {
  .search-bar {
    left: 100px;
    width: 75%;
    height: 80px;
  }
}
</style>