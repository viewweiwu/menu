import $ from 'jquery';
let common = {
    api: " https://cnodejs.org/api/v1",

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