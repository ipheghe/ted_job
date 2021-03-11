<template>
  <form class="form__container" enctype="multipart/form-data" @submit.prevent="(event) => $emit('handleSubmit', { event, state })">
    <h3 class="text-left form__title">{{ selected.title }}</h3>
		<p class="text-left form__location"><img src="../assets/location.svg" alt="location" /> <span>{{ selected.location }}</span></p>
		<label class="text-left form__label">First Name</label>
    <input
      class="form__input"
      v-model="state.firstName" 
      placeholder=""
      name="firstName"
      type="text"
      required
    >     
		<label class="text-left form__label">Last Name</label>
    <input
      class="form__input"
      v-model="state.lastName" 
      placeholder=""
      name="lastName"
      type="text"
      required
    >     
		<label class="text-left form__label">Email Address</label>
    <input
      class="form__input"
      v-model="state.email" 
      placeholder=""
      name="email"
      type="email"
      required
    >     
    <label class="text-left form__label">Location</label>
    <input
      class="form__input"
      v-model="state.location" 
      placeholder=""
      name="location"
      type="text"
      required
    > 
		<label class="text-left form__label">Phone Number</label>
    <input
      class="form__input"
      v-model="state.phoneNumber" 
      placeholder=""
      name="phoneNumber"
      type="text"
      required
    >
		<div class="flex flex-col justify-center items-center file-upload">
			<input
				type="file"
				name="cv"
				@change="filesChange($event.target.name, $event.target.files);
				fileCount = $event.target.files.length"
				accept="image/*, application/pdf"
				class="input-file"
			>
			<img src="../assets/upload_icon.svg" alt="upload"  class="image-icon" />
			<p class="upload-text">Drag and drop your CV here</p>
			<p class="upload-text">or</p>
			<button class="upload-btn">Browse files</button>
      <p>{{ state.fileData.name }}</p>
		</div>       
    <button
      type="submit"
      class="form__submit"
      :disabled=" !state.firstName || !state.lastName || !state.email || !state.location || !state.phoneNumber"

    > Submit Application </button>
		<button class="close__btn" @click="(event) => $emit('closeModal', event)"> &times;</button>
  </form>
</template>

<script setup>
import { ref, defineProps,  } from 'vue'

defineProps({
  role: String,
  closeModal: Function,
  selected: Object
})

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  location: '',
  isSaving: '',
  fileData: {
    name: '',
    file: {}
  }
}

const state= ref(initialState)

function filesChange (fieldName, fileList) {
    // handle file changes
  if (!fileList.length) return;
  // append the files to FormData
  Array
    .from(Array(fileList.length).keys())
    .map(x => {
      state.value.fileData.name = fileList[0].name
      state.value.fileData.file = fileList[x]
    });
}

</script>

<style>

.form__container {
  min-width: 500px;
  width: 500px;
	margin: 20px auto;
	background: #F9FBFD;
	border-radius: 10px;
	padding: 20px 60px;
	position: absolute;
  z-index: 2;
  top: 8%;
  left: 30%;
}

.file-upload {
	width: 100%;
	height: 205px;
	background: #FFFFFF;
	border: 0.5px solid #0F4A7B;
	box-sizing: border-box;
	border-radius: 10px;
	margin-top: 15px;
}

.form__label {
  font-family: Gilroy;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12em;
  color: #0F4A7B;
  display: block;
  margin-bottom: 13px;
  margin-top: 25px;
}

.form__input {
  background: #FFFFFF;
  border: 0.5px solid #0F4A7B;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  height: 45px;
  display: block;
  width: 100%;
  padding: 10px 15px;
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

.form__submit {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 38px;
  background: #0F4A7B;
  border-radius: 10px;
  color: white;
  margin-top: 40px;
	font-family: Gilroy;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.04em;
  cursor: pointer;
  outline: none;
}

.form__submit:disabled {
  opacity: 0.2;
}

.image-icon {
	width: 40px;
	height: 40px;
}

.upload-text {
	font-family: Gilroy;
	font-size: 12px;
	line-height: 14px;
	text-align: center;
	letter-spacing: 0.04em;
	color: #0F4A7B;
	margin-bottom: 8px;
}

.upload-btn {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px;
	background: #0F4A7B;
	border-radius: 10px;
	font-family: Gilroy;
	font-size: 14px;
	line-height: 16px;
	text-align: center;
	letter-spacing: 0.04em;
	color: #FFFFFF;
	width: 150px;
}

.input-file {
	opacity: 0;
	width: calc(100% - 120px);
	height: 205px;
	position: absolute;
	cursor: pointer;
}

.close__btn {
	border: none;
	background-color: transparent;
	padding: 0;
	margin: 0;
	cursor: pointer;
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 32px;
  color: #3E3E40;
  z-index: 1;
  outline: none;
}

.form__title {
  font-family: Gilroy;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.12em;
  color: #0F4A7B;

}

.form__location {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.form__location img {
  width: 20px;
  height: 20px;
  margin: 0;
  margin-right: 5px;
}

.form__location span {
  font-family: Gilroy-Regular;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.12em;
  color: #3E3E40;
}


</style>