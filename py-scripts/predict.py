import sys

from textblob import TextBlob
text = sys.argv[1]

polarity = TextBlob(text).sentiment.polarity
if polarity > 0.0:
    print("success")

else:
    print("danger")
