# coding: utf-8
import sys
import os
import time
import threading
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '../'))
from modules import LED, Edit
from flask import Flask, render_template, request, redirect, url_for, json

app = Flask(__name__)
led = None

alt_save = False    # ループ表示多重起動防止

@app.route('/')
def index():
    global led

    # LEDインスタンス未生成時
    if led == None:
        led = LED()

    led.clear()

    return render_template('index.html')


@app.route('/E233')
def E233():
    return render_template('E233.html')


@app.route('/tobu_10000')
def tobu_10000():
    return render_template('tobu_10000.html')


@app.route('/send', methods=['GET', 'POST'])
def send():
    global alt_save
    # 送られてきたjsonを処理
    data = request.json     # json取得（辞書型）
    data = Edit.fixdata(data)

    # 画像読み込み・LED表示
    led.select(data)

    if led.alt_flg and not alt_save:
        th_alt = threading.Thread(target=led.alt_display)
        th_alt.setDaemon(True)
        th_alt.start()

    elif not led.alt_flg:
        led.display()

    if led.alt_flg:
        alt_save = True
    else:
        alt_save = False

    return ""   # returnで何か返さないとエラー


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000, threaded=True)
