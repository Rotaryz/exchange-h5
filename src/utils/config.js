const env = process.env
const version = ``

const LOCAL_URL = {
  api: 'https://exchange-platform-api.jerryf.cn/exchange-platform',
}

const DEV_URL = {
  api: 'https://exchange-platform-api.jerryf.cn/exchange-platform',
}

const TEST_URL = {
  api: 'https://exchange-platform-api.jkweixin.net/exchange-platform',
}

const PROD_URL = {
  api: 'https://exchange-platform-api.jkweixin.com/exchange-platform' + version,
}

export const BASE_URL =
  env.NODE_ENV === 'production'
    ? PROD_URL
    : env.NODE_ENV === 'test'
      ? TEST_URL
      : env.NODE_ENV === 'development'
        ? DEV_URL
        : LOCAL_URL

export const ERR_OK = 0
export const TIME_OUT = 10000
export const ERR_NO = -404
