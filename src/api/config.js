// 考虑到网站可能有好几个域名，所以单独提出来
module.exports = {
  // base: "http://192.168.0.236:16880", //  光南环境地址
  // base: "http://192.168.0.236:16880", //  李静环境地址
  // base: "http://192.168.0.18:16883", //  郭建环境地址
  base: 'http://192.168.0.143:51000', // 测试地址
  // base: "http://192.168.0.237:8080", //  李建环境地址
  baseUrl:'http://192.168.0.143:51000',
  // process.env.NODE_ENV === 'development'
  //   ? 'http://192.168.0.143:51000'
  //   : process.env.VUE_APP_BASE_API,
  // baseUrl:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://192.168.0.143:51000'
  //     : process.env.VUE_APP_MODE === 'test'
  //     ? 'http://192.168.0.143:51000'
  //     : 'http://192.168.0.143:51000',
  isAse: false,
  version: '',
  identification: '',
  applicationName: 'ms-admin',
  auth: '/wf-authorization-center-service',
  admin: '/wf-us168-admin-service',
  WINDOW_CONFIG_UPLOAD_Image: 'https://up-na0.qiniup.com', // 上传图片接口,七牛图片服务器接口
  WINDOW_CONFIG_IMAGE: 'https://images.us168168.com/', // 七牛图片前缀

  // 解密加密需要的key 和Iv
  devAesKey: '1234567887654321',
  devAesIv: '1234567887654321',

  proAesIv: '1234567887654321',
  proAesKey: '1234567887654321',
  smsTemplateCode: 'FD7ED70D9D47BBD0',
  minioConfig: {
    endPoint: process.env.VUE_APP_MINIO_URL, //对象存储服务的URL
    port:
        process.env.NODE_ENV === 'development'
            ? 51000
            : Number(process.env.VUE_APP_MINIO_PROT) !== 0
                ? Number(process.env.VUE_APP_MINIO_PROT)
                : '', //端口号
    useSSL: process.env.NODE_ENV === 'production' ? true : false, //true代表使用HTTPS
    'access-key': 'admin',
    'secret-key': 'wanfu!@#',
    bucketName:
        process.env.NODE_ENV === 'development'
            ? 'dev-jiangou'
            : process.env.VUE_APP_MINIO_bucketName
  }
};
