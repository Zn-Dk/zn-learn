import { InterfaceDeclaration, Project } from 'ts-morph';

/** 使用 ts-morph AST 解析接口 */

// 1. 新建 Project
const proj = new Project();
// 2. 将某个 ts 文件作为解析源头
const source = proj.addSourceFileAtPath('./types.ts');

// 3. 获得 Foo接口对象
const iFoo = source.getInterface('Foo');
// 4. 获得 Foo接口对象的属性 name
const nameProp = iFoo?.getProperty('name');
// 5. 获得 Foo接口对象的属性 name 的类型
console.log(nameProp?.getType().getText()); // 打印 string

// 6. 获得 Foo接口对象的属性 name 的注释对象
const namePropJsDoc = nameProp?.getJsDocs();
// 7. 最后得到其注释内容
console.log(namePropJsDoc?.[0].getComment()); // 打印 用户名

/** Example:
 * 提取接口对象 并变为 { label: 原属性注释, value: 属性key, type: 属性type }[]
 */
const parseInterface = (interfaceObj: InterfaceDeclaration) => {
  return interfaceObj.getProperties().map(prop => {
    const type = prop.getType().getText();
    const value = prop.getName();
    const label = prop.getJsDocs()?.[0].getComment();
    return { label, value, type };
  });
};

const ret = parseInterface(iFoo!);
console.log(ret);
/*
[
  { label: '用户名', value: 'name', type: 'string' },
  { label: '年龄', value: 'age', type: 'number' }
]
*/
