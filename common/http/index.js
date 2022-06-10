import UseToken from '@/composables/UseToken.js';

const {
	token
} = UseToken();

export const request = (url, data, method = 'GET') => {
	console.log('token', token.value);
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://10.80.1.4:1627' + url,
			data,
			header: {
				authorization: `Bearer ${token.value}`,
			},
			method: method,
			success: (res) => {
				console.log('http request', res)
				resolve(res.data);
			},
			fail: (error) => {
				console.error(error);
				reject(error);
			}
		})
	})

}
