import { createStore } from 'vuex';
import Axios from 'axios';
import 'es6-promise/auto';

let axios = Axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.jobboard.tedbree.com/' : ''
});

const getHeaders = (token="") => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
}


const store = createStore({
  state: {
    jobData: {},
    postedJobData: {},
    apiUrl: 'v1',
    timeTravelData: [],
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    /**
     * Mutation Function to set jobs
     *
     * @param {object} state - state object
     * @param {object} payload - payaload object
     * @return {void}
     */
    setJobData: (state, payload) => {
      state.jobData = payload;
    },
    /**
     * Mutation Function to set posted jobs
     *
     * @param {object} state - state object
     * @param {object} payload - payaload object
     * @return {void}
     */
    setPostedJobData: (state, payload) => {
      state.postedJobData = payload;
    },
    /**
     * Mutation Function to authenticate user
     *
     * @param {object} state - state object
     * @param {object} payload - { status, token }
     * @return {void}
     */
    setAuthentication:(state, payload) => {
      state.isAuthenticated = payload.status;
      state.token = payload.token;
    }
  },
  actions: {
    /**
     * Action to login
     *
     * @param {object} { state, commit } - state object, commit function
     * @param {object} { email, password } - email, password 
     * @return {void}
     */
    login: async({ state, commit }, payload) => {
      try {
        const response = await axios.post(`${state.apiUrl}/login`, payload);
        commit('setAuthentication', { status: true, token: response.data.token });
        localStorage.setItem('token', response.data.token)
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * Action to apply for job
     *
     * @param {object} { state, commit } - state object, commit function
     * @param {object} { email, password } - email, password 
     * @return {void}
     */
    apply: async({ state, commit }, { formData, id }) => {
      try {
        await axios.post(`${state.apiUrl}/jobs/${id}/apply`, formData);
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * Action to get jobs
     *
     * @param {object} { state, commit } - state object, commit function
     * @return {void}
     */
    getJobs: async({ state, commit }) => {
      try {
        let response = await axios.get(`${state.apiUrl}/jobs`);
        commit('setJobData', response.data);
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * Action to get posted jobs
     *
     * @param {object} { state, commit } - state object, commit function
     * @return {void}
     */
      getPostedJobs: async({ state, commit }) => {
        try {
          let response = await axios.get(`${state.apiUrl}/my/jobs`, getHeaders(state.token || localStorage.getItem('token')));
          commit('setPostedJobData', response.data);
        } catch (error) {
          throw new Error(error)
        }
      },
    /**
     * Action to search jobs
     *
     * @param {object} { state, commit } - state object, commit function
     * @param {object} { searchValue, locationValue } - searchValue, locationValue 
     * @return {void}
     */
    searchJobs: async({ state, commit }, { searchValue, locationValue }) => {
      try {
        let response = await axios.get(`${state.apiUrl}/jobs?q=${searchValue}`);
        commit('setJobData', response.data);
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * Action to search posted jobs
     *
     * @param {object} { state, commit } - state object, commit function
     * @param {object} { searchValue } - searchValue
     * @return {void}
     */
     searchPostedJobs: async({ state, commit }, { searchValue }) => {
      try {
        let url = `${state.apiUrl}/my/jobs?q=${searchValue}`;
        let response = await axios.get(url, getHeaders(state.token));
        commit('setPostedJobData', response.data);
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * Action to post job
     *
     * @param {object} { state, commit } - state object, commit function
     * @param {object} payload - payload object
     * @return {void}
     */
    postJob: async({ state, commit }, payload) => {
      try {
        let response = await axios.post(`${state.apiUrl}/my/jobs`, payload, getHeaders(state.token || localStorage.getItem('token')));
        if (response) {
          const newPostedJobData = [...state.postedJobData.data, response.data.data]
          commit('setPostedJobData', { ...state.postedJobData, data: newPostedJobData });
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * Action to edit job
     *
     * @param {object} { state, commit } - state object, commit function
     * @param {object} payload - payload object
     * @return {void}
     */
    editJob: async({ state, commit }, payload) => {
      try {
        let response = await axios.patch(`${state.apiUrl}/my/jobs/${payload.id}`, payload, getHeaders(state.token || localStorage.getItem('token')));
        if (response) {
          const newPostedJobData = state.postedJobData.data.map(item => item.id === response?.data?.data?.id ? response.data.data : item);
          console.log(newPostedJobData, response.data.data, 'sksksksksksks')
          commit('setPostedJobData', { ...state.postedJobData, data: newPostedJobData });
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * Action to delete job
     *
     * @param {object} { state, commit } - state object, commit function
     * @param {object} { id } - id
     * @return {void}
     */
    deleteJob: async({ state, commit }, { id }) => {
      try {
        let response = await axios.delete(`${state.apiUrl}/my/jobs/${id}`, getHeaders(state.token || localStorage.getItem('token')));
        if (response) {
          const newPostedJobData = state.postedJobData.data.filter(item => item.id !== id);
          commit('setPostedJobData', { ...state.postedJobData, data: newPostedJobData });
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * Action to logout
     *
     * @param {object} { state, commit } - state object, commit function
     * @return {void}
     */
    logout: async({ state, commit }) => {
      try {
        let response = await axios.post(`${state.apiUrl}/logout`, getHeaders(state.token || localStorage.getItem('token')));
        if (response) {
          commit('setAuthentication', { status: false, token: null });
          localStorage.removeItem('token')
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  getters: {
    /**
     * method to return jobData from state
     *
     * @return {object} - jobData from state
     */
     jobData: state => state.jobData,

    /**
     * method to return postedJobData from state
     *
     * @return {object} - postedJobData from state
     */
    postedJobData: state => state.postedJobData,

  }
});

export default store;