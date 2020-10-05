import { createStore } from "vuex";
export interface State {
  count: number;
}
const state: State = {
  count: 0
};
export const store = createStore({
  state
});
