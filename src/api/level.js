import request from '@utils/http'

export default {
  // 授权
  setLevel(args) {
    const url = `/shop/shop/level-apply-record/create`
    return request.post({url, ...args})
  }
}
