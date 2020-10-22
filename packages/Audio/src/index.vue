<template>
	<div class="wr-audio">
		<i class="iconfont" :class="initState.playState" @click="playOrPause"></i>
		<div class="control-bar" ref="controlBar">
			<div class="fill" ref="fillBar"></div>
			<div
				class="handle"
				:class="{ active: initState.isPlay }"
				ref="handleDot"
			></div>
		</div>

		<span class="current-time">{{ transTime(initState.currentTime) }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'Audio',
	setup() {
		const audioCtx = new AudioContext();
		const oscillator = audioCtx.createOscillator();
		// 波形的类型
		oscillator.type = 'sine';
		// 声音的频率
		oscillator.frequency.value = 880;

		oscillator.connect(audioCtx.destination);
		oscillator.start();
	}
});
</script>

<style scoped lang="scss">
$audio-bg: #f8f8f8;
$control-bar-bg: #e0e0e0;
$control-bar-width: 120px;
$control-bar-height: 2px;
$control-bar-dot-height: 18px;
$control-bar-dot-width: $control-bar-dot-height;
$control-bar-fill-color: #000;
.wr-audio {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 231px;
	height: 40px;
	outline: none;
	background-color: $audio-bg;
	border-radius: 16px;
	border-top-left-radius: 4px;
	margin-bottom: 40px;
}

.play,
.control-bar {
	cursor: pointer;
}

.control-bar {
	width: $control-bar-width;
	height: $control-bar-height;
	background-color: $control-bar-bg;
	display: flex;
	align-items: center;

	& > .fill {
		height: $control-bar-height;
		background-color: $control-bar-fill-color;
		border-radius: 20px;
	}

	& > .handle {
		width: $control-bar-dot-width;
		height: $control-bar-dot-height;
		background-color: #000;
		border-radius: 50%;
	}
}

.active {
	animation: shining 2s ease-in 0.5s infinite;
}

@keyframes shining {
	50% {
		box-shadow: 0 0 10px 2px goldenrod;
	}
	100% {
		box-shadow: none;
	}
}
</style>
