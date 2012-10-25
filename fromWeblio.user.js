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
    var style = '<style type="text/css">\
                .level0 {font-size: 16px; margin-top: 1px; margin-bottom: 1px;}\
                .lvlAH, .lvlNH, .lvlB {float: left;}\
                .lvlAh, .lvlNH {width: 20px;}\
                .KnenjSub, .KejjeIdH {font-size: 18px;}\
                .KnenjSub {margin-top: 5px; margin-bottom: 5px;}\
                .KejjeYr, .phraseEjjeT {font-size: 16px;}\
                .clr {clear: both;}\
                </style>';

    function formatWeblio(html){
        var kejje = $(html).find("div.Kejje");
        kejje.children("b,script,span").remove();
        return "<br/>" + kejje.html();
    }

    function fromWeblio(){
        if (fw_mutex == 1){
            fw_mutex = 0;
            var word = $('#wordInfo div:eq(0) span').text();

            var query = function() {
                GM_xmlhttpRequest({
                url: "http://ejje.weblio.jp/content/" + word,
                method: 'GET',
                onload: function(response) {
                        $("#wordInfo div:eq(2)").html(formatWeblio(response.responseText));
                        fw_mutex = 1;
                    },
                onabort:function(response){
                        alert('The Request Aborted');
                        fw_mutex = 1;
                    },
                onerror:function(response){
                        alert('Some Error Occured');
                        fw_mutex = 1;
                    },
                ontimeout:function(response){
                        query();
                    },
                });
            };

            query();
        }
    }

    $(style).appendTo('head');
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
