<template>
  <Header hideSearchBar @logout="handleLogout" />
  <div class="container">
    <section class="search__create">
      <div class="search__input--container">
        <img src="../assets/search.svg" alt="" />
        <input type="text" placeholder="Front end developer"  v-model="state.searchValue" />
        <button type="button" @click="handleSearch">Search</button>
      </div>

      <div class="new-job">
        <button type="button" @click="handleModal">
          <span>+</span> New Job
        </button>
      </div>
    </section>

    <section class="table-section">
      <table>
        <tr>
          <th v-for="header in tableHeader" :key="header">
            {{ header }}
            <button type="button" v-if="header === 'Filter'">
              <img src="../assets/filter.svg" alt="" />
            </button>
          </th>
        </tr>

        <tr v-for="item in postedJobs?.data" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item['updated_at'] }}</td>
          <td>{{ item.candidates || 0 }}</td>
          <td><button type="button" class="edit" @click="(event) => handleEdit(event, item)">Edit</button></td>
          <td><button type="button" class="delete" @click="(event) => handleDelete(event, item.id)">Delete</button></td>
        </tr>
      </table>
    </section>
  </div>

  <div v-if="modalIsOpen" class="modal">
    <form @submit.prevent="submitJob">
      <div class="form-header">
        <h2 class="text-left">New Job</h2>
        <p>
          Kindly provide the required information to get matched with suitable
          candidates
        </p>
      </div>
      <button type="button" class="close-modal" @click="handleModal">
        &times;
      </button>
      <div class="input-container">
        <label>Job Title</label>
        <input type="text" v-model="state.title" />
      </div>

      <div class="input-container">
        <label>Company Name</label>
        <input type="text" v-model="state.company" />
      </div>

      <div class="input-container">
        <label>Location</label>
        <input type="text" v-model="state.location" />
      </div>

      <div class="input-container">
        <label>Description</label>
        <input type="text" v-model="state.description" />
      </div>

      <div class="input-container select-option">
        <label>What type of employment is it?</label>
        <select v-model="state.type">
          <option value="">Select option</option>
          <option
            v-for="employmentType in employmentTypes"
            :key="employmentType"
          >
            {{ employmentType }}
          </option>
        </select>
      </div>

      <div class="input-container select-option">
        <label>What type of work conditions?</label>
        <select v-model="state['work_condition']">
          <option value="">Select option</option>
          <option v-for="condition in workConditions" :key="condition">
            {{ condition }}
          </option>
        </select>
      </div>

      <div class="input-container">
        <label>Salary range</label>
        <input type="text" v-model="state.salary" />
      </div>

      <div class="input-container">
        <label>Submission Deadline</label>
        <input type="date" v-model="state.submissionDeadline" />
      </div>

      <div class="input-container select-option">
        <label>What sector is this job categorized under?</label>
        <select v-model="state.category">
          <option value="">Select option</option>
          <option v-for="category in categories" :key="category">
            {{ category }}
          </option>
        </select>
      </div>

      <button type="submit" class="submit-btn mt-0">{{ isLoading ? isLoading : state.isEditMode ? 'Edit Application' : 'Submit Application' }}</button>
    </form>
  </div>
  <Footer />
</template>

<script>
import { ref, onMounted, computed, getCurrentInstance } from "vue";
import { useStore } from 'vuex'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'

