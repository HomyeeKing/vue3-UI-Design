<template>
	<button
		class="ho-button"
		@click="handleClick"
		:disabled="buttonDisabled || loading"
		:class="[
			type ? `ho-button--${type}` : '',
			buttonSize ? `ho-button--${buttonSize}` : '',
			{
				'is-disabled': buttonDisabled,
				'is-loading': loading,
				'is-plain': plain,
				'is-round': round,
				'is-circle': circle
			}
		]"
	>
		<i class="ho-icon-loading" v-if="loading"></i>
		<i :class="icon" v-if="icon && !loading"></i>
		<slot></slot>
	</button>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	getCurrentInstance,
	inject,
	toRefs,
	unref
} from 'vue';
export default defineComponent({
	name: 'HoButton',
	props: {
		type: {
			type: String,
			default: 'default'
		},
		size: {
			type: String
		},
		icon: {
			type: String
		},
		loading: Boolean,
		disabled: Boolean,
		plain: Boolean,
		round: Boolean,
		circle: Boolean
	},
	setup(props, context) {
		const { size, disabled } = toRefs(props);

		const useButtonSize = (size: number) => {
			const hoFormItem = inject('hoFormItem', {});

			const _hoFormItemSize = computed(() => unref(hoFormItem.hoFormItemSize));

			const buttonSize = computed(() => {
				return (
					size ||
					_hoFormItemSize.value ||
					(getCurrentInstance().proxy.$ELEMENT || {}).size
				);
			});

			return buttonSize;
		};

		const useButtonDisabled = (disabled: boolean) => {
			const hoForm = inject('hoForm', {});
			const buttonDisabled = computed(() => {
				return disabled || unref(hoForm.disabled);
			});

			return buttonDisabled;
		};
		const buttonSize = useButtonSize(+size.value);
		const buttonDisabled = useButtonDisabled(disabled.value);

		const handleClick = (e: MouseEvent) => {
			context.emit('click', e);
		};

		return {
			handleClick,
			buttonSize,
			buttonDisabled
		};
	}
});
</script>
