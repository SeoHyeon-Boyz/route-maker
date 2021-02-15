<template>
  <div class="routeSetting">
    <div class="routeForm">
      <div class="inputBox">
        <input v-model="title" placeholder="제목을 입력해주세요."/>
      </div>
      <GmapMap
      class="gMap"
      :center="{lat: routeData[0].lat, lng: routeData[0].lng}"
      :zoom="18"
      map-type-id="roadmap"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }"
      >
        <gmap-polyline :path.sync="routeData" :options="{ strokeColor:'#008000'}" />
        <gmap-polyline :path.sync="savedRouteData" :options="{ strokeColor:'red'}" />
      </GmapMap>
      <!-- 루트를 시간별로 나열해서 앞뒤 부분은 자를 수 있게 -->
      <div class="sliderWrap">
        <RangeSlider :len="timeData.length" @emitIdxRange="idxRange = $event"/>
      </div>
      <div @click="saveRoute">저장</div>
    </div>
  </div>
</template>

<script>
import RangeSlider from '@/components/RangeSlider.vue'
import { mapActions } from 'vuex'

export default {
  name: 'routeSetting',
  data() {
    return {
      title: null,
      idxRange: null,
      savedRouteData: []
    }
  },
  components: {
    RangeSlider
  },
  props: [
    'routeData',
    'timeData'
  ],
  created () {
    if (!this.routeData) {
      alert('잘못된 접근입니다.')
    } else {
      this.savedRouteData = this.routeData
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['addRoute']),
    saveRoute() {
      const res = {
        title: this.title ? this.title : '루트',
        createAt: new Date(),
        route: this.routeData.slice(this.idxRange[0], this.idxRange[1] + 1),
        time: this.timeData.slice(this.idxRange[0], this.idxRange[1] + 1)
      }
      this.addRoute(res)
      this.$router.push({ name: 'Home' })
    }
  },
  watch: {
    'idxRange' (to, from) {
      const lodash = require('lodash')
      let routeCopy = lodash.cloneDeep(this.routeData)
      this.savedRouteData = routeCopy.slice(this.idxRange[0], this.idxRange[1] + 1)
    }
  }
}
</script>

<style scoped>
.gMap {
  width: 100vw;
  height: 65vh;
}
.sliderWrap {
  padding: 40px;
}
</style>