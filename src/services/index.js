import { message } from 'antd';
import { localPath } from '../config';

// function toQueryString(obj) {
// 		return obj ? Object.keys(obj).sort().map(function (key) {
// 				var val = obj[key];
// 				if (Array.isArray(val)) {
// 						return val.sort().map(function (val2) {
// 								return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
// 						}).join('&');
// 				}
//
// 				return encodeURIComponent(key) + '=' + encodeURIComponent(val);
// 		}).join('&') : '';
// }

export function getData (url, method = 'GET', param = {}) {
	url = localPath  + url;
	const ajaxParams = {
		method: method,
	};

	if (method === 'GET') {


	} else if (method === 'POST'){
		Object.assign(ajaxParams, {
			//如果是后端需要 类似?q=1&b=2参数 post请求header中 一定要用'application/x-www-form-urlencoded' 类型
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				// 'Content-Type': 'multipart/form-data' //file上传时采用
				// 'Content-Type': 'application/x-www-form-urlencoded'
			},
			// body: toQueryString(param) //json拼接为字符串,
			body:JSON.stringify(param)
		});
	}
	return new Promise ((resolve, reject) => {
		fetch((url), ajaxParams)
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
		      return response.json();
		    } else {
		      var error = new Error(response.statusText || response.status);
		      error.response = response;
		      return reject({error});
		    }
				// console.log(ajaxParams,'ajaxParams');
				// return response.json();
			})
			.then((responseJson) => {
				if(responseJson.error && responseJson.resultCode < 0){

					if( responseJson.resultCode === -20000){
						// isLogin();
					}else {
						message.error(responseJson.error);
					}
				}
				// return responseJson.movies;
				// console.log(responseJson,'responseJson')
				resolve(responseJson);
			})
			.catch((error) => {
				reject(error);
			});
	});

}
