<template>
  <div class="routeSetting">
    <div class="routeForm">
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
      <div class="optMap">
        <div class="inputBox">
          제목 : 
          <input v-model="title" placeholder="제목을 입력해주세요."/>
        </div>
        <div class="sliderWrap">
          <RangeSlider :len="timeData.length" @emitIdxRange="idxRange = $event"/>
          <div class="pickedTimes" v-if="idxRange">
            <div>
              s: {{timeData[idxRange[0]] | dateFormat}}
            </div>
            <div>
              e: {{timeData[idxRange[1]] | dateFormat}}
            </div>
          </div>
        </div>
        <div class="buttonBox">
          <div class="setBtn" @click="saveRoute">저장</div>
        </div>
      </div>
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
      savedRouteData: null
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
  filters: {
    dateFormat (date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()


      return `${hours}시 ${minutes}분 ${seconds}초`
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
.optMap {
  display: flex;
  flex-direction: column;
}
.optMap > div {
  margin: 10px auto;
}
.sliderWrap {
  width: 80vw;
  padding: 40px;
}
.buttonBox .setBtn {
  margin: 0 50px;
  text-align: center;
  width: 82px;
  padding: 8px 0;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: gray;
  cursor: pointer;
}
</style>