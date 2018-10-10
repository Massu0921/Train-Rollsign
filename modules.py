# -*- coding: utf-8 -*-
import time
from rgbmatrix import RGBMatrix, RGBMatrixOptions, graphics
from PIL import Image, ImageDraw, ImageSequence

class LED(object):

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

    def scroll_text(self,text):
        x = self._width
        while 1:
            self.canvas.Clear()
            len = graphics.DrawText(self.canvas, self.gothic, x, 30, self.white, text)
            if x + len < 0:
                break
            x -= 1
            time.sleep(0.01)
            self.canvas = self.matrix.SwapOnVSync(self.canvas)

        self.canvas.Clear()
        self.canvas = self.matrix.SwapOnVSync(self.canvas)
