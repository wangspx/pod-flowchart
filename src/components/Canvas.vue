<template>
  <div class="canvas">
    <Element v-for="element in elements" :key="element.name" :id="element.name" :data="element"></Element>
  </div>
</template>

<script type="text/ecmascript-6">
import element from "./Element";
import DrawTool from "../tool/DrawTool";
import { link } from "fs";

export default {
  name: "Canvas",
  data() {
    return {
      DrawTool: null,
      elements: [
        {
          name: "web",
          type: "pod",
          status: "running",
          time: "2019-10-9 17:50:26",
          dependencies: ["nginx"],
          position: {
            x: 94,
            y: 211
          }
        },
        {
          name: "nginx",
          type: "pod",
          status: "running",
          time: "2019-10-9 17:50:26",
          dependencies: ["app1", "app2"],
          position: {
            x: 310,
            y: 211
          }
        },
        {
          name: "app1",
          type: "deploy",
          status: "running",
          dependencies: ["redis", "mysql"],
          time: "2019-10-9 17:50:26",
          position: {
            x: 583,
            y: 330
          }
        },
        {
          name: "app2",
          type: "deploy",
          status: "running",
          dependencies: ["redis", "mysql"],
          time: "2019-10-9 17:50:26",
          position: {
            x: 583,
            y: 133
          }
        },
        {
          name: "redis",
          type: "deploy",
          status: "running",
          dependencies: ["fs"],
          time: "2019-10-9 17:50:26",
          position: {
            x: 859,
            y: 452
          }
        },
        {
          name: "mysql",
          type: "deploy",
          status: "failed",
          dependencies: ["fs"],
          time: "2019-10-9 17:50:26",
          position: {
            x: 857,
            y: 108
          }
        },
        {
          name: "fs",
          type: "volumes",
          status: "pending",
          time: "2019-10-9 17:50:26",
          dependencies: [],
          position: {
            x: 1111,
            y: 211
          }
        }
      ]
    };
  },
  components: {
    Element: element
  },
  created() {
    this.DrawTool = new DrawTool("canvas");
  },
  mounted() {
    this.DrawTool.addDraggable(".canvas .element");

    for (let i = 0; i < this.elements.length; i++) {
      this.DrawTool.addEndpoints(this.elements[i].name, "in" + this.elements[i].name, "target");
      this.DrawTool.addEndpoints(this.elements[i].name, "out" + this.elements[i].name);
    }
    for (let i = 0; i < this.elements.length; i++) {
      this.DrawTool.addConnects(
        "out" + this.elements[i].name,
        this.elements[i].dependencies.map(val => { return "in" + val})
      );
    }
  },
};
</script>

<style scoped>
.canvas {
  height: 100%;
  width: 86%;

  overflow: hidden;

  background-image: linear-gradient(90deg, #eee 1%, rgba(0, 0, 0, 0) 10%),
    linear-gradient(#eee 1%, rgba(0, 0, 0, 0) 10%);
  background-size: 1rem 1rem;

  display: inline-block;

  position: relative;
}
</style>