import UseToken from '@/composables/UseToken.js';
import {
	request
} from '@/common/http/index.js';

const {
	token
} = UseToken();

export const login = (code) => {
	return request('/api/auth/token', {
		code,
	}, 'POST').then(res => {
		console.log('token1', res);
		token.value = res.token;
		console.log('token', token.value);
	})
}


export const getMyprofile = () => {
	return request('/api/auth/profile', {}, 'GET').then(res => {
		console.log('profile', res);
	})
}


export const getUserInfoByOpenId = (openId) => {
	return request(`/api/openid/${openId}`, {}, 'GET').then(res => {
		return res;
	})
}
