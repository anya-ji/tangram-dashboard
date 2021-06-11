from os import listdir
from os.path import isfile, join
import re
import json

mypath = "./"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

pattern = r'points="(.*?)"'
rs = {}
for file in onlyfiles:
  if file!="gen.py" and file!="points.json":
    f = open(file,'r').read().replace("\n"," ")
    points = re.findall(pattern, f)
    # rs.append({file: points})
    rs[file] = points
    print(rs)

with open('points.json', 'w') as fp:
    json.dump(rs, fp)