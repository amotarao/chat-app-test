document.addEventListener('DOMContentLoaded', function() {

  var uuid = getUniqueStr()

  var message_data = []

  var msgBox = new Vue ({
    el: '#message_box',
    data: {
      messages: message_data
    },
    methods: {
      checkUserOverlap: function (i) {
        if (i == 0) {
          return true
        }
        if (this.messages[i].is_mine == this.messages[i-1].is_mine) {
          return false
        }
        return true
      },
    }
  })

  var alert_class = 'info'
  var alert_text = '接続しています'

  var alertBox = new Vue ({
    el: '#alert_box',
    data: {
      class: alert_class,
      text: alert_text
    }
  })

  var $message = $('#chatInputMessage')
  var $name = $('#chatInputName')

  var wsUri = "ws://<SERVER_HOST>:<SERVER_PORT>/api/server.php"
  websocket = new WebSocket(wsUri)

  websocket.onopen = function(ev) {
    alert_class = 'success'; alert_text = '接続しました'
  }

  $('#send-btn').click(function(e){

    e.preventDefault()
    
    var myName = $name.val()
    var myMessage = $message.val()

    if (myMessage == "") {
      alert_class = 'error'; alert_text = 'メッセージを入力してください'
      return
    }

    var msg = {
      message: myMessage,
      name: myName,
      uuid : uuid
    }
    websocket.send(JSON.stringify(msg))

    return
  })



  websocket.onmessage = function(ev) {
    var msg = JSON.parse(ev.data)
    var type = msg.type
    var umsg = msg.message
    var uname = msg.name
    var uuuid = msg.uuid

    if (null == umsg || null == uname) {
      return;
    }

    is_mine = false;
    if (uuuid == uuid) {
      is_mine = true;
    }

    /*
    if(type == 'system')
    {
      $('#message_box').append("<div class=\"system_msg\">"+umsg+"</div>")
    }*/

    if (type != 'system') {
      message_data.push({
        name: uname,
        text: umsg,
        is_mine: is_mine
      })
    }

    $message.val('')
  }

  websocket.onerror	= function(ev) {
    alert_class = 'error'; alert_text = '接続に失敗しました'
  }
  websocket.onclose	= function(ev){
    alert_class = 'info'; alert_text = '接続を終了しました'
  }

  function getUniqueStr(myStrong){
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
  }

})
