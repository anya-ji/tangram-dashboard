import json
from collections import defaultdict

with open ('./color_texts_train.json') as f:
  data = json.load(f)


rs = defaultdict(list)
for file, dicts in data.items():
  for d in dicts:
    pc = len(d['color_groups'])
    d['file'] = file
    rs[pc].append(d)


with open ('./pc_to_dicts_train.json', 'w') as f:
  json.dump(rs, f)


#total:
#train = 49070