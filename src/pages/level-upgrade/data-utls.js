// import storage from 'storage-controller'
import HTTP from '@utils/http'

/* 获取参数 */
export function getSearch() {
  let args = {}
  let query = location.href.split('?') || []
  query = query[1] ? query[1] : ''
  let pairs = query.split('&')
  for (let i = 0; i < pairs.length; i++) {
    let pos = pairs[i].indexOf('=')
    if (pos === -1) {
      continue
    }
    let name = pairs[i].substring(0, pos)
    let value = pairs[i].substring(pos + 1)
    // args[name] = value.replace(/%3A%2F%2F/, '//')
    // args[name] = value.replace(/%2F/, '/')
    args[name] = value
  }
  args.api = decodeURIComponent(args.api)
  return _Debug(args)
}

export function initConfig(args) {
  // let {token, shopId, currentCorp, api} = args
  let {token, shopId, currentCorp, project} = args
  HTTP.setCallback({
    // 请求拦截
    willRequest(request) {
      request.url = '/' + project + request.url
      return request
    }
  })
  // HTTP.init(http => {
  //   // http.config.baseURL = api
  // })
  HTTP.setHeaders({
    'Authorization': token,
    'Current-Shop': shopId,
    'Current-Corp': currentCorp
  })
}

function _Debug(args) {
  try {
    // if (window.__wxjs_environment !== 'miniprogram') {
    //   // eslint-disable-line
    //   return {
    //     token: 'dd1fd0d40e5fa0a6c45245ba18a6331b53f2d67e',
    //     api: 'https://social-shopping-api.jkweixin.net/social-shopping',
    //     currentCorp: 1
    //   }
    // }
  } catch (e) {}
  return args
}
