// WebGPU demo

// 1. 首先获取设备适配器
const adapter = await window.navigator.gpu.requestAdapter();
console.log('Adapter-->', adapter);
if (!adapter) {
  throw new Error('No adapter found');
}
const device = await adapter.requestDevice(); // 获取设备
console.log('Device-->', device);


// 2. 创建一个 canvas (WebGPU) 上下文;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('webgpu')!;
console.log('canvas context-->', ctx);
// 3. 配置上下文
ctx.configure({
  device, // 设备
  // 格式-> 取得 SDR 内容最适合的 canvas 纹理样式
  format: navigator.gpu.getPreferredCanvasFormat()
})


// 4. 创建着色器模块 (这里比较复杂, 代码是c++)
const shaderModule = device.createShaderModule({
  code: `
    // 定义顶点着色器
    @vertex fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {
      // 定义3元素的float32数组, 每个元素都是一个vec2<f32>
      // 在这里意为3个顶点坐标, 连接后形成一个三角形
      var pos = array<vec2<f32>, 3>(
        vec2<f32>(0.0, 0.5),
        vec2<f32>(-0.5, -0.5),
        vec2<f32>(0.5, -0.5)
      );
      // 返回顶点坐标, w为1.0(w为1.0时, 表示该点在屏幕上)
      // 0.0 表示z轴坐标
      return vec4<f32>(pos[vertexIndex], 0.0, 1.0);
    }

    // 定义片段着色器 (像素渲染)
    @fragment fn fragmentMain() -> @location(0) vec4<f32> {
      // 这里需要返回一个颜色, 每个参数分别代表rgba
      // 故这里就是纯红色
      return vec4<f32>(1.0, 0.0, 0.0, 1.0);
    }
  `
})

// 5. 创建渲染管线
const pipeline = device.createRenderPipeline({
  vertex: {
    module: shaderModule,
    entryPoint: 'vertexMain' // 顶点着色器函数名称
  },
  fragment: {
    module: shaderModule,
    entryPoint: 'fragmentMain', // 片段着色器函数名称
    targets: [{ // 渲染目标
      format: navigator.gpu.getPreferredCanvasFormat()
    }]
  },
  layout: 'auto',
  primitive: {
    topology: 'triangle-list' // 三角形列表
  }
})

// 6. 创建命令编码器 (Demo1 - 已注释，使用Demo2)
// const commander = device.createCommandEncoder();
// // 7. 创建渲染通道 准备发送渲染指令
// const renderPass = commander.beginRenderPass({
//   colorAttachments: [{
//     view: ctx.getCurrentTexture().createView(), // 渲染目标
//     loadOp: 'clear', // 清除操作
//     storeOp: 'store', // 存储操作
//     clearValue: { r: 0, g: 0, b: 0, a: 1 } // 清除颜色
//   }]
// })

// renderPass.setPipeline(pipeline) // 绑定渲染管线

// renderPass.draw(3, 1, 0, 0)
// // 绘制3个顶点
// // 绘制1个实例
// // 从第0个顶点开始
// // 从第0个实例开始

// // 8. 结束渲染通道
// renderPass.end()

// // 9. 提交命令编码器
// const buffer = commander.finish();
// // 10. 提交命令缓冲区 完成渲染
// device.queue.submit([buffer])

// Demo2 绘制一个正交视角的正四方体

// 定义正四方体的顶点数据 (8个顶点)
// 每个顶点包含位置(x,y,z)和颜色(r,g,b)
const cubeVertices = new Float32Array([
  // 前面 (z = 0.5)
  -0.5, -0.5, 0.5, 1.0, 0.0, 0.0, // 左下 - 红色
  0.5, -0.5, 0.5, 0.0, 1.0, 0.0, // 右下 - 绿色
  0.5, 0.5, 0.5, 0.0, 0.0, 1.0, // 右上 - 蓝色
  -0.5, 0.5, 0.5, 1.0, 1.0, 0.0, // 左上 - 黄色

  // 后面 (z = -0.5)
  -0.5, -0.5, -0.5, 1.0, 0.0, 1.0, // 左下 - 品红
  0.5, -0.5, -0.5, 0.0, 1.0, 1.0, // 右下 - 青色
  0.5, 0.5, -0.5, 1.0, 1.0, 1.0, // 右上 - 白色
  -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, // 左上 - 灰色
]);

// 定义索引数据 (12个三角形，6个面)
const cubeIndices = new Uint16Array([
  // 前面
  0, 1, 2, 0, 2, 3,
  // 后面
  5, 4, 7, 5, 7, 6,
  // 左面
  4, 0, 3, 4, 3, 7,
  // 右面
  1, 5, 6, 1, 6, 2,
  // 上面
  3, 2, 6, 3, 6, 7,
  // 下面
  4, 5, 1, 4, 1, 0,
]);

