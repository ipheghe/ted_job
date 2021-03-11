<template>
  <div class="login__container" >
      <div class=" flex justify-start items-center login__banner">
          <img class="find-jobs" src="../assets/FindJObs.png" />
          <p class="for-employers">for employers</p>
          <div>
            <h1 class="text-left">Find the best candidates for your organisation.</h1>
            <img src="../assets/banner.png" alt="banner" />
          </div>
      </div>
      <div class=" flex justify-end items-center login__form">
        <form @submit.prevent="onSubmit" autocomplete='on'>
            <h3 class="text-left form-title">Login</h3>
            <label class="text-left">Email</label>
            <input
              class="login__input"
              v-model="email" 
              placeholder=""
              :name="email"
              type="email"
            >            
            <label class="text-left">Password</label>
            <input
              class="login__input"
              v-model="password" 
              placeholder=""
              :name="password"
              type="password"
            >
            <button
              type="submit"
              class="login__btn"
              >Submit Application
            </button>
        </form>

      </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const email = ref('')
    const password = ref('')
    const isAuthenticated = localStorage.getItem('token')

    const $toast = getCurrentInstance().ctx.$toast
    const $router = getCurrentInstance().ctx.$router

    if (isAuthenticated) {
      $router.push({ name: 'Jobs' })
    }
    function showToast (message, type) {
        if (type === 'success') {
            $toast.success(message)
            $router.push({ name: 'Jobs' })
        }

        if (type === 'error') {
            $toast.error(message)
        }
    }


    function onSubmit(event) {
      store.dispatch('login', { email: email.value, password: password.value })
      .then(response => {
          showToast('Login was successful!', 'success')
      })
      .catch(error => {
          showToast('Authentication Failed!', 'error')
          throw new Error(error)
      })
    }

    return {
      email,
      password,
      onSubmit,
      isAuthenticated
    }
  }
}
</script>

<style scoped>

.login__container {
  width: 100%;
  height: 100vh;
  padding: 0;
  display: grid;
  grid-template-columns: 50% 50%;
  background-color: #F57D7D;
}

.login__banner {
  height: 100vh;
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
  background-color: #0F4A7B;
  position: relative;
  padding: 82px;
}

.login__banner  h1 {
  font-family: Gilroy;
  font-weight: 800;
  font-size: 50px;
  line-height: 61px;
  color: #FFFFFF;
  max-width: 70%;
}

.find-jobs {
  position: absolute;
  left: 82px;
  top: 35px;
  color: #C6E3E8;
  background: none;
  font-size: 34px;
}

.for-employers {
  position: absolute;
  left: 100px;
  top: 70px;
  color: #C6E3E8;
  background: none;
  font-size: 12px;
  color: #FFFFFF;
}

.login__form {
  height: 100vh;
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
  background-color: #E5E5E5;
  padding: 20px 90px;
}

.login__form label {
  font-family: Gilroy;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.12em;
  color: #0F4A7B;
  display: block;
  margin-bottom: 13px;
  margin-top: 42px;
}

.login__input {
  background: #FFFFFF;
  border: 0.5px solid #0F4A7B;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  height: 69px;
  display: block;
  width: 100%;
  padding: 10px 15px;
}

form {
  min-width: 500px;
  width: 500px;
}

.form-title {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 39px;
  letter-spacing: 0.12em;
  color: #0F4A7B;
}

.login__btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 180px;
  height: 68px;
  background: #0F4A7B;
  border-radius: 10px;
  color: white;
  margin-top: 40px;
  outline: none;
}

 @media screen and (max-width: 1300px) {
    form {
      min-width: 100%;
      width: 100%;
    }
 }

</style>