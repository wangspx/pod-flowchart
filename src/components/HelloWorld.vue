<template>
  <div class="hello">
    <Element v-for="element in elements" :key="element.name" :id="element.name" :data="element"></Element>
  </div>
</template>

<script>
import element from "./Element";
import { link } from 'fs';

export default {
  name: "HelloWorld",
  components: {
    Element: element
  },
  data(){
    return {
      elements: [
        {
          name: "web",
          time: "2019-10-9 17:50:26",
          position: {
            x : 100,
            y : 200,
          },
          link: {

          }
        },
        {
          name: "nginx",
          time: "2019-10-9 17:50:26",
          position: {
            x : 405,
            y : 206,
          }
        }
      ]
    }
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
