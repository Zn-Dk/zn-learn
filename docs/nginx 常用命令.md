# nginx 常用命令

```bash
1.netstat -tnulp | grep nginx
# 检查当前 nginx 使用情况

2. nginx -c /etc/nginx/conf/nginx.conf
# 常用开启nginx
```



## nginx status



### **1. 启用nginx status配置**

在默认主机里面加上location或者你希望能访问到的主机里面。

 ```
 server {
 
     listen  *:80 default_server;
 
     server_name _;
 
     location /ngx_status
 
     {
 
         stub_status on;
 
         access_log off;
 
         #allow 127.0.0.1;
 
         #deny all;
 
     }
 
 }
 ```



### **2. 重启nginx**

请依照你的环境重启你的nginx



### **3. 打开status页面**

```
# curl http://127.0.0.1/ngx_status

Active connections: 11921

server accepts handled requests

 11989 11989 11991

Reading: 0 Writing: 7 Waiting: 42
```



### **4. nginx status详解**

active connections – 活跃的连接数量
server accepts handled requests — 总共处理了11989个连接 , 成功创建11989次握手, 总共处理了11991个请求
reading — 读取客户端的连接数.
writing — 响应数据到客户端的数量
waiting — 开启 keep-alive 的情况下,这个值等于 active – (reading+writing), 意思就是 Nginx 已经处理完正在等候下一次请求指令的驻留连接.



## 常用命令2

### 启动nginx

```
cd /usr/local/nginx/sbin/./nginx
```

查询nginx进程：ps aux|grep nginx



![图片](https://mmbiz.qpic.cn/mmbiz_jpg/S83FNw8zib5RRgKmo1smZ8ANlW0icnTPTzWzONjt7QuyAG9GxGkic3Nsp8dCSDZYPHYicc7xXMKjeSOvO8agiaO7IwA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)



注意：执行./nginx启动nginx，这里可以-c指定加载的nginx配置文件，如下：

./nginx -c /usr/local/nginx/conf/nginx.conf

如果不指定-c，nginx在启动时默认加载conf/nginx.conf文件，此文件的地址也可以在编译安装nginx时指定./configure的参数（--conf-path= 指向配置文件（nginx.conf））



### 停止nginx

方式1：快速停止：

```
cd /usr/local/nginx/sbin./nginx -s stop
```

此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。



方式2：完整停止(建议使用)：

```
cd /usr/local/nginx/sbin./nginx -s quit
```

此方式停止步骤是待nginx进程处理任务完毕进行停止。



### 重启nginx

方式1：先停止再启动（建议使用）：

对nginx进行重启相当于先停止nginx再启动nginx，即先执行停止命令再执行启动命令。

如下：

```
./nginx -s quit./nginx
```



方式2：重新加载配置文件：

当nginx的配置文件nginx.conf修改后，要想让配置生效需要重启nginx，使用-s reload不用先停止nginx再启动nginx即可将配置信息在nginx中生效，如下：

```
./nginx -s reload
```
