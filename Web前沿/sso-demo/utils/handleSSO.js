import config, { COMMON_CONFIG } from '../server/config.js';

export const handleSSO = (appName = 'app-react') => {
  // 从 sso redirect
  const search = new URLSearchParams(location.search);
  const urlToken = search.get('token');
  console.log("🚀 ~ urlToken:", urlToken);

  if (urlToken) {
    // 先保存token到localStorage
    window.localStorage.setItem(COMMON_CONFIG.tokenStorageKey, urlToken);
    // 清除URL中的token参数，使用replace避免产生历史记录
    search.delete('token');
    const newUrl = search.toString()
      ? `${location.pathname}?${search.toString()}`
      : location.pathname;
    window.location.replace(newUrl);
    return;
  }

  const appId = config[appName].appId;
  console.log(`${appName} appId:`, appId);
  const localToken = window.localStorage.getItem(COMMON_CONFIG.tokenStorageKey);
  console.log(`${appName} local token:`, localToken);

  if (!localToken) { // 如果没有token，跳转到登录页
    const query = new URLSearchParams();
    query.append('app_id', appId);
    query.append('redirect', location.href);
    window.location.replace(`${COMMON_CONFIG.ssoServerUrl}/?${query.toString()}`);
  }
}