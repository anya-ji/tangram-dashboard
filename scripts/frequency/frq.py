'''
Make a json of word to frequency.
'''

import json
from collections import defaultdict

# train/val
# with open ('./train_part_sw.json') as f:
#   data = json.load(f)

# word_count=defaultdict(int)
# total=0
# for file, anns in data.items():
#   for ann in anns:
#     phrases = ann.split('#') # split by #
#     for phrase in phrases:
#       words = phrase.split(' ') # split by space
#       for w in words:
#         word_count[w]+=1
#         total+=1

# word_frq={}
# for word, count in word_count.items():
#   word_frq[word] = count/total

# print(total)
# with open ('../../assets/frequency/train_freq.json', 'w') as f:
#   json.dump(word_frq, f)


#total tokens:
#train = 49070

# dev
with open ('./dev_part.json') as f:
  data = json.load(f)

word_count=defaultdict(int)
total=0
for file, pc_to_anns in data.items():
  for anns in pc_to_anns.values():
    for ann in anns:
      phrases = ann.split('#') # split by #
      for phrase in phrases:
        words = phrase.split(' ') # split by space
        for w in words:
          word_count[w]+=1
          total+=1

word_frq={}
for word, count in word_count.items():
  word_frq[word] = count/total

print(total)
with open ('../../assets/frequency/dev_freq.json', 'w') as f:
  json.dump(word_frq, f)

# total tokens:
# dev = 138153