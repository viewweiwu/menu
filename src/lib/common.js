import $ from 'jquery';
let common = {
    api: " https://cnodejs.org/api/v1",
    isPhone() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid || isiOS;
    },
    getType(value) {
        let result = value;
        switch (value) {
            case "job":
                result = "招聘";
                break;
            case "good":
                result = "精华";
                break;
            case "share":
                result = "分享";
                break;
            case "ask":
                result = "问答";
                break;
            default:
                result = "全部"
                break;
        }
        return result;
    },
    formatCurrency(num) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        let sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
        return ("￥" + ((sign) ? '' : '-') + num + '.' + cents);
    },
    ajaxGet(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                data: data || {},
                success: data => {
                    resolve(data);
                },
                error: data => {
                    reject();
                    console.error("数据请求失败");
                }
            })
        });
    }
}


export default common;