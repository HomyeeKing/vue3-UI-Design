<template>
	<transition name="fade">
		<div @click="toTop" class="toTop" v-if="visible">
			<slot>UP</slot>
		</div>
	</transition>
</template>

<script lang="ts">
import throttle from 'lodash.throttle';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import useReactive from '../../../src/utils/useReactive';

export default defineComponent({
	name: 'ELBacktop',
	props: {
		visibilityHeight: {
			type: [Number, String],
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
	setup(props) {
		let container: HTMLElement | Document = document,
			el: HTMLElement | null = document.documentElement;
		const visible = ref(false);
		const { target, visibilityHeight } = useReactive(props);
		const init = () => {
			if (target) {
				el = document.querySelector(target.value as string);
				if (!el) {
					throw new Error(`target is not existed: ${target.value}`);
				}
				container = el;
			}
		};
		/**
		 * 判断是否满足显示的条件
		 */
		const onScroll = () => {
			const scrollTop = el!.scrollTop;

			visible.value = scrollTop >= +visibilityHeight;
		};
		const throttleScrollHandler = throttle(onScroll, 300);
		onMounted(() => {
			init();
			container.addEventListener('scroll', onScroll);
		});
		onUnmounted(() => {
			console.log('unmounted');

			container.removeEventListener('scroll', throttleScrollHandler);
		});
		const toTop = () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		};

		return {
			toTop,
			visible
		};
	}
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

.toTop {
	width: 50px;
	height: 50px;
	position: fixed;
	right: 10px;
	bottom: 20px;
	background-color: goldenrod;
	border-radius: 20px;
	text-align: center;
	line-height: 50px;
	cursor: pointer;
	font-weight: bold;
}
</style>
