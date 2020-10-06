<template>
	<div>
		<h1>{{ msg }}</h1>
		<h2>count is {{ count }}</h2>
		<button @click="inc(2)">inc 2</button>
		<button @click="reset">reset</button>
		<button @click="dec(10)">dec 10</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useCount from '@/utils/useCount';
export default defineComponent({
	name: 'Home',
	setup() {
		const { current: count, inc, dec, set, reset } = useCount(2, {
			min: 1,
			max: 15
		});
		const msg = ref('Demo useCount');
		return {
			count,
			inc,
			dec,
			set,
			reset,
			msg
		};
	}
});
</script>

<style scoped></style>
