# this script is just to make a chart
# to run this file on a computer for the first time, make sure to first run setup.py at least once
import json
import os
import matplotlib.pyplot as plt
import math

print(
    "\nInput file names without extentions. File has to be .json with two arrays KH and nm in an object: {{KH:[1,2,3],nm:[4,5,6]}}\n"
)
file1 = "logParams"  # input('name file:\n') or 'data'
dirname = os.path.dirname(__file__) + "/../examples/"
filename = file1 + ".json"
path = os.path.join(dirname, filename)
with open(path) as myfile:
    data = myfile.read()
data1 = json.loads(data)

dataset = "nm"

y = data1[dataset]

plt.plot(y)

color = "tab:blue"
plt.xlabel("iteration")
plt.ylabel(dataset)


plt.show()
