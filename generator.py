from datetime import datetime
import time
import socketio
import random

socket = socketio.Client() 
socket.connect('http://0.0.0.0:7777')

start_time = time.time()
x = 0
y = 0

#start a timed loop that sends random position data to the sever once per second
while time.time() - start_time < 120:
   socket.emit('data_update', { 'x': x, 'y' : y })
   x = random.randint(0,250)  
   y = random.randint(0,250)
   time.sleep(1)