from keras.datasets import imdb
from keras.preprocessing import sequence
from keras import Sequential
from keras.layers import Embedding, LSTM, Dense, Dropout
import numpy as np
import sys

max_words = 500
embedding_size=32
vocab_size = 5000
word2id = imdb.get_word_index()
string = sys.argv[1]

def create_model():
    model=Sequential()
    model.add(Embedding(vocab_size , embedding_size, input_length=max_words))
    model.add(LSTM(100))
    model.add(Dense(1, activation='sigmoid'))
    return model

def findclass(string):
    string = string.lower()
    new_string = string.split(' ')
    out = [word2id.get(i, ' ') for i in new_string if word2id.get(i, ' ') != ' ']
    outnew = np.array([out])
    
    new = sequence.pad_sequences(outnew,maxlen=max_words)
    new_model = create_model()
    new_model.load_weights('py-scripts/model-dependencies/rnn/new.h5')
    return new_model.predict(new)[0][0]

sentiment = findclass(string)

if sentiment > 0.5:
    print('danger')
else:
    print('success')