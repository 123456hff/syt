import axios from 'axios'
const GET_MOVIES = 'GET_MOVIES'
const GET_COMING_MOVIES = 'GET_COMING_MOVIES'
const SHOW_LOADING = 'SHOW_LOADING'
const HIDE_LOADING = 'HIDE_LOADING'
export default {
  state: {
    movies: null,
    name: '',
    loadingFlag: false 
  },
  actions: {
    getMovies ({ commit }) {
      // 数据请求
      axios({
        url: '/ajax/movieOnInfoList',
        params: {
          token: ''
        }
      }).then( res => {
        commit({
          type: GET_MOVIES,
          payload: res.data 
        })
      })
    },
    getComingMovies ( {commit},movieIds ) {
      axios({
        url: '/ajax/moreComingList',
        params: {
          token: '',
          movieIds
        }
      }).then( res => {
        commit({
          type: GET_COMING_MOVIES,
          payload: res.data 
        })
      })
    },
    showLoading ({commit}) {
      console.log('showLoading')
      commit({
        type: SHOW_LOADING
      })
    },
    hideLoading ({commit}) {
      commit({
        type: HIDE_LOADING
      })
    }
  },
  mutations: {
    GET_MOVIES ( state,action ) {
      state.movies = action.payload
    },
    GET_COMING_MOVIES ( state,action ) {
      state.movies.movieList.push( ...action.payload.coming )
    },
    SHOW_LOADING ( state ) {
      state.loadingFlag = true 
    },
    HIDE_LOADING ( state ) {
      state.loadingFlag  = false 
    }
  }
}