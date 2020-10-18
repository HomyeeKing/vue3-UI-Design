import { reactive, toRefs } from 'vue';
interface ReactiveObj {
	[key: string]: unknown;
}
export default function useReactive(obj: ReactiveObj) {
	const state = reactive(obj);
	return toRefs(state);
}
