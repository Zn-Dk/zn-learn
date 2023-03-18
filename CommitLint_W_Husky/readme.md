# 通过 commitlint + husky 使 提交信息规范化

## 步骤
  1. 安装 commitlint 及 cli, 使用默认配置
  ```bash
    npm install --save-dev @commitlint/cli @commitlint/config-conventional
  ```
  2. 暴露配置文件 (详细可参考 commitlint.config.js) **注意该文件编码需要 utf-8 否则报错**
  ```bash
    echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
  ```
  3. 安装 husky
  ```bash
    # 安装husky 依赖
    npm install husky --save-dev

    # 启用 Git 挂钩
    npx husky install

    # 设置 script 自动启用hooks
    # 高版本 node 可使用: npm pkg set scripts.prepare="husky install"
    npm set-script prepare "husky install"

    # 添加 commit-msg 钩子
    npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
  ```
  4. 参考
    - build：代码已构建
    - ci：
    - chore：构建过程或辅助工具的变动
    - docs：文档
    - feat：新功能的实现
    - fix：bug 的修复
    - perf
    - refactor：重构代码
    - revert
    - style：格式，不影响代码功能
    - test：增加测试用例

  5. 测试
  ```bash
      git commit -m "fix(account): 修复xxx的bug"
      git commit -m "refactor(proj): 重构整个项目"

      错误示例：
        "foo: some message" # fails

        #  'lowerCase'
        "FIX: some message" # fails

        # type is empty
        ": some message" # fails

        # scope need to be lowercase
        # the first character of subject should be lowercase
        "fix(SCOPE): some message" # fails
        "fix(SCOPE): Some message" # fails
        "fix(SCOPE): Some Message" # fails
        "fix(SCOPE): SomeMessage" # fails
        "fix(SCOPE): SOMEMESSAGE" # fails

        # subject should not be empty
        "fix:" # fails

        # subject ends with value '.'
        "fix: some message." # fails
        
        # too long
        "fix: some message that is way too long and breaks the line max-length by several characters" # fails
  ```