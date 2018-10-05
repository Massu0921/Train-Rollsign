# coding: utf-8
import sys,os,time,threading
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '../'))
from flask import Flask, render_template, request, redirect, url_for
from rgbmatrix import RGBMatrix, RGBMatrixOptions, graphics
from PIL import Image, ImageDraw, ImageSequence

app = Flask(__name__)

@app.route('/')
def index(self):
    title = 'Welcome'
    message = 'Text Message'

    return render_template('index.html',message=message,title=title)

@app.route('/post',methods=['GET','POST'])
def post(self):
    title = 'Hello'
    if request.method == 'POST':
        name = request.form['name']
        text = name + u'さん、ようこそ'
        """
        x = led._width
        while 1:
            led.canvas.Clear()
            len = graphics.DrawText(led.canvas, led.gothic, x, 30, led.white, text)
            if x + len < 0:
                led.canvas.Clear()
                led.canvas = led.matrix.SwapOnVSync(led.canvas)
                break
            x -= 1
            time.sleep(0.01)
            led.canvas = led.matrix.SwapOnVSync(led.canvas)
            """
        # レンダリング
        return render_template('index.html',name=name, title=title)
    else:
        # リダイレクト
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.debug = True
    host = '0.0.0.0'
    port = 8000
    threaded = True
    app_th = threading.Thread(target=led.app.run,args=(host,port,threaded,))
    app_th.setDaemon(True)
    app_th.start()

    try:
        print('successful')
        while True:
            time.sleep(100)
    except KeyboardInterrupt:
        sys.exit(0)
