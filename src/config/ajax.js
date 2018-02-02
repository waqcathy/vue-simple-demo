export default (type='GET',url='',data={},async=true) =>{
    return new Promise((resolve,reject)=>{
        type = type.toLowerCase();
        let requestObj;
        if(window.XMLHttpRequest){
            requestObj = new XMLHttpRequest();
        }else{
            requestObj = new ActiveXObject;
        }
        if(type == 'GET'){
            let dataStr = '';
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&';
            })
            dataStr = dataStr.substr(0,dataStr.lastIndexOf('&')) //去掉末尾的&
            url = url + '?' +dataStr;
            requestObj.open(type,url,async);
            requestObj.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            requestObj.send();
        }else if(type == 'POST'){
            requestObj.open(type,url,async);
            requestObj.setRequestHeader("Content-type","application/json");
            requestObj.send(JSON.stringify(data));//与请求头对应
        }else{
            reject('error type')
        }
        requestObj.onreadystatechange = () => {
            if(requestObj.readyState == 4){
                if(requestObj.status == 200){
                    let obj = requestObj.response;
                    if(typeof obj !== 'object'){
                        obj = JSON.parse(obj);
                    }
                    resolve(obj);
                }else{
                    reject(requestObj);
                }
            }
        }
    })
}