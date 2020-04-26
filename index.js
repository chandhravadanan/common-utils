
function getDummyPromise(){
    return new Promise((res, rej)=>{});
}

function isPost(req){
    return req.method === 'POST';
}

function sendJson(res, statusCode, data){
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = statusCode;
    res.end(JSON.stringify(data));
}

function sendResponse(res, statusCode, message){
    sendJson(res, statusCode, { msg : message })
}

function sendErrResponse(res, errCode, message){
    sendJson(res, errCode, {msg: message})
}

function isEmpty(str){
    return str===undefined || str===null || str==='';
}

function isAlphaNumeric(str){
    if(!str){
        return false
    }
    return /^[a-z0-9]+$/i.test(str)
}

function redirect(res, path){
    res.writeHead(302, {Location: path});
    res.end();
}

function readInputStreamJson(req){
    return new Promise((resolve)=>{
        let data = ''
        req.setEncoding('utf-8')
        req.on('data', (chunk)=>{
            data += chunk
        })
        req.on('end', ()=>{
            let jsonData = {}
            try{
                jsonData = JSON.parse(data)
            }catch(e){
                console.log('parser err', e)
            }
            resolve(jsonData)
        })
    })
}

module.exports = {
    getDummyPromise,
    isPost,
    sendJson,
    sendResponse,
    sendErrResponse,
    isEmpty,
    isAlphaNumeric,
    redirect,
    readInputStreamJson
}