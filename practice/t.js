let data = {
  text: "%7B%22app_id%22%3A%226fe5bcee%22%2C%22channel%22%3A%22ch_daa9746d%22%2C%22client%22%3A%22pc_browser%22%2C%22third_party_user_id%22%3A%22923%22%2C%22user_online_num%22%3A3%2C%22connection_online_num%22%3A3%2C%22msg_id%22%3A%22msg_af34d2ec3d9fba8424b419024ce39973%22%2C%22date_time%22%3A%222020-06-05%2014%3A49%3A28%22%2C%22msg_source%22%3A%22prefix01%22%2C%22nick_name%22%3A%22%5Cu4e3b%5Cu6301%5Cu4eba%22%2C%22avatar%22%3A%22%22%2C%22event%22%3A%22Chat%22%2C%22room_id%22%3A%22%22%2C%22data%22%3A%223434%22%7D"
  ,time: "Fri, 05 Jun 2020 06:49:28 GMT"
}

// test socket msg
let decoded = decodeURIComponent(data.text)
let json = JSON.parse(decoded)
console.log(json)


