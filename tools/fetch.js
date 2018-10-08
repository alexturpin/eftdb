const pako = require('pako');
const request = require('request');
const fs = require('fs');
 
const requestOptions = {
	url: 'http://prod.escapefromtarkov.com/client/trading/api/getTradersList',
	method: 'POST',
	gzip: true,
	encoding: null,
	headers: {
		'Accept': '*/*',
		'Accept-Encoding': 'identity',
		'User-Agent': 'UnityPlayer/5.6.6f2 (http://unity3d.com)',
		'Cookie': 'PHPSESSID=',
		'X-Unity-Version': '5.6.6f2',
		'Connection': 'Keep-Alive',
		'Host': 'prod.escapefromtarkov.com'
	}
};

request(requestOptions, (err, response, body) => {
	if (err) {
		throw err;
	}

	const decompressed = pako.inflate(body, {
		to: 'string',
	});

	fs.writeFileSync('items.json', decompressed, 'utf-8');
})
	.on('response', response => {
		response.headers['Content-Encoding'] = 'deflate';
	})
	.on('error', err => {
		throw err;
	});
