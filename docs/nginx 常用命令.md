# nginx 常用

```bash
1.netstat -tnulp | grep nginx
# 检查当前 nginx 使用情况

2. nginx -c /etc/nginx/conf/nginx.conf
# 常用开启nginx
```





## 常用命令

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



## 负载均衡

1. 搭建两个iis站点
   　　新建一个站点下只有一个简单的 index 页面，将两个站点都部署到本机，分别绑定了 8097 和8098 两个端口。

2. 修改nginx配置信息，这个文件中配置。

   1. 修改nginx监听端口，修改http server下的 listen 节点值(例如 8096)
   
      ```
      listen    8096;
      ```
   
   2. 在http节点下添加upstream（服务器集群），server设置的是集群服务器的信息，我这里搭建了两个站点，配置了两条信息。
   
      ```bash
      #服务器集群名称为test.com
      upstream test.com {
          server 127.0.0.1:8097;
          server 127.0.0.1:8098;
      }
      ```

3. 在 http 节点下找到 location 节点修改

```bash
location / {
	root html;
    index index.html index.htm; #主页
    #请求转发入口, 其中test.com为 对应着upstream设置的集群名称 
    proxy_pass http://test.com; # 相当于访问 http://127.0.0.1:8097(8)
    #设置主机头和客户端真实地址，以便服务器获取客户端真实IP
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Nginx-Proxy true;
}
```

	 4. 修改完成配置文件之后，重启nginx服务



## 动静分离

- 在 server 的最上方添加 (一般location / {} 之前) 静态资源的配置

```bash
# 静态资源缓存设置

# 媒体文件
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|pdf|xls|mp3|wma)$  { 
    root static;    # 定义static文件夹  
    expires      30d;  
}   
# js/css
location ~ .*\.(js|css)?$ {    
    root static;  
    expires      30d;    
}  
```

- 将需要的静态资源文件拷贝到配置好的 static 目录下，保存配置，重启Nginx



## 日志的配置

- 首先 在 http 下定义  `log_format [配置名称] [配置内容]` 

````bash
http {
```
  # define log_format
  # $remote_addr 访问者 ip  |  $request 请求头 例: "GET /favicon.ico HTTP/1.1"
  # $status 状态码          |  $body_bytes_sent 响应内容大小(字节)
  # $http_referer 目标地址  |   $http_user_agent  UA信息
  log_format my_log 'from:$remote_addr "$request" '
  'code: $status body_size:$body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';
```
}
````

- 在期望的某个 server 下开启日志

```bash
  # log demo
  server {
    listen 192.168.1.2:80;
    server_name log.com;
    location /log {
      root /data/home/servers;
      index index.html index.htm;
    }
    access_log logs/access.log my_log; 
    #开启log 存放位置 [/usr/share/nginx]log/access.log 使用 my_log 的格式
  }
```

- 访问该虚拟主机 查看日志 (典型的日志如下)

```bash
from:192.168.1.12 "GET /hybird/modules/account/dist/ HTTP/1.1" code: 200 body_size:2623 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76" "-"

from:192.168.1.12 "GET /hybird/modules/account/dist/css/index.a5b8936e.css HTTP/1.1" code: 200 body_size:49491 "https://XXXXX.com/hybird/modules/account/dist/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76" "-"
```

### 实际配置

> (引用 [Nginx总结（七）Nginx服务器的日志管理及配置 - 章为忠 - 博客园 (cnblogs.com)](https://www.cnblogs.com/zhangweizhong/p/12342366.html))

上面的日志配置也只是简单介绍，实际生产环境一般是按日期分割存储的。

具体实现方式：shell+定时任务+nginx信号管理,完成日志按日期存储

**分析思路**

凌晨00:00:01,把昨天的日志重命名,放在相应的目录下。

再USR1信息号控制nginx重新生成新的日志文件。

**实现**

1、增加按日期备份日志的脚本

具体脚本如下：

```
#!/bin/bash
base_path='/usr/local/nginx/logs'
log_path=$(date -d yesterday +"%Y%m")
day=$(date -d yesterday +"%d")
mkdir -p $base_path/$log_path
mv $base_path/access.log $base_path/$log_path/access_$day.log
#echo $base_path/$log_path/access_$day.log
kill -USR1 `cat /usr/local/nginx/logs/nginx.pid`
```

以上脚本来着互联网，大家学习参照下即可。

2、增加定时任务

01 00 * * * /xxx/path/b.sh 每天0时1分(建议在02-04点之间,系统负载小)

 

 

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





## 高级: 高效能优化

### 优化 workprocess / cpu

```bash
worker_processes 8;      // 根据CPU核数配置
worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000  00100000 01000000 10000000;
```

### 事件处理模型优化

nginx的连接处理机制在于不同的操作系统会采用不同的I/O模型，要根据系统类型不同选择不同的事务处理模型。

- Linux下，nginx使用epoll的I/O多路复用模型，

- 在freebsd使用kqueue的IO多路复用模型，

- 在solaris使用/dev/pool方式的IO多路复用模型，

- 在windows使用的icop等等。 

```bash
events {
    worker_connections  10240;    # 设置work_connections 连接数
    use epoll; # nginx 会使用默认优化配置
}
```

### 每个进程的最大文件打开数

```bash
worker_rlimit_nofile 65535;  # 一般等于/etc/sysctl.conf 下的 ulimit -n 系统值
```

### keepalive timeout会话保持时间

```
keepalive_timeout  60;
```

### GZIP压缩性能优化

```bash
gzip on;       #表示开启压缩功能
gzip_min_length  1k; #表示允许压缩的页面最小字节数，页面字节数从header头的Content-Length中获取。默认值是0，表示不管页面多大都进行压缩，建议设置成大于1K。如果小于1K可能会越压越大
gzip_buffers     4 32k; #压缩缓存区大小
gzip_http_version 1.1; #压缩版本
gzip_comp_level 6; #压缩比率， 一般选择4-6，为了性能gzip_types text/css text/xml application/javascript;　　#指定压缩的类型 gzip_vary on;　#vary header支持
```

### proxy超时设置

```bash
proxy_connect_timeout 90;
proxy_send_timeout  90;
proxy_read_timeout  4k;
proxy_buffers 4 32k;
proxy_busy_buffers_size 64k
```

### 高效传输模式

```bash
sendfile on; # 开启高效文件传输模式。
tcp_nopush on; #需要在sendfile开启模式才有效，防止网路阻塞，积极的减少网络报文段的数量。将响应头和正文的开始部分一起发送，而不一个接一个的发送。
```

### **Linux系统内核层面**

Nginx要达到最好的性能，出了要优化Nginx服务本身之外，还需要在nginx的服务器上的内核参数。

这些参数追加到/etc/sysctl.conf,然后执行sysctl -p 生效。

- 调节系统同时发起的tcp连接数
  net.core.somaxconn = 262144

- 允许等待中的监听

net.core.somaxconn = 4096 

-  tcp连接重用 

net.ipv4.tcp_tw_recycle = 1 

net.ipv4.tcp_tw_reuse = 1  

- 不抵御洪水攻击

net.ipv4.tcp_syncookies = 0 

net.ipv4.tcp_max_orphans = 262144 #该参数用于设定系统中最多允许存在多少TCP套接字不被关联到任何一个用户文件句柄上，主要目的为防止Ddos攻击

- 最大文件打开数

ulimit -n 30000
