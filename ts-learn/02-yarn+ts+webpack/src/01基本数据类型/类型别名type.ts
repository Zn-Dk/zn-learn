(() => {
  // 通过 type 关键字声明一个类型的实现

  type point = {
    x: number;
    y: number;
  };

  function showCoordinate(pt: point): string {
    return `x: ${pt.x},y: ${pt.y}`;
  }

  const pt = showCoordinate({ x: 1, y: 2 });

  // 通过 type 声明 可以多次的利用 并且方便管理
  type ID = number | string;

  const id: ID = "800";

  // 上下两种方式都是相同的

  // function printID(id: number | string) {
  //   console.log(id)
  // }

  function printID(id: ID): ID {
    console.log(id);
    return id;
  }

  // 都使用了 ID 这种 type 但是不需要重写类型

  function printAnotherID(another_id: ID) {
    console.log(another_id);
  }



  ///////////////////////////////////////////////////////////////////



  // 通过 type 约束对象数组
  type Student1 = {
    id: number;
    name: string;
    class: number;
    //class?: number;
  };

  let student1Arr: Student1[];
  // student1Arr = [{ id: 1, name: "张三" }]; // ERROR
  student1Arr = [{ id: 1, name: "张三", class: 4 }];

  // 或者直接形成字面量
  let student2Arr: { id: number; name: string }[] = [
    { id: 1, name: "A" },
    { id: 1, name: "B" },
  ];



})();
