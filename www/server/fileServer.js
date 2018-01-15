module.exports = (function () {
    'use strict';
    console.time('[HttpServer][Start]');
//http协议
    var http = require('http');
//url解析
    var url = require('url');
//文件系统
    var fs = require('fs');
//路径解析
    var path = require('path');
    return {
//启动服务
        start:function () {
            var port = this.config.port;
            var ip = this.config.ip;
            //创建服务
            var httpServer = http.createServer(this.processRequest.bind(this));
//监听端口
            httpServer.listen(port, function () {
                console.log('Http Sever is running at http://' + ip + ':' + port + '/');
                console.timeEnd('[HttpServer][Start]');
            });
            httpServer.on('error',function (error) {
                console.log(error);
            });
        },
        /**
         *请求处理
         * @param request
         * @param response
         */
        processRequest: function(requset, response) {
            var hasExt = true;
            var requestUrl = requset.url;
            var pathName = url.parse(requestUrl).pathname;
            var that = this;

            //对请求路径解码，防止中文乱码
            pathName = decodeURI(pathName);
            //如果路径中没有扩展名
            if (path.extname(pathName) === '') {
                //如果不是以/结尾，加/并作301重定向
                if (pathName.charAt(pathName.length - 1) !== '/') {
                    pathName += '/';
                    var redirect = 'http://' + requset.headers.host + pathName;
                    response.writeHead(301, {
                        location: redirect
                    });
                    response.end();
                    return;
                }
                //添加默认的访问页面
                pathName += 'index.html';
                hasExt = false;//标识默认页面是服务器自动添加的
            }
            //获取资源文件相对路径
            var filePath = path.join('/Tetris/www', pathName);

            fs.exists(filePath, function (exists) {
                //如果文件名存在
                if (exists) {
                    response.writeHead(200, {'conten-type': that.getContentType(filePath)});
                    var stream = fs.createReadStream(filePath, {flags: 'r', encoding: null});
                    stream.on('error', function () {
                        response.writeHead(500, {'conten-type': 'text/html'});
                        response.end('<h1>500 Server Error</h1>');
                    });
                    //返回文件内容
                    stream.pipe(response);
                } else {//文件不存在
                    if (hasExt) {
                        //如果这个文件不是服务器加的
                        response.writeHead(404, {'conten-type': 'text/html'});
                        response.end('<h1>404 Not Found</h1>');
                    } else {
                        //如果文件是自动添加的且不存在，说明用户是为了访问该目录下的文件列表
                        var html = '<head><meta charset="utf-8"></head>';
                        try {
                            //用户访问目录
                            var filedir = filePath.substring(0, filePath.lastIndexOf('\\'));

                            //获取用户访问路径下的文件列表
                            var files = fs.readdirSync(filedir);console.log(files)
                            //将访问路径下的文件一一列举出来，并添加超链接，以便用户进一步访问
                            for (var i in files) {
                                var filename = files[i];
                                html += '<div><a href="' + filename + '">' + filename + '</a></div>';
                            }
                        } catch (e) {
                            html += '<h1>您访问的目录不存在</h1>';
                        }
                        response.writeHead(200, {'conten-type': 'text/html'});
                        response.end(html);
                    }
                }
            })
        },
        /**
         * 获取文档内容类型
         * @param filepath
         * @returns {*}
         */
        getContentType:function (filepath) {
            var contentType = this.config.mime;
            var ext = path.extname(filepath).substr(1);
            if (contentType.hasOwnProperty(ext)) {
                return contentType[ext];
            }else {
                return contentType.default;
            }
        },
        //配置信息
        config: {
            port: 8888,
            ip: '192.168.50.124',
            mime: {
                html: 'text/html',
                js: 'text/javascript',
                css: 'text/css',
                gif: 'image/gif',
                jpg: 'image/jpeg',
                png: 'image/png',
                ico: 'image/icon',
                txt: 'text/plain',
                json: 'application/json',
                default:'application/octet-stream'
            }
        }
    }
})();