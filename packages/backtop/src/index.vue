<template>
	<transition name="fade">
		<div @click="toTop">click me to top</div>
	</transition>
</template>

<script>
import { throttle } from 'throttle-debounce';
import { onMounted } from 'vue';

const cubic = (value) => Math.pow(value, 3);
const easeInOutCubic = (value) =>
	value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
export default {
	name: 'ELBacktop',
	props: {
		visibilityHeight: {
			type: Number,
			default: 200
		},
		target: [String],
		right: {
			type: Number,
			default: 40
		},
		bottom: {
			type: Number,
			default: 40
		}
	},
	setup() {
		const toTop = (e) => {
			console.log(e);
		};

		return {
			toTop
		};
	}
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
