// 設定
var click_scl_px = 64;   // クリック時スクロール量
var dblclick_scl_px = 192;  // ダブルクリック時スクロール量
var dr = 400;  // スクロール時間(ms)

// 座標用(初期値:-64px)
var type_top = -64;
var dest_top = -64;

// 上限・下限値設定
var up_limit_px = 0;   // スクロール上限値(共通値)

// 下限設定用コンストラクタ(種別,行先)
function limitpx(_type, _dest) {
    this.type = _type;
    this.dest = _dest;
}
// 種類ごとに下限値を設定
var train = [];
train["tobu10000"] = new limitpx(-384, -1280);    // 東武10000系列

// フォーム送信部
function sendparam(now_px) {
    
}

// スクロール(click,dblclick時)
function scroll(id, parentid, scl_px) {

    // スクロール(id振り分け)
    if (id == 'type-up') {
        type_top -= scl_px;
    } else if (id == 'type-down') {
        type_top += scl_px;
    } else if (id == 'dest-up') {
        dest_top -= scl_px;
    } else if (id == 'dest-down') {
        dest_top += scl_px;
    }

    // 限界判定
    if (type_top <= train[parentid].type) {
        type_top = train[parentid].type;
    } else if (type_top >= up_limit_px) {
        type_top = up_limit_px;
    }

    if (dest_top <= train[parentid].dest) {
        dest_top = train[parentid].dest;
    } else if (dest_top >= up_limit_px) {
        dest_top = up_limit_px;
    }

    $("#type").animate({ top: type_top + "px" }, { duration: dr }, { complete: function () { } });
    $("#destination").animate({ top: dest_top + "px" }, { duration: dr }, { complete: function () { } });
}

// スクロール(長押し時)
function holdscroll() {
    // id取得
    var id = $(this).attr("id");
    var parentid = $(this).parent().attr("id");

    // スクロール(id振り分け)
    if (id == 'type-up') {
        type_top = train[parentid].type;
    } else if (id == 'type-down') {
        type_top = up_limit_px;
    } else if (id == 'dest-up') {
        dest_top = train[parentid].dest;
    } else if (id == 'dest-down') {
        dest_top = up_limit_px;
    }

    $("#type").animate({ top: type_top + "px" }, { duration: dr }, { complete: function () { } });
    $("#destination").animate({ top: dest_top + "px" }, { duration: dr }, { complete: function () { } });
}

// click,dblclick判定 -> スクロール実行
var clicked = false;    // クリック状態を保持するフラグ

function clickjudge() {
    // ボタンの個別id取得
    var id = $(this).attr("id");
    var parentid = $(this).parent().attr("id");

    if (clicked) {
        // ダブルクリック時
        scroll(id, parentid, dblclick_scl_px);
        clicked = false;
        return;
    }

    clicked = true;

    setTimeout(function () {
        if (clicked) {
            // クリック時
            scroll(id, parentid, click_scl_px);
        }
        clicked = false;
    }, 250);
}

// 初期位置に移動
// 読み込み後実行
$(window).on('load',function(){
    $("#type").animate({ top: type_top + "px" }, { duration: dr }, { complete: function () { } });
    $("#destination").animate({ top: dest_top + "px" }, { duration: dr }, { complete: function () { } });
});

// ボタンがクリックされたとき
$('.btn').on('click', clickjudge);
// ボタンが長押しされたとき
$('.btn').on('taphold', holdscroll);
