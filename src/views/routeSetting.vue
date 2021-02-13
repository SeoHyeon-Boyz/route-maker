<template>
  <div class="routeSetting">
    <div class="routeForm">
      <div class="inputBox">
        <input v-model="title" placeholder="제목을 입력해주세요."/>
      </div>
      <!-- 루트를 시간별로 나열해서 앞뒤 부분은 자를 수 있게 -->
      <div @click="saveRoute">저장</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'routeSetting',
  data() {
    return {
      title: null
    }
  },
  components: {
  },
  props: [
    'routeData'
  ],
  created () {
    if (!this.routeData) {
      alert('잘못된 접근입니다.')
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
        route: this.routeData
      }
      this.addRoute(res)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
</style>