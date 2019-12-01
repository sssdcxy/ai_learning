var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    //fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
	interact(msg);
  setTimeout(function() {
    //fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})


function interact(message){
  // loading message
  $('<div class="message loading new"><figure class="avatar"><img src="/static/res/robot2.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  // make a POST request [ajax call]
  $.post('/message', {
		msg: message,
	}).done(function(reply) {
	  res_msg = reply['text'];
      len = res_msg.length;
	  // Message Received
      // remove loading meassage
      $('.message.loading').remove();
      // Add message to chatbox
      if(len>0){
        $('<div class="message new"><figure class="avatar"><img src="/static/res/robot2.png" /></figure>' + reply['text'][0] + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
      }
      if(len>1){
        $('<div class="message new"><figure class="avatar"><img src="/static/res/robot3.png" /></figure>' + reply['text'][1] + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
      }
      updateScrollbar();
	}).fail(function() {
	  alert('系统异常');

	});
}
