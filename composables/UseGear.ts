import { ref } from "vue"
import { getAssets, getAssetsByType, getFav } from '@/common/apis/assets.js';
import { previewTicket } from '@/common/apis/borrow.js';
import { isDate } from "lodash";

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

const gearList = ref<any[]>([]);
const nowGearList = ref<any[]>([]);
const nowType = ref('');
const orderList = ['摄影机', '微单', '运动相机', 'EF口', 'E卡口', 'RF口', 'V口电池',
	'FZ100电池', '970电池', 'LPE6电池', '图传', '监视器', '稳定器', '三脚架', '云台', '滑轨', '滤镜'].reverse()

export default () => {

	const getAssetList = () => {
		return getAssets().then(res => {
			let tempArr = res.map((item, index) => {
				return {
					name: item,
					selected: false
				}
			})
			tempArr = tempArr.sort((a, b) => {
				return orderList.indexOf(b.name) - orderList.indexOf(a.name);
			});
			tempArr.map((item, index) => {
				if (index === 0) {
					getMyAssetByType(item.name);
				}
				item.selected = index === 0
				return item
			})
			console.log('tempArr', tempArr);
			gearList.value = tempArr;
			return gearList.value;
		})
	}

	const getMyAssetByType = (type, pendingLentAt?, pendingReturnAt?) => {
		console.log('pendingLentAt', pendingLentAt, typeof pendingLentAt);
		console.log('pendingReturnAt', pendingReturnAt);
		if ((pendingLentAt !== undefined) && (pendingReturnAt !== undefined)) {
			return getAssetsByType(type, pendingLentAt, pendingReturnAt).then(res => {
				nowGearList.value = res;
				console.log('nowGearList', nowGearList.value)
				return res;
			})
		} else {
			return getAssetsByType(type).then(res => {
				nowGearList.value = res;
				console.log('nowGearList', nowGearList.value)
				return res;
			})
		}

	}

	const getMyFavList = (pendingLentAt?, pendingReturnAt?) => {
		return getFav(pendingLentAt, pendingReturnAt).then(res => {
			nowGearList.value = res;
			console.log('fav', res);
			return res;
		})
	}

	const getBookInfo = (barcode) => {
		return previewTicket(barcode);
	}

	return {
		getAssetList,
		getMyFavList,
		getMyAssetByType,
		getBookInfo,
		nowGearList,
		nowType,
		gearList
	}
}