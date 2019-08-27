import request from '@utils/http'

export default {
  // 授权
  setLevel(args) {
    const url = `/shop/shop/shop-manager/set-level`
    // const url = `/api/openapi/data-statistics-base-data`
    return request.post({url, ...args})
  }
}
