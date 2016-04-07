var count = Count();
var VOTE_NUM = 5;
function Count() {
    var num = 0;
    return {
        add: function() {
            num += 1;
        },
        reduce: function() {
            num -=1;
        },
        get count() {
            return num;
        }
    }
}

function youCanVoteNum(num) {
    $('#vote-remind-num').text(num);
}

$('.vote_check_btn').on('click', function() {
    var checkbox = $(this).children('input')[0];
    checkbox.checked = (!checkbox.checked);
    checkbox.checked === true ? count.add() : count.reduce();
    if(count.count < VOTE_NUM) {
        if (!$('#submit_btn').hasClass('weui_btn_disabled')) {
            $('#submit_btn').addClass('weui_btn_disabled');
        }
        youCanVoteNum(VOTE_NUM - count.count);
    } else if(count.count === VOTE_NUM){
        $('#submit_btn').removeClass('weui_btn_disabled');
        youCanVoteNum(VOTE_NUM - count.count);
    } else if(count.count > VOTE_NUM){
        checkbox.checked = !checkbox.checked;    //手动触发checkbox的点击事件
        confirm('不能超过5票');
        count.reduce();
    }
});

$('#submit_btn').on('click', function(){
    if(('#submit_btn').hasClass('weui_btn_disabled')) {
        return false;
    }
    var data = [];
    $('vote_check_input').each(function(index, item) {
        data.push(item.name);
    })
    $.post('url', data, function (res) {
        res = JSON.parse(res);
    });
})

 /**
 * 弹出层,黑黑的那种
 * @param  {string} msg  提示信息,建议短一点,不然不好看
 * @param  {number} time 弹出后自动隐藏的时间,可选,默认1秒
 */
function remind(msg, time) {
    var t = time || 1000;
    $('#loadingToast').hide();
    $('.weui_toast_content').text(msg);
    $('#toast').show();
    setTimeout(function() {
        $('#toast').hide();
    }, t);
}

/**
 * 弹出层,弹出确定
 * @param  {string} msg 弹出提示的描述
 * @param  {string} title 弹出提示的标题
 */
function confirm(msg, title) {
    var title = title || '提示';
    $('#loadingToast').hide();
    $('.weui_dialog_bd').text(msg);
    $('.weui_dialog_title').text(title);
    $('.weui_dialog_alert').show();
}
$('.weui_btn_dialog').on('click', function() {
    $('.weui_dialog_alert').hide();
});
