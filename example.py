import sys
import glob
import serial
#from serial import Serial
import json
import random
from time import sleep

import serial.tools.list_ports

ser = serial.Serial('COM4',timeout=None, baudrate=38400)
flag = [False,False,False]
data_array = [0,0,0]
'''while flag[0]==False or flag[1]==False or flag[2]==False:
    data = ser.readline()
    #print data[1:3]
    if data[0] == "T1":
       flag[0]=True
       data_array[0] = data
    elif data[1:3] == "T2":
        flag[1]=True
        data_array[1] = data
    elif data[1:3] == "T3":
        flag[2]=True
        data_array[2] = data
'''
count = 0

while count <3:
    data = ser.readline().strip()
    if data[0] == "T":
        count = count + 1
print data_array

