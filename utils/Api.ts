import 'whatwg-fetch'

export class Api {

	url: string = "http://192.168.137.1/handy/";

	post(url: string, data: string = "", error = null) {
		return fetch(this.url + url, {
    		method: 'POST',
    		body: data,
    		headers: {
	            "Content-Type": "application/x-www-form-urlencoded",
	        }
    	})
        .then(res => res.json());
	}

	postTest(url: string, data: string = "", error = null) {
		return fetch(this.url + url, {
    		method: 'POST',
    		body: data,
    		headers: {
	            "Content-Type": "application/x-www-form-urlencoded",
	        }
    	});
	}
}