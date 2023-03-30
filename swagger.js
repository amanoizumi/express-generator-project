// 引入並呼叫
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Meta API',
    description: 'Node 課程 API 生成文件',
  },
  // host 設定重要
  // 看 host 是要設定成本地端 'localhost:3000' 或者是遠端伺服器
  host: '',
  // 支援哪幾種模式
  schemes: ['http', 'https'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'headers',
      name: 'authorization',
      description: '請加上 API Token',
    },
  },
  definitions: {
    getPosts: {
      status: true,
      data: [
        {
          _id: '6415c6fc61f32ff37f889238',
          content: '七龍珠心得',
          type: 'group',
          image: '',
          name: '貼文姓名',
          likes: 0,
          comments: 0,
          tags: ['ani'],
        },
      ],
    },
  },
};

// 生成文件的名稱
const outputFile = './swagger-output.json';

// 注入點
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
