<template>
	<div id="home">
		<header>
			Header
		</header>
		<main class="main_content"></main>
		<footer></footer>

		<Backtop target="#home" visibilityHeight="200">
			<i>🚀</i>
		</Backtop>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Backtop from '../../packages/backtop/src/index.vue';

export default defineComponent({
	name: 'Home',
	components: { Backtop },
	setup() {
		const str = '[object RawType]';
		console.log(str.slice(8, -1));
	}
});
</script>

<style scoped>
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
