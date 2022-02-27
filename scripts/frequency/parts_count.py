'''
Make json of piece-count mapped to a list of color-text dicts.
'''
import json
from collections import defaultdict

### train / val
with open ('./color_texts_train.json') as f:
  data = json.load(f)


rs = defaultdict(list) # pc to dicts of color-texts
for file, dicts in data.items():
  for d in dicts:
    pc = len(d['color_groups'])
    d['file'] = file
    rs[pc].append(d)

print(sum([len(d) for d in rs.values()]))

with open ('../../assets/frequency/pc_to_dicts_train.json', 'w') as f:
  json.dump(rs, f)


# total files:
# train = 6689


### dev
# with open ('./powerset_color_texts_dev.json') as f:
#   data = json.load(f)


# rs = defaultdict(list) # pc to dicts of color-texts
# for file, pc_to_dicts in data.items():
#   for pc, dicts in pc_to_dicts.items():
#     for d in dicts:
#       d['file'] = file
#       rs[pc].append(d)

# print(sum([len(d) for d in rs.values()]))

# with open ('../../assets/frequency/pc_to_dicts_dev.json', 'w') as f:
#   json.dump(rs, f)

# total files:
# dev = 23618