from os import listdir
from os.path import isfile, join
import re
import json

mypath = "/Users/anyaji/Desktop/tangram-online/public/assets"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

pattern = r'points="(.*?)"'
pattern_viewBox = r'viewBox="(.*?)"'

rs = {}
i=1
for file in onlyfiles:
  if file.startswith('page') or file == 'a.svg':
    f = open(join(mypath, file),'r').read().replace("\n"," ")
    points = re.findall(pattern, f)
    viewBox = re.findall(pattern_viewBox, f)
    rs[file] = {'points': points, 'viewBox': viewBox[0]}
    print(i, ': ', file)
    i+=1

with open('tangrams.json', 'w') as fp:
    json.dump(rs, fp)