import json
import os.path
import pathlib
import json
import numpy as np
import random
import math

# bootstrapps a dataSet

dirname = pathlib.Path(__file__).parent.resolve()
path_source = os.path.join(dirname, "../data/M_BTT/MBTT CO2.json")


mydict = {}

with open(path_source) as file:
    data = json.loads(file.read())

x1 = np.array(0)
y1 = np.array(0)

x2 = np.array(0)
y2 = np.array(0)

x3 = np.array(0)
y3 = np.array(0)

for i in range(1, len(data)):
    x1 = np.append(x1, data[i]["FeBTT"])
    y1 = np.append(y1, data[i]["298K"])

    x2 = np.append(x2, data[i]["FeBTT__1"])
    y2 = np.append(y2, data[i]["308K"])

    x3 = np.append(x3, data[i]["FeBTT__2"])
    y3 = np.append(y3, data[i]["318K"])

x1_new = np.array(0)
y1_new = np.array(0)

x2_new = np.array(0)
y2_new = np.array(0)

x3_new = np.array(0)
y3_new = np.array(0)


for i in range(0, len(data) - 1):
    index = math.floor(random.uniform(1, len(data) * 0.99999))

    x1_new = np.append(x1_new, data[index]["FeBTT"])
    y1_new = np.append(y1_new, data[index]["298K"])

    x2_new = np.append(x2_new, data[index]["FeBTT__1"])
    y2_new = np.append(y2_new, data[index]["308K"])

    x3_new = np.append(x3_new, data[index]["FeBTT__2"])
    y3_new = np.append(y3_new, data[index]["318K"])


def sort_together(x, y):
    x, y = zip(*sorted(zip(x, y)))
    return x, y
