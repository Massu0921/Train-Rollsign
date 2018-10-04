# coding: utf-8
import sys,os,time
#sys.path.append(os.path.abspath(os.path.dirname(__file__) + '../'))
from flask import Flask, render_template, request, redirect, url_for
#from rgbmatrix import RGBMatrix, RGBMatrixOptions, graphics
from PIL import Image, ImageDraw, ImageSequence
"""
class Led_Setup(object):

    # Setup LEDs
    def __init__(self,chain=4,bright=50): # デフォルト設定（引数なしの場合）
        # Options
        self.options = RGBMatrixOptions()
        self.options.rows = 32
        self.options.chain_length = chain
        self.options.parallel = 1
        self.options.hardware_mapping = 'adafruit-hat-pwm'
        self.options.brightness = bright
        self.options.show_refresh_rate = 0
        self.matrix = RGBMatrix(options=self.options)
        self.canvas = self.matrix.CreateFrameCanvas()

        # テキスト用フォント
        self.gothic = graphics.Font()
        self.gothic.LoadFont("Resources/Gothic-16.bdf")

        # color
        self.white  = graphics.Color(255, 255, 255)

        # LED長さ
        self._width  = self.canvas.width
        self._height = self.canvas.height
"""
# appインスタンス生成
app = Flask(__name__)

@app.route('/')
def index():
    title = 'Welcome'
    message = 'Text Message'

    return render_template('index.html',message=message,title=title)

@app.route('/post',methods=['GET','POST'])
def post():
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
    #led = Led_Setup()
    app.run(host='0.0.0.0', port=8000, threaded=True)
