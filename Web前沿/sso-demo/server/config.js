// SSO app token

// map <app_id, config>
export default {
  'app-react': {
    appId: 'app-react',
    name: 'react',
    secret: 'react-secret',
    // url: 'http://localhost:5173',
    token: ''
  },
  'app-vue': {
    appId: 'app-vue',
    name: 'vue',
    secret: 'vue-secret',
    // url: 'http://localhost:5174',
    token: ''
  }
}

// 各app设置token 到 localStorage (或者cookie也行)
export const COMMON_CONFIG = {
  tokenStorageKey: 'sso_token',
  ssoServerUrl: 'http://localhost:3000/sso'
} 