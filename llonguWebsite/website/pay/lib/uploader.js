//上传
function uploadToOss(path,ext,callback) {
    var key = 'TpayIm/' + random_string(5) + Date.parse(new Date()) / 1000 + random_string(5) + '.' + ext;
    accessid= 'LTAIeYRciWnQkwz1';
    accesskey= 'kZ1ao8U4byg2mfb4SC7JqSClHPqFbm';
    host = 'http://musongtest.oss-cn-shanghai.aliyuncs.com';
    var policyText = {
        "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        "conditions": [
            ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
        ]
    };
    var policyBase64 = Base64.encode(JSON.stringify(policyText));
    var bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, { asBytes: true }) ;
    var signature = Crypto.util.bytesToBase64(bytes);
    api.ajax({
        url: host,
        method: 'post',
        data: {
            values: {
                'key' : key,
                'policy': policyBase64,
                'OSSAccessKeyId': accessid,
                'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                'signature': signature
            },
            files: {
                file: path
            }
        }
    }, function(ret, err) {
        if (err.statusCode == 200) {
            callback && callback(host + '/' + key);
        }
    });
}

function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}