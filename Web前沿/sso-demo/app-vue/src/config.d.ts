declare module '../../server/config.js' {
  interface AppConfig {
    app_id: string;
    secret: string;
    token: string;
  }

  const config: AppConfig[];
  export default config;
}
