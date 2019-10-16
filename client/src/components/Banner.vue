<template>
  <div class="banner">
    <div class="flex flex-row w-full h-full">
      <div class="left flex flex-row w-1/2 h-full">
        <img src="@/assets/laurent1.jpg" alt="banner1" class="w-full h-auto object-cover front" />
      </div>
      <div class="right flex flex-col w-1/2 h-full">
        <div class="w-full left-banner">
          <Carousel :loop="true" :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" :perPage="1" :navigationEnabled="false" :paginationEnabled="false">
            <Slide>
              <img
                class="w-full left-banner object-cover front"
                src="@/assets/f.jpg"
                alt="banner2"
              />
            </Slide>
            <Slide>
              <img
                class="w-full left-banner object-cover front"
                src="@/assets/banner7.jpg"
                alt="banner2"
              />
            </Slide>
            <Slide>
              <img
                class="w-full left-banner object-cover front"
                src="@/assets/sepatu3.jpg"
                alt="banner2"
              />
            </Slide>
          </Carousel>
        </div>
        <div class="w-full left-banner flex flex-row">
          <div class="w-1/2">
            <img
              class="w-full left-banner object-cover front"
              src="@/assets/banner2.jpg"
              alt="banner2"
            />
          </div>
          <div class="w-1/2">
            <img
              class="w-full left-banner object-cover front"
              src="@/assets/banner5.jpg"
              alt="banner2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "Banner",
  props: {
    msg: String
  },
  components: {
    Carousel,
    Slide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  margin-top: 7vh;
  height: calc(100vh - 13vh);
  width: 100%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.left-banner {
  height: 43.5vh;
}

.banner {
  object-fit: cover;
}
</style>