// 创建顶点缓冲区
const vertexBuffer = device.createBuffer({
  size: cubeVertices.byteLength,
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
});
device.queue.writeBuffer(vertexBuffer, 0, cubeVertices);

// 创建索引缓冲区
const indexBuffer = device.createBuffer({
  size: cubeIndices.byteLength,
  usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
});
device.queue.writeBuffer(indexBuffer, 0, cubeIndices);

// 创建正交投影矩阵的uniform缓冲区
const uniformBuffer = device.createBuffer({
  size: 64, // 4x4矩阵 = 16个float32 = 64字节
  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

// 创建正交投影矩阵 (简单的旋转矩阵用于演示)
function createRotationMatrix(angleX: number, angleY: number): Float32Array {
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);

  // 组合旋转矩阵
  return new Float32Array([
    cosY, 0, sinY, 0,
    sinX * sinY, cosX, -sinX * cosY, 0,
    -cosX * sinY, sinX, cosX * cosY, 0,
    0, 0, 0, 1,
  ]);
}

// 创建新的着色器模块用于立方体
const cubeShaderModule = device.createShaderModule({
  code: `
    struct Uniforms {
      modelViewProjection: mat4x4<f32>,
    };
    @group(0) @binding(0) var<uniform> uniforms: Uniforms;

    struct VertexInput {
      @location(0) position: vec3<f32>,
      @location(1) color: vec3<f32>,
    };

    struct VertexOutput {
      @builtin(position) position: vec4<f32>,
      @location(0) color: vec3<f32>,
    };

    @vertex fn vertexMain(input: VertexInput) -> VertexOutput {
      var output: VertexOutput;
      output.position = uniforms.modelViewProjection * vec4<f32>(input.position, 1.0);
      output.color = input.color;
      return output;
    }

    @fragment fn fragmentMain(input: VertexOutput) -> @location(0) vec4<f32> {
      return vec4<f32>(input.color, 1.0);
    }
  `
});

// 创建绑定组布局
const bindGroupLayout = device.createBindGroupLayout({
  entries: [{
    binding: 0,
    visibility: GPUShaderStage.VERTEX,
    buffer: { type: 'uniform' }
  }]
});

// 创建管线布局
const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [bindGroupLayout]
});

// 创建立方体渲染管线
const cubePipeline = device.createRenderPipeline({
  layout: pipelineLayout,
  vertex: {
    module: cubeShaderModule,
    entryPoint: 'vertexMain',
    buffers: [{
      arrayStride: 24, // 6个float32 (3个位置 + 3个颜色)
      attributes: [
        {
          shaderLocation: 0,
          offset: 0,
          format: 'float32x3' // position
        },
        {
          shaderLocation: 1,
          offset: 12, // 3 * 4 bytes
          format: 'float32x3' // color
        }
      ]
    }]
  },
  fragment: {
    module: cubeShaderModule,
    entryPoint: 'fragmentMain',
    targets: [{
      format: navigator.gpu.getPreferredCanvasFormat()
    }]
  },
  primitive: {
    topology: 'triangle-list',
    cullMode: 'back' // 背面剔除
  },
  depthStencil: {
    depthWriteEnabled: true,
    depthCompare: 'less',
    format: 'depth24plus'
  }
});

// 创建深度纹理
const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: 'depth24plus',
  usage: GPUTextureUsage.RENDER_ATTACHMENT
});

// 创建绑定组
const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [{
    binding: 0,
    resource: { buffer: uniformBuffer }
  }]
});

// 动画渲染循环
let angleX = 0.3;
let angleY = 0.3;

function render() {
  // 更新旋转角度
  angleY += 0.01;
  angleX += 0.005;

  // 更新uniform缓冲区
  const rotationMatrix = createRotationMatrix(angleX, angleY);
  device.queue.writeBuffer(uniformBuffer, 0, rotationMatrix);

  // 创建命令编码器
  const commandEncoder = device.createCommandEncoder();

  // 开始渲染通道
  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [{
      view: ctx.getCurrentTexture().createView(),
      loadOp: 'clear',
      storeOp: 'store',
      clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1.0 }
    }],
    depthStencilAttachment: {
      view: depthTexture.createView(),
      depthLoadOp: 'clear',
      depthStoreOp: 'store',
      depthClearValue: 1.0
    }
  });

  renderPass.setPipeline(cubePipeline);
  renderPass.setBindGroup(0, bindGroup);
  renderPass.setVertexBuffer(0, vertexBuffer);
  renderPass.setIndexBuffer(indexBuffer, 'uint16');
  renderPass.drawIndexed(36); // 12个三角形 * 3个顶点
  renderPass.end();

  // 提交命令
  device.queue.submit([commandEncoder.finish()]);

  // 继续动画
  requestAnimationFrame(render);
}

// 启动渲染
render();
