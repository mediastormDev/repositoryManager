import {
	request
} from '@/common/http/index.js';



export const previewTicket = (barcodes, pendingLentAt, pendingReturnAt) => {
	return request('/api/ticket/preivew', {
		barcodes,
		pendingLentAt,
		pendingReturnAt
	}, 'POST').then(res => {
		return res;
	})
}


export const createTicket = (barcodes, pendingLentAt, pendingReturnAt) => {
	return request('/api/ticket/', {
		barcodes,
		pendingLentAt,
		pendingReturnAt
	}, 'POST').then(res => {
		return res;
	})
}
