<template>
  <dir class="container">
      <Draggable />
      <Canvas />
  </dir>
</template>

<script>
import Draggable from "./Draggable"
import Canvas from "./Canvas"

export default {
  name: "Container",
  components: {
    Draggable,
    Canvas
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>
