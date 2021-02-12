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
    <div>
      <button @click="myposition">시작</button>
      <button @click="clearWatch">끝</button>
    </div>
    <div>
      <div>저장된 루트 {{getRouteStorage.length}}개</div>
      <div>
        <div v-for="(item, idx) in getRouteStorage" :key="idx" @click="showRoute(item)">루트{{idx + 1}}</div>
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
      if(confirm('루트를 저장하시겠습니까?')) {
        this.$store.dispatch('addReview', this.route)
        this.route = []
        alert('루트 저장 완료')
      } else {
        alert('루트가 삭제되었습니다.')
      }
    },
    showRoute(route){
      this.route = route
    }
  }
}
</script>

<style scoped>
.gMap {
  width: 100vw;
  height: 65vh;
}
</style>