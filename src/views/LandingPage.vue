<template>
  <div class="jobs__container">
      <Header @handleClick="handleSearch" />
      <GuestBody @handleClick="toggleForm" />
      <ApplicationForm  v-if="isOpen" @handleSubmit="handleSubmit" :selected="selectedData" @closeModal="closeModal" />
      <Footer />
      <div class="overlay" v-if="isOpen" />
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import GuestBody from '../components/GuestBody.vue'
import ApplicationForm from '../components/ApplicationForm.vue'

export default {
  setup() {
    const $toast = getCurrentInstance().ctx.$toast
    const $router = getCurrentInstance().ctx.$router

    const store = useStore()
    function showToast (message, type) {
        if (type === 'success') {
            $toast.success(message)
            isOpen.value = !isOpen.value
        }

        if (type === 'error') {
            $toast.error(message)
        }
    }


    onMounted(() => store.dispatch('getJobs'))

    const selectedData = ref({});

    const isOpen = ref(false)
    function toggleForm ({ event, selected }) {
        event.preventDefault()
        selectedData.value = selected
        isOpen.value = !isOpen.value
    }

    function handleSubmit ({ event, state }) {
        const formData = new FormData();
        formData.append('first_name', state.firstName)
        formData.append('last_name', state.lastName)
        formData.append('email', state.email)
        formData.append('phone', state.phoneNumber)
        formData.append('location', state.location)
        formData.append('cv', state.fileData.file, state.fileData.name)

        store.dispatch('apply', { id: selectedData.value.id, formData })
        .then(response => {
            showToast('Application submitted successfully!', 'success')
        })
        .catch(error => {
            showToast('Something went wrong!', 'error')
            throw new Error(error)
        })
    }

    function handleSearch ({ event, searchValue, locationValue }) {
        event.preventDefault()
        store.dispatch('searchJobs', { searchValue, locationValue })
        .then(response => {
        })
        .catch(error => {
            showToast('Something went wrong!', 'error')
            throw new Error(error)
        })
    }

    function closeModal (event) {
        event.preventDefault()
        isOpen.value =  false
    }

    return {
      Footer,
      Header,
      GuestBody,
      ApplicationForm,
      toggleForm,
      handleSubmit,
      isOpen,
      selectedData,
      showToast,
      handleSearch,
      closeModal
    }
  },
  methods() {
      
  }
}
</script>

<style scoped>
.jobs__container {
    overflow-y: scroll;
    position: relative;
}

.overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.2;
    z-index: 1;

}
</style>