from os import listdir
from os.path import isfile, join
import re
import json

mypath = "/Users/anyaji/Desktop/tangram-online/public/assets"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

pattern = r'points="(.*?)"'
pattern_viewBox = r'viewBox="(.*?)"'
pattern_transform = r'transform="(.*?)"'

rs = {}
i=1
for file in onlyfiles:
  if file.startswith('page') or file == 'a.svg':
    f = open(join(mypath, file),'r').read().replace("\n"," ")
    points = re.findall(pattern, f)
    viewBox = re.findall(pattern_viewBox, f)
    rs[file] = {'points': points, 'viewBox': viewBox[0], 'transform': ['','','','','','','']}

    transform = re.findall(pattern_transform, f)
    if len(transform) !=0:
      trans = []
      lines = open(join(mypath, file),'r').readlines()
      for l in lines:
        if 'polygon'in l and 'id' in l:
          m = re.findall(pattern_transform, l)
          if len(m)==0:
            trans.append('')
          else:
            trans.append(m[0])
      rs[file]['transform'] = trans
    i+=1

with open('tangrams.json', 'w') as fp:
    json.dump(rs, fp)