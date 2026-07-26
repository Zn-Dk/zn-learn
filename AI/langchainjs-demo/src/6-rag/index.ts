import { ChatOllama, OllamaEmbeddings } from '@langchain/ollama'
import path from 'path';
import { stdout } from 'process';
import type { Document } from 'langchain';
// 读取csv文件
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
// 通用读取文件
import { UnstructuredLoader } from "@langchain/community/document_loaders/fs/unstructured";
// 内存向量存储
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";


// RAG 的核心是读取文件 -> 嵌入 -> 向量化 -> 存储 -> 检索
// 这样一来LLM就可以针对特定的语料进行回答
// 不需要将整个知识库都塞给LLM, 精简token数量
// 同时也可以避免LLM的幻觉, 提高回答质量



// 1. 读取文件
// langchain 支持读取各种类型的文件

// csv loader 需要安装 d3-dsv
const loadDoc = async (source: string) => {
  const loader = new CSVLoader(path.resolve(
    import.meta.dirname,
    source,
  ));
  const documents = await loader.load();
  return documents;
};
// 读取结果
// const documents = await loadDoc('./assets/students.csv');
// [ Document { pageContent: 'name,age', metadata: {} },
// console.log(documents);

// 2.嵌入 Embedding , 向量化
// 使用一个 embedding 模型
const embeddings = new OllamaEmbeddings({
  model: "mxbai-embed-large:latest",
});
const embedDoc = (documents: Document[]) => embeddings.embedDocuments(
  documents.map((doc) => doc.pageContent)
);

// 基础embedding 演示(未存储)
const embedAndQuery = async (keyword: string) => {
  const doc = await loadDoc('./assets/students.csv');
  await embedDoc(doc);
  const queryEmbedding = await embeddings.embedQuery(keyword);
  return queryEmbedding;
}
// const queryEmbedding = await embedAndQuery('张三');
// console.log('检索结果:', queryEmbedding);
// 目前为止可以检索出一个向量数组, 但都只是向量, 没有对应的内容


// 3. 存储, 根据相似度检索
// 1. 轻量化存储: 使用内置的内存数据库 MemoryStore
// 2. 更大规模的可以考虑使用: PGVectorStore /
const embedToMemoryStore = async (query: string, topK = 1) => {
  const doc = await loadDoc('./assets/students.csv');
  const memoryStore = await MemoryVectorStore.fromDocuments(doc, embeddings);
  const queryEmbedding = await embeddings.embedQuery(query);
  const results = await memoryStore.similaritySearchVectorWithScore(
    queryEmbedding,
    topK // 列出topK个结果
  );
  console.log(results);
}
embedToMemoryStore('张三', 3);
// embedToMemoryStore('21岁电子', 3);
// embedToMemoryStore('电子工程的21岁女生是谁', 3);
/*
// 检索结果:
[
  [
    Document {
      pageContent: '学号: 1001\n姓名: 张三\n年龄: 20\n性别: 男\n专业: 计算机科学',
      metadata: [Object],
      id: undefined
    },
    0.7311739028332308 // 相似度 最高
  ],
  [
    Document {
      pageContent: '学号: 2232\n姓名: 李四\n年龄: 21\n性别: 女\n专业: 电子工程',
      metadata: [Object],
      id: undefined
    },
    0.6930578393855725
  ],
  [
    Document {
      pageContent: '学号: 5012\n姓名: 周七\n年龄: 24\n性别: 男\n专业: 体育',
      metadata: [Object],
      id: undefined
    },
    0.6646034128191577
  ]
]
*/