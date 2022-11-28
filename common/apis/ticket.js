import {
	request
} from '@/common/http/index.js';



export const previewTicket = (barcodes, pendingLentAt, pendingReturnAt, ticketId) => {
	const data = {
		barcodes,
		pendingLentAt,
		pendingReturnAt
	}
	if (ticketId) {
		data.ticketId = ticketId
	}
	return request('/api/ticket/preivew', data, 'POST').then(res => {
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

export const updateTickeDate = (ticketId, pendingLentAt, pendingReturnAt) => {
	return request(`/api/ticket/${ticketId}/update`, {
		pendingLentAt,
		pendingReturnAt
	}, 'POST').then(res => {
		return res;
	})
}

export const cancelTicket = (ticketId) => {
	return request(`/api/ticket/${ticketId}/cancel`, {}, 'POST').then(res => {
		return res;
	})
}


export const getTickets = () => {
	return request('/api/ticket', {}, 'GET').then(res => {
		return res;
	})
}

export const getTicketsAll = () => {
	return request('/api/ticket/all', {}, 'GET').then(res => {
		return res;
	})
}

export const getTicketsHistory = () => {
	return request('/api/ticket/history', {}, 'GET').then(res => {
		return res;
	})
}


export const removeGear = (ticketId, borrowId) => {
	return request(`/api/ticket/${ticketId}/${borrowId}/remove`, {}, 'POST').then(res => {
		return res;
	})
}
