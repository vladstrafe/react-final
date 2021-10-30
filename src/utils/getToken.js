export default function getToken() {
	const cookie = 'token'
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + cookie.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined
}