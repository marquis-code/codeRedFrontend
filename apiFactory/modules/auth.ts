import { GATEWAY_ENDPOINT } from '../axios.config'
export const auth_api = {
	$_login: (credential: any) => {
		const url = '/auth/login'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_hospital_signup: (payload: any) => {
		const url = '/hospitals'
		return GATEWAY_ENDPOINT.post(url, payload)
	},
	$_update_profile: (payload: any) => {
		const url = '/admins/profile'
		return GATEWAY_ENDPOINT.patch(url, payload);
	},
	$_change_password: (payload: any) => {
		const url = '/admins/password'
		return GATEWAY_ENDPOINT.patch(url, payload);
	},
	$_get_profile: () => {
		const url = '/admins/profile'
		return GATEWAY_ENDPOINT.get(url);
	},

}
