function parseSocketData() {
  let data = {
    text: "%7B%22app_id%22%3A%2214b7fc63%22%2C%22channel%22%3A%22ch_09294841%22%2C%22client%22%3A%22pc_browser%22%2C%22third_party_user_id%22%3A%22123%22%2C%22user_online_num%22%3A3%2C%22connection_online_num%22%3A3%2C%22msg_id%22%3A%22msg_b30df22e0fa9c81458be1489c78bb2ec%22%2C%22date_time%22%3A%222020-06-18%2015%3A47%3A18%22%2C%22msg_source%22%3A%22prefix01%22%2C%22nick_name%22%3A%22492123%22%2C%22avatar%22%3A%22%22%2C%22event%22%3A%22Chat%22%2C%22room_id%22%3A%22%22%2C%22data%22%3A%22pp%22%7D"
    ,time: "Thu, 18 Jun 2020 07:47:18 GMT"
  }
  // test socket msg
  let decoded = decodeURIComponent(data.text)
  try {
    let json = JSON.parse(decoded)
    console.log(json)
    console.log(JSON.parse(json.data))
  } catch (e) {
    console.warn(e)
  }
}

parseSocketData()
