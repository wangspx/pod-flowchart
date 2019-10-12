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
      elements: []
    };
  },
  computed: {
    dependencies() {
      let arr = [];
      let that = this;
      this.elements.forEach((item, index1) => {
        item.dependencies.forEach((i, index2) => {
          let color = that.getSatusColor(that.getElement(i.name).status);
          arr.push({
            source: item.name + "-anchor",
            target: i.name + "-anchor",
            info: {
              label: i.label,
              color: color,
              callback: () => {
                // alert("2222")
                // item.dependencies.splice(index, 1)
                that.delDependencuy(index1, index2);
              }
            }
          });
        });
      });
      return arr;
    }
  },
  components: {
    Element: element
  },
  methods: {
    delDependencuy(index, offset) {
      this.elements[index].dependencies.splice(offset, 1);
    },
    getElement(id) {
      return (
        this.elements.filter(item => {
          return item.name === id;
        })[0] || {}
      );
    },
    getSatusColor(val) {
      let color;
      switch (val) {
        case "pedding":
          color = "#bfbfbf";
          break;
        case "running":
          color = "#61B7CF";
          break;
        case "failed":
          color = "red";
          break;
        default:
          color = "#bfbfbf";
      }
      return color;
    }
  },
  created() {
    this.DrawTool = new DrawTool("canvas");
    this.elements = JSON.parse(localStorage.getItem("elements"));
  },
  watch: {
    elements (val) {
        console.log(val)
    },
    dependencies(val) {
      this.DrawTool.delConnects()
      val.forEach(item => {
        this.DrawTool.addConnects(item.source, item.target, item.info);
      });
    }
  },
  mounted() {
    this.DrawTool.addDraggable(".canvas .element");

    for (let i = 0; i < this.elements.length; i++) {
      this.DrawTool.addEndpoints(
        this.elements[i].name,
        "in" + this.elements[i].name,
        "target"
      );
      this.DrawTool.addEndpoints(this.elements[i].name, this.elements[i].name);
    }
  }
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

  z-index: 0;
}
</style>