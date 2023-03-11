import Alpine from 'alpinejs';

window.Alpine = Alpine;

interface IDropdown {
	open: Boolean;
	toggle: () => void;
}

Alpine.data('dropdown', () => {
	const obj: IDropdown = {
		open: false,

		toggle() {
			this.open = !this.open;
		},
	};

	return obj;
});

Alpine.start();

interface ITest {
	id: String;
	title: String;
	age: Number;
}

document.addEventListener('DOMContentLoaded', () => {
	const testObject: ITest = {
		id: 'sdasds',
		title: 'yasar',
		age: 44,
	};

	console.log(testObject);
});
