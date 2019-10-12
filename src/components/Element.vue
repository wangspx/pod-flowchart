<template>
  <dir :id="id" class="element" :class="data.status" :style="position" @mouseover="isShowAnchor = true" @mouseout="isShowAnchor = false">
    <div>
      <span v-if="data.status == 'pending'">
        <i class="fa fa-spinner fa-pulse fa-4x"></i>
      </span>
      <span v-if="data.status == 'running'">
        <i class="fa fa-cog fa-spin fa-4x"></i>
      </span>
      <img
        src="https://d1q6f0aelx0por.cloudfront.net/fa443219-42e0-4886-96b4-8733de694b72-c641a5d6-1ebf-44ee-9607-aef9b4ca1a3b-logo_large.png"
      />
      <p class="name">{{data.name}}</p>
      <p class="type">{{data.type}}</p>
      <!-- <p>
        <span>{{data.time}}</span>
      </p>-->
    </div>
    <div :id="id + '-anchor'" class="anchor" :class="{hover: isShowAnchor}"></div>
  </dir>
</template>

<script>
export default {
  name: "Element",
  data () {
    return {
      isShowAnchor: false
    }
  },
  props: {
    id: String,
    data: Object
  },
  computed: {
    position() {
      return {
        left: this.data.position.x + "px",
        top: this.data.position.y + "px"
      };
    }
  }
};
</script>

<style scoped>
.element {
  min-width: 6rem;
  min-height: 4rem;
  font-size: 0.4rem;
  border: 0.05rem solid #ddd;
  border-radius: 0.4rem;
  background: #fff;
  text-align: center;
  cursor: move;

  margin: auto;
  padding: 0.4rem;

  display: inline-block;
  position: absolute;
  z-index: 100;
}

.element .anchor {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 0.4rem;
  cursor: crosshair;

  position: absolute;
  opacity: 0;

  z-index: -1;

  border: 0.4rem solid #ddd;

  transform: scale(1.15);
}

.element .anchor:hover {
  opacity: 0.5;
}

.element .anchor:hover {
  display: unset;
}

.element.running {
  color: #2aab82;
  border: 0.05rem solid #2aab82;
}

.element.failed {
  border: 0.05rem solid red;
}

.element.failed::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0.4rem solid red;
  border-radius: 0.4rem;
  animation: failed 1.2s infinite ease-in-out;
  content: "";
}

.element img {
  height: 2rem;
  width: 2rem;
}

.element span {
  background: #fff;

  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  z-index: 999;
}

/* .element i::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #52c41a;
  border-radius: 50%;
  -webkit-animation: antStatusProcessing 1.2s infinite ease-in-out;
  animation: antStatusProcessing 1.2s infinite ease-in-out;
  content: "";
} */

.element .name {
  color: #000;
  margin: 0.3rem 0;
  margin-bottom: 0;
}

.element .type {
  margin: 0;
  color: #cccccc;
}

@keyframes failed {
  0% {
    transform: scale(1);
    opacity: 0.2;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>
