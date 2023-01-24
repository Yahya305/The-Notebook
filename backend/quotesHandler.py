import json
import random
import sys
from flask import Flask,request,jsonify, send_file,url_for
from flask_cors import cross_origin

app = Flask(__name__)

sys.path.append('static/Image Processing')
import GrayScale

q= open("static\\quotes.json","r")
jsondata=q.read()
obj=json.loads(jsondata)
list=obj['quotes']

@app.route("/quotes")
@cross_origin()
def getQuote():
    myquote=list[random.randint(0,len(list))]
    return myquote

@app.route("/blogs")
@cross_origin()
def getBlog():
    b= open(".\\MOCK_DATA.json","r")
    obj=b.read()
    blogs=json.loads(obj)
    return blogs

# arr=[{'quote':'abcdefg'},{'quote':'success krni haii'}]
# @app.route("/blogs",methods=['POST'])
# @cross_origin()
# def postBlog():
#     qote={'quote':request.json['quote']}
#     arr.append(qote)
#     return jsonify(arr)
#     # return jsonify({'quotes':arr})

    # return  json.dumps({'username':request.form['blobb']})
    # inpFile=open(request.form["blobb"],"r")
    # j=inpFile.read()
    # print(j)
@app.route("/blogs",methods=['POST'])
@cross_origin()
def postBlog():
    try:
        image_file = request.files['inpFile']
        if image_file.filename == '':
            return jsonify({'error': 'No image file selected'}), 400
        # image_file.save('C:/Users/saimy/Desktop/image_file.bmp')
        image_file.save('E:/React/backend/static/Web Images/image_file.bmp')
        inpFile=open("static\\Web Images\\image_file.bmp","rb")
        outFile=open("static\\Web Images\\image_file.bmp","r+b")
        GrayScale.grayScale(inpFile,outFile)
        
        # return jsonify({'success': 'Image file uploaded'}), 200
        return url_for('static', filename='Web Images/image_file.bmp')
         
        # return send_file('static/Web Images/image_file.bmp', mimetype='image/bmp')
    except Exception as e:
        return e
q.close()
app.run(debug=True)
# def hi():
#     myquote=list[random.randint(0,len(list))]['quote']
#     return render_template('index.html',quote=myquote)

# qote={'quote':request.json['quote']}
# arr.append(qote)
# return jsonify(arr)
# return jsonify({'quotes':arr})