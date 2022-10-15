# HTTP状态码大全(常见 HTTP Status Code 含义查询)

------

HTTP状态码，即HTTP协议状态码，是我们访问网站时会遇到的，服务器端返回的Http响应码，不同的数字分别代表着不同的响应状态。我们在做SEO或做网页开发过程中需要了解5类比较重要的HTTP状态码，可以根据请求响应代码检查服务器及程序是否正常，判断网页处于什么工作状态。我们就需要了解不同的状态码分别是什么含义。

**下面我们列出常见五类HTTP状态码和它的详解说明：**

### 1、 HTTP Status Code 1xx 请求信息

这一组状态码表明这是一个临时性响应。此响应仅由状态行和可选的HTTP头组成，以一个空行结尾。由于HTTP／1.0未定义任何1xx状态码，所以不要向HTTP／1.0客户端发送1xx响应。

| Http状态码 | Http Status Code                                             | Http状态码含义中文说明 |
| :--------- | :----------------------------------------------------------- | :--------------------- |
| **100**    | [100 Continue](https://seo.juziseo.com/doc/http_code/100)    | 请继续请求             |
| **101**    | [101 Switching Protocols](https://seo.juziseo.com/doc/http_code/101) | 请切换协议             |
| **102**    | [102 Processing](https://seo.juziseo.com/doc/http_code/102)  | 将继续执行请求         |

### 2、 HTTP Status Code 2xx 成功状态

这一组状态码表明客户端的请求已经被服务器端成功接收并正确解析。

| Http状态码 | Http Status Code                                             | Http状态码含义中文说明                  |
| :--------- | :----------------------------------------------------------- | :-------------------------------------- |
| **200**    | [200 OK](https://seo.juziseo.com/doc/http_code/200)          | 请求成功                                |
| **201**    | [201 Created](https://seo.juziseo.com/doc/http_code/201)     | 请求已被接受，等待资源响应              |
| **202**    | [202 Accepted](https://seo.juziseo.com/doc/http_code/202)    | 请求已被接受，但尚未处理                |
| **203**    | [203 Non-Authoritative Information](https://seo.juziseo.com/doc/http_code/203) | 请求已成功处理，结果来自第三方拷贝      |
| **204**    | [204 No Content](https://seo.juziseo.com/doc/http_code/204)  | 请求已成功处理，但无返回内容            |
| **205**    | [205 Reset Content](https://seo.juziseo.com/doc/http_code/205) | 请求已成功处理，但需重置内容            |
| **206**    | [206 Partial Content](https://seo.juziseo.com/doc/http_code/206) | 请求已成功处理，但仅返回了部分内容      |
| **207**    | [207 Multi-Status](https://seo.juziseo.com/doc/http_code/207) | 请求已成功处理，返回了多个状态的XML消息 |
| **208**    | [208 Already Reported](https://seo.juziseo.com/doc/http_code/208) | 响应已发送                              |
| **226**    | [226 IM Used](https://seo.juziseo.com/doc/http_code/226)     | 已完成响应                              |

### 3、 HTTP Status Code 3xx 重定向状态

这一组状态码表示客户端需要采取更进一步的行动来完成请求。通常，这些状态码用来重定向，后续的请求地址（重定向目标）在本次响应的Location域中指明。

| Http状态码 | Http Status Code                                             | Http状态码含义中文说明         |
| :--------- | :----------------------------------------------------------- | :----------------------------- |
| **300**    | [300 Multiple Choices](https://seo.juziseo.com/doc/http_code/300) | 返回多条重定向供选择           |
| **301**    | [301 Moved Permanently](https://seo.juziseo.com/doc/http_code/301) | 永久重定向                     |
| **302**    | [302 Found](https://seo.juziseo.com/doc/http_code/302)       | 临时重定向                     |
| **303**    | [303 See Other](https://seo.juziseo.com/doc/http_code/303)   | 当前请求的资源在其它地址       |
| **304**    | [304 Not Modified](https://seo.juziseo.com/doc/http_code/304) | 请求资源与本地缓存相同，未修改 |
| **305**    | [305 Use Proxy](https://seo.juziseo.com/doc/http_code/305)   | 必须通过代理访问               |
| **306**    | [306 (已废弃)Switch Proxy](https://seo.juziseo.com/doc/http_code/306) | (已废弃)请切换代理             |
| **307**    | [307 Temporary Redirect](https://seo.juziseo.com/doc/http_code/307) | 临时重定向，同302              |
| **308**    | [308 Permanent Redirect](https://seo.juziseo.com/doc/http_code/308) | 永久重定向，且禁止改变http方法 |

### 4、 HTTP Status Code 4xx 客户端错误

这一组状态码表示客户端的请求存在错误，导致服务器无法处理。除非响应的是一个HEAD请求，否则服务器就应该返回一个解释当前错误状况的实体，以及这是临时的还是永久性的状况。这些状态码适用于任何请求方法。浏览器应当向用户显示任何包含在此类错误响应中的实体内容。

| Http状态码 | Http Status Code                                             | Http状态码含义中文说明               |
| :--------- | :----------------------------------------------------------- | :----------------------------------- |
| **400**    | [400 Bad Request](https://seo.juziseo.com/doc/http_code/400) | 请求错误，通常是访问的域名未绑定引起 |
| **401**    | [401 Unauthorized](https://seo.juziseo.com/doc/http_code/401) | 需要身份认证验证                     |
| **402**    | [402 Payment Required](https://seo.juziseo.com/doc/http_code/402) | -                                    |
| **403**    | [403 Forbidden](https://seo.juziseo.com/doc/http_code/403)   | 禁止访问                             |
| **404**    | [404 Not Found](https://seo.juziseo.com/doc/http_code/404)   | 请求的内容未找到或已删除             |
| **405**    | [405 Method Not Allowed](https://seo.juziseo.com/doc/http_code/405) | 不允许的请求方法                     |
| **406**    | [406 Not Acceptable](https://seo.juziseo.com/doc/http_code/406) | 无法响应，因资源无法满足客户端条件   |
| **407**    | [407 Proxy Authentication Required](https://seo.juziseo.com/doc/http_code/407) | 要求通过代理的身份认证               |
| **408**    | [408 Request Timeout](https://seo.juziseo.com/doc/http_code/408) | 请求超时                             |
| **409**    | [409 Conflict](https://seo.juziseo.com/doc/http_code/409)    | 存在冲突                             |
| **410**    | [410 Gone](https://seo.juziseo.com/doc/http_code/410)        | 资源已经不存在(过去存在)             |
| **411**    | [411 Length Required](https://seo.juziseo.com/doc/http_code/411) | 无法处理该请求                       |
| **412**    | [412 Precondition Failed](https://seo.juziseo.com/doc/http_code/412) | 请求条件错误                         |
| **413**    | [413 Payload Too Large](https://seo.juziseo.com/doc/http_code/413) | 请求的实体过大                       |
| **414**    | [414 Request-URI Too Long](https://seo.juziseo.com/doc/http_code/414) | 请求的URI过长                        |
| **415**    | [415 Unsupported Media Type](https://seo.juziseo.com/doc/http_code/415) | 无法处理的媒体格式                   |
| **416**    | [416 Range Not Satisfiable](https://seo.juziseo.com/doc/http_code/416) | 请求的范围无效                       |
| **417**    | [417 Expectation Failed](https://seo.juziseo.com/doc/http_code/417) | 无法满足的Expect                     |
| **418**    | [418 I'm a teapot](https://seo.juziseo.com/doc/http_code/418) | 愚人节笑话                           |
| **421**    | [421 There are too many connections from your internet address](https://seo.juziseo.com/doc/http_code/421) | 连接数超限                           |
| **422**    | [422 Unprocessable Entity](https://seo.juziseo.com/doc/http_code/422) | 请求的语义错误                       |
| **423**    | [423 Locked](https://seo.juziseo.com/doc/http_code/423)      | 当前资源被锁定                       |
| **424**    | [424 Failed Dependency](https://seo.juziseo.com/doc/http_code/424) | 当前请求失败                         |
| **425**    | [425 Unordered Collection](https://seo.juziseo.com/doc/http_code/425) | 未知                                 |
| **426**    | [426 Upgrade Required](https://seo.juziseo.com/doc/http_code/426) | 请切换到TLS/1.0                      |
| **428**    | [428 Precondition Required](https://seo.juziseo.com/doc/http_code/428) | 请求未带条件                         |
| **429**    | [429 Too Many Requests](https://seo.juziseo.com/doc/http_code/429) | 并发请求过多                         |
| **431**    | [431 Request Header Fields Too Large](https://seo.juziseo.com/doc/http_code/431) | 请求头过大                           |
| **449**    | [449 Retry With](https://seo.juziseo.com/doc/http_code/449)  | 请重试                               |
| **451**    | [451 Unavailable For Legal Reasons](https://seo.juziseo.com/doc/http_code/451) | 访问被拒绝（法律的要求）             |
| **499**    | [499 Client Closed Request](https://seo.juziseo.com/doc/http_code/499) | 客户端主动关闭了连接                 |

### 5、 HTTP Status Code 5xx 服务器错误状态

这一组状态码说明服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理。除非这是一个HEAD请求，否则服务器应当包含一个解释当前错误状态以及这个状况是临时的还是永久的解释信息实体。浏览器应当向用户展示任何在当前响应中被包含的实体。

| Http状态码 | Http Status Code                                             | Http状态码含义中文说明   |
| :--------- | :----------------------------------------------------------- | :----------------------- |
| **500**    | [500 Internal Server Error](https://seo.juziseo.com/doc/http_code/500) | 服务器端程序错误         |
| **501**    | [501 Not Implemented](https://seo.juziseo.com/doc/http_code/501) | 服务器不支持的请求方法   |
| **502**    | [502 Bad Gateway](https://seo.juziseo.com/doc/http_code/502) | 网关无响应               |
| **503**    | [503 Service Unavailable](https://seo.juziseo.com/doc/http_code/503) | 服务器端临时错误         |
| **504**    | [504 Gateway Timeout](https://seo.juziseo.com/doc/http_code/504) | 网关超时                 |
| **505**    | [505 HTTP Version Not Supported](https://seo.juziseo.com/doc/http_code/505) | 服务器不支持的HTTP版本   |
| **506**    | [506 Variant Also Negotiates](https://seo.juziseo.com/doc/http_code/506) | 服务器内部配置错误       |
| **507**    | [507 Insufficient Storage](https://seo.juziseo.com/doc/http_code/507) | 服务器无法存储请求       |
| **508**    | [508 Loop Detected](https://seo.juziseo.com/doc/http_code/508) | 服务器因死循环而终止操作 |
| **509**    | [509 Bandwidth Limit Exceeded](https://seo.juziseo.com/doc/http_code/509) | 服务器带宽限制           |
| **510**    | [510 Not Extended](https://seo.juziseo.com/doc/http_code/510) | 获取资源策略未被满足     |
| **511**    | [511 Network Authentication Required](https://seo.juziseo.com/doc/http_code/511) | 需验证以许可连接         |
| **599**    | [599 Network Connect Timeout Error](https://seo.juziseo.com/doc/http_code/599) | 网络连接超时             |
