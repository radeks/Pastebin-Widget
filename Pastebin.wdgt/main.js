var api_key = '4dff4088c2717bc2303972da91404f34';

$(document).ready(function() {
  
  var uname = widget.preferenceForKey("username");
  var passw = widget.preferenceForKey("password");
  
  $("#paste_username").val(uname);
  $("#paste_password").val(passw);
  
  $("#paste_username").keyup(function() {
    widget.setPreferenceForKey($(this).val(), "username");
  });
  
  $("#paste_password").keyup(function() {
    widget.setPreferenceForKey($(this).val(), "password");
  });
  
  $("#save_paste_button").click(function() {
    if($("#paste_text").val() == "") {
     $("#error_notice").text("Please enter or paste a paste.").fadeIn(200, function() {
       $(this).fadeOut(5000);
     });
    } else {
      $("#loading_notice").fadeIn(200);
      
      if ($("#paste_username").val() != "" && $("#paste_password").val() != "") {
        $.post("http://pastebin.com/api/api_login.php", {
          api_dev_key: api_key,
          api_user_name: $("#paste_username").val(),
          api_user_password: $("#paste_password").val()
        }, function(data) {
          if (data.substr(0, 3) != "Bad") {
            post_paste(data);
          } else {
            $("#loading_notice").hide();
             $("#error_notice").text("Wrong login details.").fadeIn(200, function() {
               $(this).fadeOut(5000);
             });
          }
        });
      } else {
        post_paste(-1);
      }
    }
  });
  
  $("#hide_url").click(function() {
    $("#url").fadeOut(200);
  });
});

function post_paste(userkey) {
$.post("http://pastebin.com/api/api_post.php",
{
 api_dev_key: api_key,
 api_option: 'paste',
 api_paste_code: $("#paste_text").val(),
 api_paste_name: $("#paste_name").val(),
 api_paste_private: $("#paste_private").val(),
 api_paste_expire_date: $("#paste_expire_date").val(),
 api_paste_format: $("#paste_format").val(),
 api_user_key: userkey,
},
function(data) {
 if(data.substr(0, 4) == "http") {
   $("#url_link").text(data).attr("href", "javascript:widget.openURL('" + data + "');");
   $("#url").fadeIn(200);
   
   $("#paste_text").val('');
   $("#paste_name").val('');
 } else {
   $("#error_notice").text("An unexpected error occurred.").fadeIn(200, function() {
     $(this).fadeOut(5000);
   });
 }
 $("#loading_notice").fadeOut(200);
}
);
}