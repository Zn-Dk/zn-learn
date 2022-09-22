<template>
  <main>
    <aside>
    </aside>
    <article>
      <header class="test">递归组件的使用</header>
      <!-- 直接使用全局组件 -->
      <div class="tree-list">
        <TreeList :list="list" @on-click="displayInfo" />
      </div>
    </article>
  </main>

</template>

<script setup lang="ts">
import { reactive } from 'vue';
import TreeList from './TreeList.vue';
import { ITree } from './interfaces'

// interface ITree {
//   title: string,
//   body?: string,
//   children?: ITree[] | []// children 也是接口自身
// }

const displayInfo = (data: ITree) => {
  console.log(data, '父组件接收到子组件数据')
}

const list = reactive<ITree[]>([
  {
    title: '1',
    body: 'ABCABC',
    children: [
      {
        title: '1-1',
        body: 'LOREM LOREM LOREM LOREM',

      },
      {
        title: '1-2',
        children: [
          {
            title: '1-2-1',
            body: 'LOREM LOREM LOREM LOREM',
          }
        ]
      },
    ]
  },
  {
    title: '2',
    body: 'LOREM LOREM LOREM LOREM',

    children: [
      { title: '2-1' }
    ]
  },
  {
    title: '3',
    body: 'LOREM LOREM LOREM LOREM',

  },
])
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

main {
  display: flex;
  height: 100vh;

  aside {
    width: 20%;
    padding: 20px;
    box-shadow: -2px 0 10px #ccc inset;
  }

  article {
    display: flex;
    flex-direction: column;
    width: 100%;

    header {
      height: 20%;
    }

    .tree-list {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      height: 80vh;
    }
  }

  // 测试at-root
  @at-root {
    .test {
      font-size: 24px;
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>