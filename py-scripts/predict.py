import sys

from textblob import TextBlob
text = sys.argv[1]

# import numpy as np
# num = np.random.randint(0,2)
# print(num)

polarity = TextBlob(text).sentiment.polarity
if polarity > 0.0:
    print("success")

else:
    print("danger")
