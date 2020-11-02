import HoButton from './Button.vue';

HoButton.install = (app) => {
	app.component(HoButton.name, HoButton);
};

export default HoButton;
