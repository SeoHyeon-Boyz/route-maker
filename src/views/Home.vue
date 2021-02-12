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
      <GmapMarker
        :position="{lat: mymarker.lat, lng: mymarker.lng}"
      />
      <gmap-polyline :path.sync="route" :options="{ strokeColor:'#008000'}"></gmap-polyline>
    </GmapMap>
    <div>
      lat: {{mymarker.lat}} --- lng: {{mymarker.lng}}
    </div>
    <div>
      <button @click="myposition">시작</button>
      <button @click="clearWatch">끝</button>
    </div>
    <div>{{route}}</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      mymarker: {
        lat : 37.36723489852454,
        lng : 127.14162849294125
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
  },
  methods: {
    myposition : function() {
      if (navigator.geolocation) {
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