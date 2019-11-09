<template>
  <div class="tab-content">
    <div class="page n-hot active" data-hot=".n-hot" data-cid="c_dmLad">
      <div class="list-wrap" style="margin-top: 0px;">

        <div v-if = "movies">
          <home-item :data = "item" v-for = "item in movies.movieList" :key = "item.id"></home-item>
        </div>
      
        
      </div>
    </div>
    <Loading v-if = "loadingFlag"></Loading>
  </div>
</template>



<script>
import HomeItem from './HomeItem'
import BScroll from 'better-scroll';
import _ from 'loadsh'
import { mapActions,mapState } from 'vuex';
import { Toast } from 'mint-ui'
export default {
  props: ['movies'],
  components: {
    HomeItem
  },
  computed: {
    ...mapState({
      loadingFlag: state => state.home.loadingFlag
    })
  },
  methods: {
    ...mapActions(['getComingMovies','showLoading','hideLoading'])
  },
  mounted () {
    let count = 0
    const bs  = new BScroll('.page',{
      pullUpLoad: {
        threshold: 30 // 举例底部多少的时候开始加载
      }
    })
    /* ! pullingUp 上拉加载事件  better-scroll提供的 */
    // bs.on( 事件名称，事件处理程序)
    bs.on('pullingUp', () => { // 上拉加载必须有一个选项要配置   pullUpload
     
      // 1. id分组
      const movieIds = this.movies.movieIds.slice( 12 )
      const ids = _.chunk( movieIds,10 )
      // console.log("兵哥: mounted -> ids", ids[ count ])

      if ( count == ids.length) {
       Toast({
          message: '已经没有更多的电影了',
          position: 'bottom',
          duration: 2000
        });
        bs.finishPullUp() // 必须告诉他拉动结束了
        return;
      }

      if ( count < ids.length ) {
        // 可以啦 - 可以进行数据请求了
        console.log('进行数据请求')
        this.showLoading()
        setTimeout(() => {
          this.getComingMovies( ids[ count ].join(',') )
          this.hideLoading()
        },2000)
      }
      
      bs.finishPullUp() // 必须告诉他拉动结束了
      count ++
    })
  }
}
</script>

<style lang="stylus" scoped>
  .tab-content 
    height 100% 
    .page 
        height 100% 
</style>
