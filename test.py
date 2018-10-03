# coding: utf-8
from flask import Flask, render_template, request, redirect, url_for

# appインスタンス生成
app = Flask(__name__)

@app.route('/')
def index():
    title = 'Welcome'
    message = 'Text Message'

    return render_template('index.html',message=message,title=title)

@app.route('/post',methods['GET','POST'])
def post():
    title = 'Hello'
    if request.method == 'POST':
        name = request.form['name']
