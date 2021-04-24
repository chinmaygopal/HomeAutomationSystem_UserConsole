import sys
import glob
import serial
#from serial import Serial
import json
import random
from time import sleep

import serial.tools.list_ports
from flask import Flask, session,render_template, request,redirect,url_for,g,jsonify
from flask import Flask
app = Flask(__name__, static_url_path="/static", static_folder='C:/Users/Chinmay/PycharmProjects/UserConsole/templates')
serial_baudrate = 38400


serial_port = str(serial.tools.list_ports.comports()[0])[0:4]
# print serial_port

room_structure = [{'temperature_control': '1', 'bulb_control': '0', 'room_id': '1'},
                  {'temperature_control': '1', 'bulb_control': '0', 'room_id': '2'},
                  {'temperature_control': '1', 'bulb_control': '0', 'room_id': '3'}]

serial_data_r1 = "1:19.8:133:0:0:0"
serial_data_r2 = "2:29.8:133:0:0:0"
serial_data_r3 = "3:39.8:133:0:0:0"


class Room(object):
    def __init__(self, room_id, room_presence, bulb_presence, bulb_condition):
        self._room_id = room_id
        self._room_presence = room_presence
        self._bulb_presence = bulb_presence
        self._bulb_condition = bulb_condition

    # room_id
    @property
    def room_id(self):
        return self._room_id

    @room_id.setter
    def room_id(self, value):
        self._room_id = value

    # room_presence
    @property
    def room_presence(self):
        return self._room_presence

    @room_presence.setter
    def room_presence(self, value):
        self._room_presence = value

    # bulb_presence
    @property
    def bulb_presence(self):
        return self._bulb_presence

    @bulb_presence.setter
    def bulb_presence(self, value):
        self._bulb_presence = value

    # bulb_presence
    @property
    def bulb_condition(self):
        return self._bulb_condition

    @bulb_condition.setter
    def bulb_condition(self, value):
        self._bulb_condition = value


# create rooms
room_1 = Room("1", False, False, "OFF")
room_2 = Room("2", False, False, "OFF")
room_3 = Room("3", False, False, "OFF")

room_list = [room_1, room_2, room_3]


def data_is_already_read():
    return_val = False
    if True in data_is_already_read():
        return_val = True
    return return_val


def write_data_serial(control_info):
    pass


def get_data_serial():
    serial_data = []
    serial_data.append(serial_data_r1)
    serial_data.append(serial_data_r2)
    serial_data.append(serial_data_r3)
    data_read = True
    return serial_data


'''
data input format
<RoomID>:<TemperatureVal>:<LightVal>:<LightStatus>:<FanStatus>:<heatingStatus>
'''


def parse_data(room_id):
    room_array = {}
    serial_data_val = get_data_serial()

    for each_room in serial_data_val:
        serial_data_array = each_room.split(':')
        if room_id == serial_data_array[0]:
            room_array["room_id"] = serial_data_array[0]
            room_array["temperature"] = serial_data_array[1]
            room_array["light_val"] = serial_data_array[2]
            room_array["bulb_status"] = serial_data_array[3]
            room_array["fan_status"] = serial_data_array[4]
            room_array["heating_status"] = serial_data_array[5][:1]

    return room_array


@app.route("/getTempRoom", methods=['POST'])
def get_temp_room():
    # read room id from text box
    # room_id = request.form['roomID']
    # room_info = parse_data(room_id)
    # print (room_info)
    # compare temperature
    # cpare brightness

    ser = serial.Serial(timeout=None, port=serial_port, baudrate=serial_baudrate, xonxoff=False, rtscts=False, dsrdtr=False)
    if not ser.isOpen():
        ser.open()
    print ("Now Reading")
    data_1 = ser.readline()
    data_2 = ser.readline()
    temperature_room_1 = 0
    if data_1[0] == 'T':
        temperature_room_1 = data_1[2:]
    else:
        temperature_room_1 = data_2[2:]

    temperature_room_2 = random.randint(250, 280) / 10.0
    temperature_room_3 = random.randint(250, 280) / 10.0

    return_val = {"status": "OK", "temperature_room_1": temperature_room_1, "temperature_room_2": temperature_room_2,
                  "temperature_room_3": temperature_room_3}
    return json.dumps(return_val)


@app.route("/enableBulbRoom", methods=['POST'])
def enable_bulb_room():
    # read room id from text box
    room_id = int('1') - 1
    room_id = int(request.form['roomID']) - 1

    room_structure[room_id]["bulb_control"] = '1'

    return json.dumps("success")


