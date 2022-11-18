# 强缓存 - Cache-control

## 可设置为
- max-age 设置 浏览器 缓存时长
- s-maxage 设置 代理服务器 缓存时长

- no-cache 强制进行协商缓存，与 no-store 互斥
- no-store 禁止任何缓存策略

- public 资源即可以被浏览器缓存也可以被代理服务器缓存，与 private 互斥
- private 资源只能被浏览器缓存

## Mark
- 如果 public、private 都没有设置，默认为 private
- s-maxage 必须和 public 一起使用

## eg
```
Cache-control:max-age=10000,s-maxage=200000,public
```


# 协商缓存

## 实现方式
1. 首先需要在服务器端读出文件修改时间，
2. 将读出来的修改时间赋给响应头的 last-modified 字段。
3. 最后设置 Cache-control:no-cache


# Mark
- http缓存由后端设置
- 有hash的文件设置强缓存，没有hash的文件设置协商缓存
