import {
	request
} from '@/common/http/index.js';



export const previewTicket = (barcode) => {
	return request(`/api/borrow/barcode/${barcode}`, {}).then(res => {
		return res;
	})
}
