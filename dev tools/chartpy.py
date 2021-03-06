# this script is just to make a chart
# to run this file on a computer for the first time, make sure to first run setup.py at least once
import json
import os
import matplotlib.pyplot as plt
import math

print(
    "\nInput file names without extentions. File has to be .json with two arrays x and y in an object: {{x:[1,2,3],y:[4,5,6]}}\n"
)
file1 = "stat"  # input('name file:\n') or 'data'
dirname = os.path.dirname(__file__) + "/../examples/"
filename = file1 + ".json"
path = os.path.join(dirname, filename)
with open(path) as myfile:
    data = myfile.read()
data1 = json.loads(data)

x = data1["x1"]
y = map(lambda y: math.log(y, 10), data1["y1"])
plt.hist(x, bins=10000, density=True, width=0.03)

color = "tab:blue"
plt.xlabel("SBET(+noise)/SBET(theoretical)")
plt.ylabel("freq")

plt.tick_params(axis="y", labelcolor=color)

plt.show()
