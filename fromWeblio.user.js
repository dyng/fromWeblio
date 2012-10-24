// ==UserScript==
// @name        fromWeblio
// @namespace   towords.com
// @description replace toWords's content to that from Weblio (Japanese)
// @include     http://www.towords.com/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @author      dingye
// @version     0.01
// ==/UserScript==
!
function(){
    var fw_mutex = 1;
    var fw_show_once = 1;

    function fromWeblio() {
        if (fw_mutex == 1){
            fw_mutex = 0;
            var word = $('#wordInfo div:eq(0) span').text();

            GM_xmlhttpRequest({
                url: "http://ejje.weblio.jp/content/" + word,
                method: 'GET',
                onload:function(response){
                    $("#wordInfo div:eq(2)").html($(response.responseText).find("div.Kejje").text());
                    fw_mutex = 1;
                }
            });
        }
    }

    setInterval(function(){
        if($("#answerDiv").is(":visible")){
            if(fw_show_once == 1){
                fw_show_once = 0;
                fromWeblio();
            }
        }else{
            fw_show_once = 1;
        }
    }, 100);
}();
