// Create needed constants
const list = document.querySelector('ul')!
const titleInput = document.querySelector('#title')!
const bodyInput = document.querySelector('#body')!
const form: HTMLFormElement = document.querySelector('form')!
const submitBtn = document.querySelector('#createBtn')!

// 定义 indexDB 数据库
const DB_NAME = 'notes_db'
const OS_NAME = 'notes_os'
const CURR_VER = 1
let idb: IDBDatabase | null = null

// 连接数据库
// 数据库结构发生升级时, 产生新版本
const openRequest = window.indexedDB.open(DB_NAME, CURR_VER)

// =========== 事件处理

// 初始化
// 如果数据库尚未设置，或数据库以比现有存储的数据库更大的版本号打开（进行升级时），该处理器会运行。
openRequest.addEventListener('upgradeneeded', e => {
  console.log('openRequest.upgradeneeded:')
  idb = openRequest.result

  // 在我们的数据库中创建一个用于存储笔记和自增键的 objectStore
  // objectStore 类似于关系数据库中的“表”
  const objStore = idb.createObjectStore(OS_NAME, {
    keyPath: 'id',
    autoIncrement: true,
  })

  console.log(objStore)

  // 创建字段 - 名称 key
  objStore.createIndex('标题', 'title', { unique: false }) // unique
  objStore.createIndex('内容', 'body', { unique: false }) // unique
})

// 成功
openRequest.addEventListener('success', e => {
  console.log('数据库连接成功')

  // 此时可以从 request 对象的 result 拿到数据库实例, 给 idb 对象进行赋值
  idb = openRequest.result
  // 显示已存在于 IDB 中的笔记
  displayData()
})
// 错误
openRequest.addEventListener('error', e => {
  console.error('数据库打开错误')
})

// ============== method

interface Note {
  id?: number
  title: string
  body: string
}

function addData(e: SubmitEvent) {
  e.preventDefault()
  if (!idb) throw new Error('数据库未初始化')
  const fd = new FormData(form)
  const data: Record<string, any> = {}
  fd.forEach((val, key) => {
    data[key] = val
  })
  console.log('🚀 ~ addData ~ data:', data)

  // 创建事务
  const transaction = idb.transaction(OS_NAME, 'readwrite')
  // 调用已添加到数据库中的 objectStore
  const objectStore = transaction.objectStore(OS_NAME)
  // 发送添加的请求
  const addRequest = objectStore.add(data)

  addRequest.addEventListener('success', () => {
    // 清空表单
    form.reset()
  })
  transaction.addEventListener('complete', () => {
    console.log('事务完成, 修改结束')
    displayData()
  })
}

form.addEventListener('submit', addData)

const ID_DATASET_NAME = 'id'

function displayData() {
  if (!idb) throw new Error('数据库未初始化')

  list.innerHTML = '' // 清空之前的列表
  const os = idb.transaction(OS_NAME).objectStore(OS_NAME)
  os.openCursor().addEventListener('success', e => {
    // 游标的引用
    const cursor = e.target!.result as IDBCursorWithValue
    console.trace('🚀 ~ displayData ~ cursor:', cursor)

    if (cursor) {
      const liE = document.createElement('li')
      const contentE = document.createElement('section')
      contentE.style.display = 'flex'
      contentE.style.justifyContent = 'space-between'

      const titleE = document.createElement('h3')
      titleE.textContent = cursor.value.title

      const pE = document.createElement('p')
      pE.textContent = cursor.value.body

      const rmBtn = document.createElement('button', {})
      rmBtn.textContent = 'remove'
      rmBtn.addEventListener('click', deleteData)

      contentE.appendChild(pE)
      contentE.appendChild(rmBtn)

      liE.appendChild(titleE)
      liE.appendChild(contentE)
      liE.dataset[ID_DATASET_NAME] = cursor.value.id // 记录id, 以便清除

      list.appendChild(liE)

      cursor.continue()
    } else {
      // 如果列表为空，则显示“没有存储的笔记”消息
      if (!list.firstChild) {
        const listItem = document.createElement('li')
        listItem.textContent = '没有存储的笔记。'
        list.appendChild(listItem)
      }
      // 如果没有更多的游标项需要迭代，说明所有笔记都已显示
      console.log('所有笔记已显示')
    }
  })
}

function deleteData(e: PointerEvent) {
  if (!idb) throw new Error('数据库未初始化')
  const liE = (e.target as HTMLButtonElement).closest('li')!
  const id = Number(liE.dataset[ID_DATASET_NAME])

  // 打开一个数据库事务并删除任务，使用我们上面检索到的 ID 查找它
  const transaction = idb.transaction(OS_NAME, 'readwrite')
  const objectStore = transaction.objectStore(OS_NAME)
  const deleteRequest = objectStore.delete(id)

  transaction.addEventListener('complete', () => {
    console.log('事务完成, 修改结束')
    displayData()
  })
  console.log(Number(id), id)
}
