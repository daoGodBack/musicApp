
<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex===index}" v-for="(item,index) of dots" :key="index" @click="jumpPage(index)"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0,
      timer: {}
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let silderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let element = this.children[i]
        addClass(element, 'slider-item')
        element.style.width = silderWidth + 'px'
        width += silderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * silderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        let padgeIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          padgeIndex -= 1
        }
        this.currentPageIndex = padgeIndex

        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play() {
      let padgeIndex = this.currentPageIndex + 1
      if (this.loop) {
        padgeIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(padgeIndex, 0, 400)
      }, this.interval)
    },
    jumpPage(index) {
      this.slider.goToPage(index, 0, 400)
      this.currentPageIndex = index
      this._play()
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    }
  },
  destroyed() {
    this.clearTimeout(this.timer)
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>