const whiteReg = /(github.com)/

module.exports = {
  summary: 'a rule to hank response',
  * beforeSendRequest(requestDetail) {
    if (requestDetail.url.match(whiteReg)) {
      const newRequestOptions = requestDetail.requestOptions
      newRequestOptions.rejectUnauthorized = false
      return {
        requestOptions: newRequestOptions,
      }
    } else {
      return null
    }
  },
  * beforeSendResponse(requestDetail, responseDetail) {
    if (requestDetail.url === 'http://httpbin.org/user-agent') {
      const newResponse = responseDetail.response
      newResponse.body += '- AnyProxy Hacked!\n'
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({response: newResponse})
        }, 5000)
      })
    }
  },
  * beforeDealHttpsRequest(requestDetail) {
    // console.log('beforeDealHttpsRequest host is', requestDetail.host);
    return true
  },
  // 请求出错的事件
  * onError(requestDetail, error) {
    return null
  },
  // https连接服务器出错
  * onConnectError(requestDetail, error) {
    console.log('AnyProxy connect https error', error)
  },
}
