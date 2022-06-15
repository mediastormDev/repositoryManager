import {
	ref
}
from 'vue';


const selectedGears = ref([]);

export default () => {

	const removeItems = (items) => {
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			item.selected = false;
			removeItem(item);
		}
	}

	const addItem = (item) => {
		const added = selectedGears.value.some(old => {
			return old._id == item._id
		})
		if (!added) {
			selectedGears.value.push(item);
		}
	}

	const removeItem = (item) => {
		let index = -1;
		for (let i = 0; i < selectedGears.value.length; i++) {
			const added = selectedGears.value[i];
			if (added._id == item._id) {
				index = i;
			}
		}
		selectedGears.value.splice(index, 1);
	}


	return {
		addItem,
		removeItems,
		removeItem,
		selectedGears
	}
}
