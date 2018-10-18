var scrolljudge = false;

function scroll() {
    var id = $(this).attr("id")
    //alert(id)
    switch (id) {
        case 'type-up':
            $("#type").animate({ top: "-=" + (64) + "px" }, { duration: 400 }, { complete: function () { } });
            break;
        case 'type-down':
            $("#type").animate({ top: "+=" + (64) + "px" }, { duration: 400 }, { complete: function () { } });
            break;
        case 'dest-up':
            $("#destination").animate({ top: "-=" + (64) + "px" }, { duration: 400 }, { complete: function () { } });
            break;
        case 'dest-down':
            $("#destination").animate({ top: "+=" + (64) + "px" }, { duration: 400 }, { complete: function () { } });
            break;
        default:
            break;
    }
    //$("#type").animate({ top: "-=" + (64) + "px" }, { duration: 400 }, { complete: function(){} });
}

function longscroll() {
    while (scrolljudge) {
        console.log('down')
    }
}

function btndown(){
    scrolljudge = true;
}

function btnup(params) {
    scrolljudge = false;
}

// ボタンが押されたとき
$('.btn').on('click', scroll);
$('.btn').on('mousedown', btndown);
$('.btn').on('mouseup', x);
