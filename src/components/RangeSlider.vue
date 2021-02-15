<template>
  <div>
    <vue-slider
    v-model="value"
    :tooltip="'none'"
    :data="data" />
    {{value}}
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'RangeSlider',
  data() {
    return {
      value: [0, null],
      data: []
    }
  },
  components: {
    VueSlider
  },
  props: [
    'len'
  ],
  mounted () {
    const idxData = []
    for (let i = 0; i < this.len; i++) idxData.push(i)
    this.value = [0, this.len - 1]
    this.data = idxData
  },
  computed: {
  },
  methods: {
  },
  watch: {
    'value' (to, from) {
      this.$emit('emitIdxRange', this.value)
    }
  }
}
</script>