### package.json

配置参考源文件即可

### tsconfig.test.json

```json
{
  "extends": "./tsconfig.json",
  "ts-node": {
    "transpileOnly": true
  }
}
```
