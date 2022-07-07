import UseToken from '@/composables/UseToken.js';

const {
	token
} = UseToken();

export const request = (url, data, method = 'GET') => {
	console.log('token', token.value);
	uni.showLoading({
		title: '请稍候'
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://yidea.ysjf.com' + url,
			data,
			header: {
				authorization: `Bearer ${token.value}`,
			},
			method: method,
			success: (res) => {
				console.log('http request', res)
				uni.hideLoading();
				resolve(res.data);
			},
			fail: (error) => {
				console.error(error);
				uni.hideLoading();
				reject(error);
			}
		})
	})

}
