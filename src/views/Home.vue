<template>
  <div class="home">
    <GmapMap
    class="gMap"
    :center="{lat: mymarker.lat, lng: mymarker.lng}"
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
      <GmapMarker :position="{lat: mymarker.lat, lng: mymarker.lng}" />
      <gmap-polyline :path.sync="route" :options="{ strokeColor:'#008000'}" />
    </GmapMap>
    <div class="isWorking">
      <img src="@/assets/images/ico/ico_working_on.png" v-if="isWorking"/>
      <img src="@/assets/images/ico/ico_working_off.png" v-else/>
    </div>
    <div class="buttonWrap">
      <div class="buttonBox">
        <div class="setBtn btnS" @click="myposition">시작</div>
        <div class="setBtn btnC" @click="clearWatch">끝</div>
      </div>
    </div>
    <div class="routeStorageWrap">
      <div class="routeLength">저장된 루트 {{getRouteStorage.length}}개</div>
      <div class="routesBox">
        <div v-for="item in getRouteStorage" :key="String(item.createAt)" class="routeItem" @click="showRoute(item.route)">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      mymarker: {
        lat : 37.5536472,
        lng : 126.964296
      },
      isWorking: false,
      route: [],
      watchID: null
    }
  },
  components: {
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['getRouteStorage']),
  },
  methods: {
    myposition : function() {
      if (navigator.geolocation) {
        this.route = []
        this.watchID = navigator.geolocation.watchPosition(this.successPosition, this.failurePosition,
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        })
      }else{
        console.log("Your browser does not support Geolocation API")
      }
    },
    successPosition: function(position){
      this.isWorking = true
      this.mymarker = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.route.push(this.mymarker)
    },
    failurePosition: function(err){
      alert("Error Code: " + err.code + " Error Message: " + err.message);
    },
    clearWatch() {
      navigator.geolocation.clearWatch(this.watchID)
      this.isWorking = false
      if(confirm('루트를 저장하시겠습니까?')) {
        const lodash = require('lodash')
        const copy = lodash.cloneDeep(this.route)
        this.$router.push({ name: 'RouteSetting', params: { routeData: copy }})
        this.route = []
      } else {
        alert('루트가 삭제되었습니다.')
      }
    },
    showRoute(route){
      this.route = route
      this.mymarker = route[0]
    }
  }
}
</script>

<style scoped>
.gMap {
  width: 100vw;
  height: 65vh;
}
.isWorking {
  display: flex;
  margin: 15px 0;
}
.isWorking img {
  margin: 0 10px 0 auto;
  width: 40px;
}
.buttonWrap {
  padding: 12px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  display: flex;
  margin-bottom: 15px;
}
.buttonBox {
  margin: 0 auto;
  display: flex;
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
.routeStorageWrap {
  padding: 10px;
  font-size: 16px;
}
.routeStorageWrap .routesBox {
  background-color: gray;
  margin: 10px 0;
  padding: 6px;
  min-width: calc(100vw - 32px);
  min-height: 80px;
  border-radius: 6px;
  color: white;
}
.routesBox .routeItem {
  margin: 6px;
}
</style>