// 2. 引入, 并且可以通过 import xx = namespaceA.namespaceB 重命名
import { A } from "./namespace3_0";
import bar = A.B.C.bar;
// 引入 namespace 相当于引入 Object
import C = A.B.C;
console.log(C);
console.log(bar);
