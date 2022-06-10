import { ref } from "vue"
import { getAssets, getAssetsByType } from '@/common/apis/assets.js';
import { previewTicket } from '@/common/apis/borrow.js';

export enum GearStatus {
	free = 'IDLE',
	booked = 'PENDING',
	lend = 'INUSE',
	repair = 'REPAIR'
}

export const GearStatusString = {
	IDLE: '空闲',
	PENDING: '锁定',
	INUSE: '占用',
	REPAIR: '维修'
}

export type Gear = {
	_id?: String;
	name: String;
	image: String;
	barcode: String;
	status: GearStatus;
	type: String;
	selected: Boolean;
}

export type TypeItem = {
	name: String;
	selected: Boolean;
}

const gearList = ref < any[] > ([]);
const nowGearList = ref < any[] > ([]);

export default () => {

	const getAssetList = () => {
		return getAssets().then(res => {
			return gearList.value = res.map((item, index) => {
				if (index === 0) {
					getMyAssetByType(item);
				}
				return {
					name: item,
					selected: index === 0
				}
			})
		})
	}

	const getMyAssetByType = (type) => {
		return getAssetsByType(type).then(res => {
			nowGearList.value = res;
			console.log('nowGearList', nowGearList.value)
			return res;
		})
	}
	
	const getBookInfo = (barcode) => {
		return previewTicket(barcode);
	}

	return {
		getAssetList,
		getMyAssetByType,
		getBookInfo,
		nowGearList,
		gearList
	}
}