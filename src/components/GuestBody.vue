<template>
  <div class="body__container">
    <div v-if="!jobs?.data?.length" class="mt-10"> NO JOBS AVAILABLE</div>
    <div class="job-list flex flex-col" v-if="jobs?.data?.length">
      <div class="flex justify-between mb-10">
          <p>Showing {{ jobs?.meta?.total }} result(s)</p>
          <p>Sort by: <span>Latest</span></p>
      </div>
      <button
        class="job-list__card"
        :class="{ 'active' : item.id === selected.id }"
        @click="selectJob(item)"
        v-for="item in jobs.data"
        :key="item.id" 
      >
        <div class="flex justify-between items-start">
          <p class="blue">{{ item.title }}</p>
          <p class="blue">{{ item.salary.split('per')[0] }}</p>
        </div>
        <p class="location flex justify-start items-center mt-3"> <span><img src="../assets/location.svg" alt="location" /></span>{{ item.location }}</p>
        <p class="description text-left mt-5">{{ item.description }}</p>
        <button class="see-more text-right">See more</button>
      </button>
    </div>
    <div class="description-div" v-if="selected">
      <div class="job-details">
          <p class="description-title text-left">{{ selected.title }}</p>
          <p class="description-location flex justify-start items-center mt-3 text-left"> <span><img src="../assets/location.svg" alt="location" /></span>{{ selected.location }}</p>
          <button
            class="apply"
            @click="(event) => $emit('handleClick', { event, selected })"
          >
            Apply Via Find Job
          </button>
      </div>
      <div class="job-content">
        <p class="description-text text-left">
            In this role, you will be responsible for developing and
            implementing user interface components using React.js concepts 
            and workflow such as Redux, Flux, and Webpack. You will also be 
            responsible for profiling and improving front-end performance 
            and documenting our front-end codebase. 
        </p>
        <ul>
          <li>Minimum Qualification: Degree</li>
          <li>Experience Level: Senior level</li>
          <li>Experience Length: 5 years</li>
        </ul> 
        <p class="requirements text-left mb-5">Job Description/Requirements</p>
        <ul>
          <li>5+ years experience of front-end related (HTML5 + JS + CSS3) development work experience, familiar with mobile application development;</li>
          <li>Proficient in JavaScript / Typescript, mastering technologies such as HTML, CSS, DOM, AJAX, etc., can quickly complete the established interactive design functions; At least 4 years experience is required.</li>
          <li>Thorough understanding of React.js and its core principles</li>
          <li>Experience with popular React.js workflows (such as Flux or Redux)</li>
          <li>Familiarity with RESTful API’s</li>
          <li>Knowledge of isomorphic react is a plus</li>
          <li>Familiarity with mordern front-end build pipelines and tools</li>
          <li>Experience with common front-end development tools such asBabel, Webpack, NPM e.t.c</li>
        </ul> 
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps,  } from 'vue'
import { useStore } from 'vuex'

defineProps({
  handleClick: Function,
  jobs: Object
})
const store = useStore()
const selected = ref('')


let jobs = [
  {
    id: 2,
    title: "yes",
    salary: '12',
    description: 'sjdjdjdjddj'
  },
  {
    id: 3,
    title: "Noooooooo",
    salary: '12',
    description: 'sjdjdjdjddj'
  }
]

function selectJob (item) {
  selected.value = item;
}

jobs = computed(() => store.getters['jobData'])
</script>

<style scoped>
.body__container {
  display: grid;
  padding: 25px 75px;
  grid-template-columns: repeat(2, 48%);
  grid-column-gap: 4%;
  min-height: 600px;
}

.job-list, .description-div {
  padding: 0;
  width: 100%;
  margin: 0;
  margin-top: 40px;
}

.job-list__card {
  background: white;
  box-shadow: 0px 4px 17px rgba(98, 190, 203, 0.15);
  border-radius: 10px;
  min-height: 200px;
  width: 100%;
  margin: 0;
  padding: 0 20px;
  margin-bottom: 15px;
  cursor: pointer;
  outline: none;
}

p {
  font-family: Gilroy-Regular;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.08em;
  color: #3E3E40;
}

.description-div {
  background: #FFFFFF;
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}

.job-details {
  border: none;
  border-bottom: 0.8px solid #EA5566; 
  padding: 30px 20px;
}

.job-content {
  border: none;
  padding: 30px 20px;
}

.job-list__card.active {
    background: #0F4A7B;
    border: none;
}

.see-more {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: #EA5566;
  border-radius: 10px;
  color: white;
  float: right;
  outline: none;
}

.job-list__card.active p {
  color: white;
}

.job-list__card.active .blue {
  color: white;
}

.job-list__card.active .see-more  {
  background: white;
  border-radius: 10px;
  color: #EA5566;
}

.blue {
  font-family: Gilroy ☞;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.08em;
  color: #0F4A7B;
}

span {
  margin-right: 10px;
}

li {
  font-family: Gilroy-Regular;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12em;
  color: #3E3E40;
  list-style-type: disc;
  text-align: left;
  margin-bottom: 10px;
  margin-left: 30px;

}

.description-text {
  font-family: Gilroy-Regular;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12em;
  color: #3E3E40;
  margin-bottom: 20px;
}

.requirements {
  font-family: Gilroy;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12em;
  color: #3E3E40;
  font-weight: bold;
  margin-top: 20px;
}

.apply {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #0F4A7B;
  border-radius: 10px;
  color: white;
  min-width: 220px;
  margin-top: 26px;
  font-family: Gilroy-Regular;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.12em;
  color: #FFFFFF;
  outline: none;
}

.description-title {
  font-family: Gilroy;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.12em;
  color: #0F4A7B;

}

 @media screen and (max-width: 700px) {
    .body__container {
      display: grid;
      padding: 25px 75px;
      grid-template-columns: 1fr;
      grid-column-gap: 4%;
      min-height: 600px;
      justify-content: center;
    }
 }

</style>