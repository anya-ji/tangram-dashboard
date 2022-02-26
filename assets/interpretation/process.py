'''
Combines all interp_info into one file.
Extract different whole annotations.
'''
# Combine
import json
examples = ['page4-51', 'page6-243']

rs={}

for file in examples:
  with open('./'+file+'_interp_info.json') as f:
    data = json.load(f)
  rs[file] = data

with open('./combined_interp_info.json', 'w') as f:
  json.dump(rs, f)

# Extract 
# looping till target text contains # (so all whole anns), 
# get all the whole anns with pred_type = text (avoid pred_type = image, which are duplicates)
diff_anns={}
for file in examples:
  with open('./'+file+'_interp_info.json') as f:
    data = json.load(f)

  whole_anns = []
  for d in data:
    if d['pred_type'] == 'text':
      if '#' in d['target_text']:
        break # done with all whole anns
      whole_anns.append(d['target_text'])

  diff_anns[file] = whole_anns

with open('./diff_anns.json', 'w') as f:
  json.dump(diff_anns, f)
