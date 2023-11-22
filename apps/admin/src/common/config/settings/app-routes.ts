const BASE_URL = '/dashboard'

const appRoutes = Object.freeze({
  root: BASE_URL,
  login: `${BASE_URL}/auth/login`,
  settings: `${BASE_URL}/settings`,
  systemSetting: `${BASE_URL}/settings/system`
})

export default appRoutes
