// 設定
var click_scl_px =      64;   // クリック時スクロール量
var dblclick_scl_px =   192;  // ダブルクリック時スクロール量
var dr =                400;  // スクロール時間(ms)

// スクロール関数(ボタンid,移動量)
function scroll(id, scl_px) {
    // スクロール(id振り分け)
    switch (id) {
        // 種別・上ボタン
        case 'type-up':
            $("#type").animate({ top: "-=" + (scl_px) + "px" }, { duration: dr }, { complete: function () { } });
            break;
        // 種別・下ボタン
        case 'type-down':
            $("#type").animate({ top: "+=" + (scl_px) + "px" }, { duration: dr }, { complete: function () { } });
            break;
        // 行先・上ボタン
        case 'dest-up':
            $("#destination").animate({ top: "-=" + (scl_px) + "px" }, { duration: dr }, { complete: function () { } });
            break;
        // 行先・下ボタン
        case 'dest-down':
            $("#destination").animate({ top: "+=" + (scl_px) + "px" }, { duration: dr }, { complete: function () { } });
            break;

        default:
            break;
    }
    //$("#type").animate({ top: "-=" + (64) + "px" }, { duration: 400 }, { complete: function(){} });
}

// click,dblclick判定 -> スクロール実行
var clicked = false;    // クリック状態を保持するフラグ

function clickjudge() {
    // ボタンの個別id取得
    var id = $(this).attr("id")

    if (clicked) {
        // ダブルクリック時
        scroll(id, dblclick_scl_px);
        clicked = false;
        return;
    }

    clicked = true;

    setTimeout(function () {
        if (clicked) {
            // シングルクリック時
            scroll(id, click_scl_px);
        }
        clicked = false;
    }, 250);
}

// ボタンがクリックされたとき
$('.btn').on('click', clickjudge);