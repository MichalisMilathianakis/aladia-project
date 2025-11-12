export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  tcp: {
    host: process.env.TCP_HOST ?? 'localhost',
    port: parseInt(process.env.TCP_PORT ?? '4000', 10),
  },
  mongodbUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/aladia-db',
  jwtSecret: process.env.JWT_SECRET ?? 'default-secret',
});
