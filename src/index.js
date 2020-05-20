var http = require("http")
var {info,error} = require('./modules/my-log')
var {countries} = require("countries-list")
var url = require("url")
var querystring = require("querystring")

var server = http.createServer(function(request,response){

    var parse = url.parse(request.url)

    console.log(parse)

    var query = querystring.parse(parse.query)

    console.log("query ",query)

    var pathname = parse.pathname

    if(pathname === '/'){

        //200 significa que todo es correcto
        response.writeHead(200,{'Content-Type':'text/html'}) //cabezera del write
        response.write('<html><body><p>hello<p></body></html>')
        response.end() //enviar la respuesta al cliente
    }
    else if(pathname === '/exit'){

        //200 significa que todo es correcto
        response.writeHead(200,{'Content-Type':'text/html'}) //cabezera del write
        response.write('<html><body><p>EXIT<p></body></html>')
        response.end() //enviar la respuesta al cliente
    }
    else if(pathname === '/info'){
        var result = info(pathname)
        //200 significa que todo es correcto
        response.writeHead(200,{'Content-Type':'text/html'}) //cabezera del write
        response.write(result)
        response.end() //enviar la respuesta al cliente
    }
    else if(pathname === '/error'){
        var result = error(pathname)
        //200 significa que todo es correcto
        response.writeHead(200,{'Content-Type':'text/html'}) //cabezera del write
        response.write(result)
        response.end() //enviar la respuesta al cliente
    }
    else if(pathname === '/country'){

        //200 significa que todo es correcto
        response.writeHead(200,{'Content-Type':'application/json'}) //cabezera del write
        response.write(JSON.stringify(countries[query.code]))
        response.end() //enviar la respuesta al cliente
    }
    else{
        
        //400 significa que es incorrecto
        response.writeHead(404,{'Content-Type':'text/html'}) //cabezera del write
        response.write('<html><body><p>not found<p></body></html>')
        response.end() //enviar la respuesta al cliente
    }

 
})

server.listen("4000")


console.log("server listen on 4000")
