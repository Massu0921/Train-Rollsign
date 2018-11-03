# -*- coding: utf-8 -*-
import time
import re
from rgbmatrix import RGBMatrix, RGBMatrixOptions, graphics
from PIL import Image, ImageDraw, ImageSequence


class Edit(object):     # 編集用
    # 座標・型変換
    @staticmethod
    def fixdata(data):
        data["type_pos"] = (data["type_pos"] - 64) / 2
        data["dest_pos"] = (data["dest_pos"] - 64) / 2
        data["line_pos"] = (data["line_pos"] - 64) / 2
        data["overall_pos"] = (data["overall_pos"] - 64) / 2
        data["dest_leftpos"] = data["dest_leftpos"] / 2
        #dest_leftpos = re.search(r'\d+', data["dest_leftpos"])
        #data["dest_leftpos"] = int(dest_leftpos.group(0)) / 2
        return data


class LED(object):      # LED表示器用

    # Setup LEDs
    def __init__(self, chain=4, bright=40):  # デフォルト設定（引数なしの場合）
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
        self.white = graphics.Color(255, 255, 255)

        # LED長さ
        self._width = self.canvas.width
        self._height = self.canvas.height

    # 車種から画像を選択、開く
    def select(self, data):
        # 交互表示用フラグ 先に設定し、既存のループを止める
        self.alt_flg = data["alternate_flg"]
        time.sleep(0.11)    # ループ終了待機

        # path
        path = {
            "common": "static/images/",
            "type": "_type.png",
            "dest": "_dest.png",
            "line": "_line.png",
            "overall": "_overall.png"
        }

        # open imgs
        type_path = path["common"] + data["train_id"] + path["type"]
        dest_path = path["common"] + data["train_id"] + path["dest"]
        line_path = path["common"] + data["train_id"] + path["line"]
        overall_path = path["common"] + data["train_id"] + path["overall"]

        self.type_img = Image.open(type_path).convert('RGB')
        self.dest_img = Image.open(dest_path).convert('RGB')
        try:
            self.line_img = Image.open(line_path).convert('RGB')
        except:
            pass
        self.overall_img = Image.open(overall_path).convert('RGB')
        
        self.data = data

    # 表示
    def display(self):
        self.canvas.Clear()

        self.canvas.SetImage(self.type_img, 0, self.data["type_pos"])
        if self.data["mode"] == 'dest':
            self.canvas.SetImage(
                self.dest_img, self.data["dest_leftpos"], self.data["dest_pos"])
        elif self.data["mode"] == 'line':
            self.canvas.SetImage(
                self.line_img, self.data["dest_leftpos"], self.data["line_pos"])

        # 全面表示する場合
        if self.data["overall_flg"]:
            self.canvas.SetImage(self.overall_img, 0, self.data["overall_pos"])

        self.canvas = self.matrix.SwapOnVSync(self.canvas)

    def alt_display(self):
        cnt = 0
        while self.alt_flg:
            self.canvas.Clear()

            self.canvas.SetImage(self.type_img, 0, self.data["type_pos"])

            # 行先・路線交互表示
            if cnt < 30:
                self.canvas.SetImage(
                    self.dest_img, self.data["dest_leftpos"], self.data["dest_pos"])
            elif cnt >= 30:
                self.canvas.SetImage(
                    self.line_img, self.data["dest_leftpos"], self.data["line_pos"])

            if cnt >= 60:
                cnt = 0

            self.canvas = self.matrix.SwapOnVSync(self.canvas)
            cnt += 1
            time.sleep(0.1)

    # 表示初期化
    def clear(self):
        self.canvas.Clear()
        self.canvas = self.matrix.SwapOnVSync(self.canvas)
