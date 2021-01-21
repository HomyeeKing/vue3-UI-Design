<template>
  <div id="home">
    <header></header>
    <main class="main_content">
      <button @click="increment">just primitive {{ count }}</button>
      <button @click="incrementRe">reactive.count : {{ obj.count }}</button>
    </main>
    <footer></footer>

    <Backtop target="#home" visibilityHeight="200">
      <i>🚀</i>
    </Backtop>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  isReactive,
  isRef,
  reactive,
  Ref,
  ref,
  toRaw,
  watch,
  watchEffect,
} from "vue";
import { effect, readonly } from "@vue/reactivity";
import Backtop from "packages/backtop/src/index.vue";
declare const RefSymbol: unique symbol;
interface Test {
  [RefSymbol]: true;
  ["test"]: string;
  _test: number;
}
export default defineComponent({
  name: "Home",
  components: { Backtop },
  setup() {
    let count = 0;
    const obj = reactive({ count: 0 });
    type PrimitiveGetter = () => typeof count;
    type ReactiveGetter = () => typeof obj.count;
    watch(
      () => count,
      (count) => {
        console.log("primitive" + count);
      }
    );
    watch(
      () => obj.count,
      (count) => {
        console.log(
          "reactive" + count,
          "but the type are same " +
            "\n" +
            `type PrimitiveGetter = () => typeof count \n === \n  type ReactiveGetter = () => typeof obj.count`
        );
      }
    );

    const increment = () => {
      count++;
    };
    const incrementRe = () => {
      obj.count++;
    };
    return {
      count,
      increment,
      incrementRe,
      obj,
    };
  },
});
</script>

<style lang="scss" scoped>
#home {
  width: 100vw;
  height: 100vh;
}
header {
  height: 15%;
  background-color: brown;
}

main {
  height: 2000px;
  padding: 0 100px;
  background-color: burlywood;
}
</style>
