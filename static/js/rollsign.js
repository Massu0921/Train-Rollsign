var click_scl_px = 64;
var dblclick_scl_px = 192;
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

// ボタンが押されたとき
$('.btn').on({ 'click': scroll }, { 'dblclick': scroll });
