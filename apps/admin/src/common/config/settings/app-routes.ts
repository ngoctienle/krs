const BASE_URL = '/dashboard'

const appRoutes = Object.freeze({
  root: BASE_URL,
  login: `${BASE_URL}/auth/login`,
  ariticle: `${BASE_URL}/article`
})

export default appRoutes
