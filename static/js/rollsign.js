// スクロール設定
var click_scl_px = 64;   // クリック時スクロール量
var dblclick_scl_px = 192;  // ダブルクリック時スクロール量
var dr = 400;  // スクロール時間(ms)

// 座標用(初期値:-64px 全面表示は0px)
var type_top = -64;
var dest_top = -64;
var line_top = -64;
var overall_top = 0;

// 全面表示用フラグ(画像終端時:false)
var overall_flg = false;

// 交互表示フラグ
var alternate_flg = false;

// 表示切り替え用
var mode = 'dest';

// 座標上限値設定
var up_limit_px = 0;   // スクロール上限値(共通値)

// 座標下限設定用コンストラクタ(種別, 行先,路線, 全面表示)
function limitpx(_type, _dest, _line, _overall, _dest_left) {
    this.type = _type;
    this.dest = _dest;
    this.line = _line;
    this.overall = _overall;
    this.dest_left = _dest_left;
}

// 車種ごとに座標下限値を設定
var train = [];
train["tobu_10000"] = new limitpx(-384, -1280, 0, -448, 128);    // 東武10000系列
train["E233-3000"] = new limitpx(-192, -1024, -256, -128, 96);    // E233-3000


// 全面表示するかの判定
function overalljudge(parentid) {
    if (overall_top > train[parentid].overall && overall_top < up_limit_px) {
        overall_flg = true;
    } else {
        overall_flg = false;
    }
}

// json送信部 スクロール後に呼び出し
function senddata(parentid) {

    // json用オブジェクト
    var json = {
        train_id: parentid,     // 車種のidを取得
        type_pos: type_top,     // 種別の座標を取得
        dest_pos: dest_top,     // 行先の座標を取得
        line_pos: line_top,     // 路線の座標を取得
        dest_leftpos: train[parentid].dest_left,    // 行先・路線表示の横座標
        overall_pos: overall_top,   // 全面表示の座標を取得
        overall_flg: overall_flg,   // 全面表示のフラグ
        alternate_flg: alternate_flg,   // 交互表示のフラグ
        mode: mode      // 表示切り替え
    };

    // ajaxを用いて非同期通信
    $.ajax({
        url: '/send',   // 送信URL
        type: 'post',
        data: JSON.stringify(json), // オブジェクトをjsonに
        contentType: 'application/JSON',
        dataType: 'JSON'
    });

}

// アニメーション
function animation() {
    $("#type").animate({ top: type_top + "px" }, { duration: dr }, { complete: function () { } });
    $("#destination").animate({ top: dest_top + "px" }, { duration: dr }, { complete: function () { } });
    $("#line").animate({ top: line_top + "px" }, { duration: dr }, { complete: function () { } });
    $("#overall").animate({ top: overall_top + "px" }, { duration: dr }, { complete: function () { } });
}

// スクロール(click,dblclick時)
function scroll(id, parentid, scl_px) {

    // 判定(id振り分け)
    if (id == 'type-up') {
        type_top -= scl_px;
    } else if (id == 'type-down') {
        type_top += scl_px;
    } else if (id == 'dest-up') {
        if (mode == 'dest') dest_top -= scl_px;
        else if (mode == 'line') line_top -= scl_px;
    } else if (id == 'dest-down') {
        if (mode == 'dest') dest_top += scl_px;
        else if (mode == 'line') line_top += scl_px;
    } else if (id == 'overall-up') {
        overall_top -= scl_px;
    } else if (id == 'overall-down') {
        overall_top += scl_px;
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

    if (line_top <= train[parentid].line) {
        line_top = train[parentid].line;
    } else if (line_top >= up_limit_px) {
        line_top = up_limit_px;
    }

    if (overall_top <= train[parentid].overall) {
        overall_top = train[parentid].overall;
    } else if (overall_top >= up_limit_px) {
        overall_top = up_limit_px;
    }

    // 全面表示判定
    overalljudge(parentid);

    // アニメーション
    animation();

    // サーバーにデータ送信
    senddata(parentid);
}

// スクロール(長押し時)
function holdscroll() {
    // id取得
    var id = $(this).attr("id");
    var parentid = $(this).parent().parent().attr("id");

    // 判定(id振り分け)
    if (id == 'type-up') {
        type_top = train[parentid].type;
    } else if (id == 'type-down') {
        type_top = up_limit_px;
    } else if (id == 'dest-up') {
        if (mode == 'dest') dest_top = train[parentid].dest;
        else if (mode == 'line') line_top = train[parentid].line;
    } else if (id == 'dest-down') {
        if (mode == 'dest') dest_top = up_limit_px;
        else if (mode == 'line') line_top = up_limit_px;
    } else if (id == 'overall-up') {
        overall_top = train[parentid].overall;
    } else if (id == 'overall-down') {
        overall_top = up_limit_px;
    }

    // 全面表示判定
    overalljudge(parentid);

    // アニメーション
    animation();

    // サーバーにデータ送信
    senddata(parentid);
}

// click,dblclick判定 -> スクロール実行
// hold時もこの関数は実行されるが、座標変化はしない
var clicked = false;    // クリック状態を保持するフラグ

function clickjudge() {
    // ボタンの個別id取得
    var id = $(this).attr("id");
    var parentid = $(this).parent().parent().attr("id");

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
$(window).on('load', function () {
    // 車種取得
    var train_id = $(".train-name").attr("id");
    //console.log(train_id);
    // 初期データ送信
    senddata(train_id);
    animation();
});

// ボタンがクリックされたとき
$('.roll-btn').on('click', clickjudge);
// ボタンが長押しされたとき
$('.roll-btn').on('taphold', holdscroll);

// 行先・路線表示切替
$("#change-btn").on('click', function () {
    if (mode == 'dest') {
        mode = 'line';
        $("#destination").animate({ left: 256 + "px" }, { duration: dr }, { complete: function () { } });
        $("#line").animate({ left: 96 + "px" }, { duration: dr }, { complete: function () { } });
    } else {
        mode = 'dest';
        $("#destination").animate({ left: 96 + "px" }, { duration: dr }, { complete: function () { } });
        $("#line").animate({ left: 256 + "px" }, { duration: dr }, { complete: function () { } });
    }
    var parentid = $(document).find('.train-name').attr('id');
    senddata(parentid);
});

// 交互表示ボタン
$("#ck-alternate").on('click', function () {
    alternate_flg = $(this).prop("checked");
    var parentid = $(document).find('.train-name').attr('id');
    senddata(parentid);
});