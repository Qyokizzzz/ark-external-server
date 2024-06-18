# readme

## 初始化

根据实际情况修改`config.default`和`config.default`，库需要手动建，表会自动建

node version >= 18.17.1
pnpm >= 8.15.4

安装依赖

```shell
pnpm install
```

## 启动

开发/生产: `pnpm dev/prod`

生产前至少要运行一次`pnpm dev`编译

## 使用

运行后扫码登录，用户加好友时需要备注 地图,部落,角色名,qq，例如：中心岛, 全员恶人, 大泽, 1104597683，注意必须是英文逗号；

推日志时调`http://localhost:4000/tribe/log?map=中心岛&tribeName=全员帅比&msg=大泽摧毁了服主的秘密基地`；

如果用户需要订阅多张地图的日志推送服务，请服主自行在DBMS中设置，暂不提供UI。
