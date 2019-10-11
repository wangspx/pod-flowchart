<template>
  <div id="app">
    <Container />
  </div>
</template>

<script>
import Container from "./components/Container";

export default {
  name: "app",
  components: {
    Container
  }
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
  vertical-align: middle;
  box-sizing: border-box;
  font-style: unset;
}

.aLabel {
  background-color: white;
  padding: 0.4em;
  font: 12px sans-serif;
  color: #444;
  z-index: 97;
  border: 1px dotted gray;
  opacity: 0.8;
  cursor: pointer;
}

.jtk-connector {
  cursor: pointer;
}

.jtk-connector.jtk-hover {
  z-index: 96;
}

.jtk-endpoint.jtk-endpoint-anchor.jtk-draggable.jtk-droppable {
  cursor: crosshair;
  z-index: 100;
  /* opacity: 0; */
}

.aLabel i {
  display: none;
}

.aLabel.jtk-hover {
  background-color: #5c96bc;
  color: white;
  border: 1px solid white;
  z-index: 99;
}

.aLabel.jtk-hover i{ 
  display: unset;
}
</style>
