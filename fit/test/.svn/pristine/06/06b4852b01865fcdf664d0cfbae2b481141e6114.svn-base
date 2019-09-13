PAYPAL_CLIENT = 'Ad7QQ8D0_0-o_eyTVWWgFrGlJO8lnD_jsNiJPl-dJR8Us_Z_nO4_7Rwpmr-YS5fQ2dERhU9QT8zILlSm';
PAYPAL_SECRET = 'EIMYiq1kyYJKyJYbR17IXo01X9YiS2FZIuxK0B4o8zrOUHMIRqY3iudFvFWppKfCvD9os9z5tT_N2EK9';

PAYPAL_OAUTH_API = 'https://api.paypal.com/v1/oauth2/token/';
PAYPAL_ORDER_API = 'https://api.paypal.com/v2/checkout/orders/';

basicAuth = Base64.encode(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`);

let Url = PAYPAL_OAUTH_API;
let xhr = new XMLHttpRequest();
let dataTonken;
xhr.open("post", Url, true);
xhr.setRequestHeader('Accept', 'application/json');
xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
xhr.setRequestHeader('Authorization', `Basic ${basicAuth}`);
console.log("---------初始化-baseicauth---------");
xhr.send("grant_type=client_credentials");
xhr.onreadystatechange = doResult;

function doResult() {
	if (xhr.readyState == 4 && xhr.status == 200) { //4代表执行完成       	
		dataTonken = eval("(" + xhr.responseText + ")");
		console.log("接受支付令牌token");
	}
}

function handleRequest(request, response) {
	console.log("----异常捕获-handlerequest---");
	orderID = request.body.orderID;
	let details;
	let url = PAYPAL_ORDER_API + orderID;
	let ajax = new XMLHttpRequest();
	ajax = open("GET", url, true);
	ajax.setRequestHeader("Accept", "application/json");
	ajax.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
	ajax.setRequestHeader("Authorization", `Bearer ${dataTonken.access_token}`);
	// ajax.send('{"intent": "CAPTURE","purchase_units": [{"amount": {"currency_code": "USD","value": "100.00"}}]}');
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) { //4代表执行完成    
			details = ajax.responseText;
			conlose.log("异常处理-初始化");
			console.log("异常的回调:" + ajax.responseText);
		}
	}
	if (details.error) {
		return response.send(500);
	}
	if (details.purchase_units[0].amount.value !== '0.06') {
		return response.send(400);
	}
	database.saveTransaction(orderID);
	return response.send(200);

}