export default {
  setup() {
    const store = useStore()
    const modalIsOpen = ref(false);
    const $toast = getCurrentInstance().ctx.$toast
    const $router = getCurrentInstance().ctx.$router
    const isAuthenticated = localStorage.getItem('token')
    if (!isAuthenticated) {
      $router.push({ name: 'Login' })
    }

    function showToast (message, type) {
        if (type === 'success') {
            $toast.success(message)
        }

        if (type === 'error') {
            $toast.error(message)
        }
    }

    const initialState = {
      title: '',
      company: '',
      location: '',
      type: '',
      'work_condition': '',
      description: '',
      salary: '',
      submissionDeadline: '',
      category: '',
      searchValue: '',
      isEditMode: false,
      selectedItem: ''
    };

    const state = ref(initialState);
    const isLoading = ref(false);
    const employmentTypes = [
      "Full-time",
      "Temporary",
      "Contract",
      "Permanent",
      "Internship",
      "Volunteer",
    ];
    const categories = [
      "Tech",
      "Health care",
      "Hospitality",
      "Customer Service",
      "Marketing",
    ];
    const workConditions = [
      "Remote",
      "Part Remote",
      "On-Premise"
    ];
    const tableHeader = [
      "Job title",
      "Date modified",
      "Candidates",
      " ",
      "Filter",
    ];

    const mockData = {
      jobTitle: "Front end developer",
      dateModified: "10/7/21",
      candidates: 100,
    };

    onMounted(() => store.dispatch('getPostedJobs'))
    let postedJobs = computed(() => store.getters['postedJobData'])

    function handleModal () {
      modalIsOpen.value = !modalIsOpen.value;
      state.value.isEditMode = false;
    };

    function submitJob (event) {
      event.preventDefault()
      const updatedData = state.value;

      if (state.value.isEditMode) {
        isLoading.value = 'Editing.....'
        store.dispatch('editJob', { ...updatedData.selectedItem, ...updatedData })
        .then(response => {
          showToast('Job Edited Successfully!', 'success')
          handleModal()
          state.value.title = '';
          state.value.company = '';
          state.value.location = '';
          state.value.salary = '';
          state.value.category = '';
          state.value.work_condition = '';
          state.value.description = '';
          state.value.submissionDeadline = '';
          state.value.type = '';
          state.value.isEditMode = false;
          state.value.selectedItem = '';
          isLoading.value = null
        })
        .catch(error => {
            showToast('Something went wrong!', 'error')
            throw new Error(error)
        })
      } else {
        isLoading.value = 'Submitting.....'
        store.dispatch('postJob', { ...updatedData })
        .then(response => {
          showToast('Job Posted Successfully!', 'success')
          handleModal()
          state.value.title = '';
          state.value.company = '';
          state.value.location = '';
          state.value.salary = '';
          state.value.category = '';
          state.value.work_condition = '';
          state.value.description = '';
          state.value.type = '';
          state.value.submissionDeadline = '';
          state.value.isEditMode = false;
          state.value.selectedItem = '';
          isLoading.value = null
        })
        .catch(error => {
            showToast('Something went wrong!', 'error')
            throw new Error(error)
        })
      }
    };

    function handleEdit (event, item) {
      event.preventDefault()
      state.value.title = item.title;
      state.value.company = item.company;
      state.value.location = item.location;
      state.value.salary = item.salary;
      state.value.category = item.category;
      state.value.work_condition = item['work_condition'];
      state.value.description = item.description;
      state.value.type = item.type;
      state.value.isEditMode = true;
      state.value.selectedItem = item;
      modalIsOpen.value = !modalIsOpen.value;
    }

    function handleDelete (event, id) {
      event.preventDefault()
      store.dispatch('deleteJob', { id })
      .then(response => {
        showToast('Job deleted successfully!', 'success')
      })
      .catch(error => {
          showToast('Something went wrong!', 'error')
          throw new Error(error)
      })
    }

    function handleSearch (event) {
      event.preventDefault()
      store.dispatch('searchPostedJobs', { searchValue: state.value.searchValue })
      .then(response => {
      })
      .catch(error => {
          showToast('Something went wrong!', 'error')
          throw new Error(error)
      })
    }

    function handleLogout (event) {
      event.preventDefault()
      store.dispatch('logout')
      .then(response => {
          localStorage.removeItem('token')
          $router.push({ name: 'Home' })
      })
      .catch(error => {
          showToast('Something went wrong!', 'error')
          throw new Error(error)
      })
    }

    return {
      state,
      employmentTypes,
      categories,
      workConditions,
      Footer,
      Header,
      handleModal,
      modalIsOpen,
      tableHeader,
      postedJobs,
      handleSearch,
      handleEdit,
      handleDelete,
      handleLogout,
      isLoading,
      tableData: "*"
        .repeat(20)
        .split("*")
        .map((x, y) => ({ ...mockData, id: y + 1 })),
      submitJob,
    };
  },
};
</script>

