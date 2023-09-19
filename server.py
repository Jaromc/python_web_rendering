from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

CORS(app)

#data storage
x = 0
y = 0

#called by Vue on refresh and when the user loads the webpage
@app.route('/')
def home():

   #load the stored data in json structure
	data = {
		'x' : x,
		'y' : y
	}

   #send data to caller
	return jsonify({'data': data})

#called when a client sends data
@socketio.on('data_update')
def handle_update(message):
   global x
   global y
   #grab the json data and store it so it can be grabbed 
   # when Vue refreshes the page with new data
   x = message['x']
   y = message['y']

if __name__ == "__main__":
	socketio.run(app, host="0.0.0.0", debug=True,port=7777)