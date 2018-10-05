# coding: utf-8
import sys,os,time
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '../'))
from modules import LED
from flask import Flask, render_template, request, redirect, url_for
from PIL import Image, ImageDraw, ImageSequence

app = Flask(__name__)
led = None

@app.route('/')
def index():
    title = 'Welcome'
    message = 'Text Message'
    led = LED()

    return render_template('index.html',message=message,title=title)

@app.route('/post',methods=['GET','POST'])
def post():
    global led
    title = 'Hello'
    if request.method == 'POST':
        name = request.form['name']
        text = name + u'さん、ようこそ'
        led.scroll_text(text)

        # レンダリング
        return render_template('index.html',name=name, title=title)
    else:
        # リダイレクト
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0',port=8000,threaded=True)
