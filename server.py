# coding: utf-8
import sys
import os
import time
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '../'))
from modules import *
from flask import Flask, render_template, request, redirect, url_for, json

app = Flask(__name__)
led = None


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
    # 送られてきたjsonを処理
    data = request.json     # json取得（辞書型）
    data = Edit.fixdata(data)

    # 画像読み込み・LED表示
    led.select(data)
    led.display(data)

    return ""   # returnで何か返さないとエラー


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000, threaded=True)