<style scoped>
/** Global Reset */
*,
*::before,
*::after {
  outline: none;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  box-sizing: border-box;
}

button {
  border: none;
  padding: 10px 20px;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: transform linear 0.15s;
}

button:hover {
  cursor: pointer;
  transform: translateY(-2px);
}

/** Parent container (Topmost level) */
.container {
  padding: 100px 50px;
  min-width: 320px;
  margin: 0 auto;
  min-height: 500px;
}

@media (max-width: 768px) {
  .container {
    padding: 100px 20px;
  }
}

/** Search */
.search__create {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.search__input--container {
  display: flex;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px 10px 10px 30px;
  min-width: 250px;
  max-width: 500px;
  width: 100%;
  align-items: center;
}

@media (max-width: 800px) {
  .search__input--container {
    max-width: 100%;
    width: 100%;
    padding: 10px;
  }
}

.search__input--container img {
  display: inline-block;
  margin-right: 15px;
  width: 22px;
}

.search__input--container input {
  font-size: 1rem;
  border: none;
  width: 100%;
  padding: 10px 6px;
}

.search__input--container button {
  background: #ea5566;
  border-radius: 10px;
  padding: 10px 30px;
  font-size: 1rem;
}

/** Add new job button */
.new-job button {
  background: #ea5566;
  box-shadow: 0 0 5px #ea556680;
  border-radius: 10px;
  padding: 10px 30px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.new-job button span {
  font-size: 1.5rem;
  margin-right: 5px;
}

@media (max-width: 800px) {
  .new-job {
    margin-top: 20px;
    width: 100%;
  }
  .new-job button {
    width: 100%;
  }
}

/** Table design */
.table-section {
  margin-top: 50px;
  overflow: auto;
  width: 100%;
}

table {
  display: block;
  width: 100%;
  min-width: 1100px;
}

table > tr {
  padding: 20px 20px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 250px));
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.08);
}

table > tr:nth-child(1) {
  background: #0f4a7b;
  box-shadow: none;
}

th {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

th button img {
  width: 20px;
  display: inline-block;
  margin-left: 10px;
}
td {
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}

td button {
  border-radius: 0;
  padding: 10px 30px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

td button.edit {
  background: #ea5566;
  border: 1px solid #ea5566;
}

td button.delete {
  background: #fff;
  border: 1px solid rgb(134, 153, 134);
  color: rgb(134, 153, 134);
}

/** Modal */
.modal {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
}

.modal form {
  position: relative;
  width: 100%;
  background: #fff;
  height: auto;
  max-width: 500px;
  min-width: 280px;
  padding: 20px 40px;
  overflow: auto;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .modal form {
    margin-top: 0;
    max-width: 100%;
    min-width: 280px;
    padding: 20px;
    border-radius: 0;
  }
}

.close-modal {
  position: absolute;
  color: #0f4a7b;
  right: 10px;
  top: 0px;
  font-size: 2rem;
}

label {
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

.form-header {
  padding: 10px 0;
}

.form-header h2 {
  color: #0f4a7b;
  font-size: 1.1rem;
}

.form-header p {
  color: rgb(168, 168, 168);
  font-size: 0.7rem;
}

.input-container {
  color: rgba(62, 62, 64, 0.8);
  margin-bottom: 20px;
}

.input-container label {
  color: #0f4a7b;
  display: block;
  margin-bottom: 5px;
}

.input-container input,
.input-container select {
  color: rgba(62, 62, 64, 0.8);;
  border: 1px solid #a2b6c7;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1.1rem;
   width: 100%;
}

.submit-btn {
  border-radius: 0;
  padding: 15px 30px;
  font-size: 1.1rem;
  text-align: center;
  width: 100%;
  background: #0f4a7b;
}

p ,label{
  text-align: left;;
}

button, input {
  outline: none
}

input {
  font-family: Gilroy-Regular;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.05em;
  color: rgba(62, 62, 64, 0.8);
}
</style>
