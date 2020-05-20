module.exports.info = function info(text){
    console.log("Info ",text)
    return text
}

module.exports.error = function error(text){
    console.log("ERROR ",text)
    return text
}

//module.exports.info = info;