@app.route("/disableBulbRoom", methods=['POST'])
def disable_bulb_room():
    # read room id from text box
    room_id = int('1') - 1
    room_structure[room_id]["bulb_control"] = '0'

    return json.dumps("success")


@app.route("/")
def hello():
    '''
    ser = serial.Serial(port=serial_port, baudrate=serial_baudrate)
    print ("Now Writing")
    #print('com3 is open', ser.isOpen())
    #ser.write("98.6")
    #ser.write("9\n\r")

    data = []

    data.append(ser.readline())
    data.append(ser.readline())
    data.append(ser.readline())
    print data
    '''
    return render_template('index.html')

    # return "Hello"


@app.route("/getRoomStatus", methods=['POST'])
def get_room_status():
    if request.method == 'POST':
        # roomId_1, roomId_2, roomId_3, roomId_123
        room_id = request.form['getRoomId_py']
        room_presence = request.form['getRoomPre_py']
        print room_id, room_presence

        return_val = {"status": "OK"}
        if room_presence == "Added":
            if "1" == room_id[7]:
                room_list[0].room_presence = True

            elif "2" == room_id[7]:
                room_list[1].room_presence = True

            elif "3" == room_id[7]:
                room_list[2].room_presence = True

            else:
                return_val = {"status": "BAD"}

        elif room_presence == "Removed":
            if "1" == room_id[7:]:
                room_list[0].room_presence = False

            elif "2" == room_id[7:]:
                room_list[1].room_presence = False

            elif "3" == room_id[7:]:
                room_list[2].room_presence = False

            elif "123" == room_id[7:]:
                for each_room in room_list:
                    each_room.room_presence = "False"
            else:
                return_val = {"status": "BAD"}

    return json.dumps(return_val)


@app.route("/getBulbStatus", methods=['POST'])
def get_bulb_status():
    if request.method == 'POST':
        # roomId_1, roomId_2, roomId_3, roomId_123
        room_id = request.form['getBulbId_py']
        # BulbAdded, BulbRemoved
        bulb_presence = request.form['getBulbState_py']
        print room_id, bulb_presence

        return_val = {"status": "OK"}
        if bulb_presence == "BulbAdded":
            if "1" == room_id[7]:
                room_list[0].bulb_presence = True

            elif "2" == room_id[7]:
                room_list[1].bulb_presence = True

            elif "3" == room_id[7]:
                room_list[2].bulb_presence = True

            else:
                return_val = {"status": "BAD"}

        elif bulb_presence == "BulbRemoved":
            if "1" == room_id[7:]:
                room_list[0].bulb_presence = False

            elif "2" == room_id[7:]:
                room_list[1].bulb_presence = False

            elif "3" == room_id[7:]:
                room_list[2].bulb_presence = False

            else:
                return_val = {"status": "BAD"}

    return json.dumps(return_val)


@app.route("/getBulbCondition", methods=['POST'])
def get_bulb_condition():
    if request.method == 'POST':
        # roomId_1, roomId_2, roomId_3, roomId_123
        room_id = request.form['getBulbSwId_py']
        # BulbOn, BulbOff
        bulb_condition = request.form['getBulbSwitch_py']
        print room_id, bulb_condition
        return_val = {"status": "OK"}
        if bulb_condition == "BulbOn":
            if "1" == room_id[7]:
                room_list[0].bulb_condition = "ON"

            elif "2" == room_id[7]:
                room_list[1].bulb_condition = "ON"

            elif "3" == room_id[7]:
                room_list[2].bulb_condition = "ON"

            else:
                return_val = {"status": "BAD"}

        elif bulb_condition == "BulbOff":
            if "1" == room_id[7]:
                room_list[0].bulb_condition = "OFF"

            elif "2" == room_id[7]:
                room_list[1].bulb_condition = "OFF"

            elif "3" == room_id[7]:
                room_list[2].bulb_condition = "OFF"

            else:
                return_val = {"status": "BAD"}

    return json.dumps(return_val)


@app.route("/writeCmd")
def writeCmd():
    ser = serial.Serial(port=serial_port, baudrate=serial_baudrate)
    temp_val = 0
    try:
        if not ser.isOpen():
            ser.open()
        print ("Now Reading")
        # print('com3 is open', ser.isOpen())
        ser.write("T1110000026\r")
    except serial.SerialException:
            sleep(1)
            ser.write("T1110000026\r")
    return "Done"


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True, threaded=True)



