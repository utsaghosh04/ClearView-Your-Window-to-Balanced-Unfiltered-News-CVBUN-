from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend access

# MongoDB Connection
MONGO_URI = "mongodb+srv://siddhantsingh:5RhPCpEZG0uOEW2A@clearview.watxj.mongodb.net/?retryWrites=true&w=majority&appName=ClearView"
client = MongoClient(MONGO_URI)
db = client["news_db"]
collection = db["articles"]

@app.route('/news', methods=['GET'])
def get_news():
    articles = list(collection.find({}))  # Fetch stored articles
    for article in articles:
        article['_id'] = str(article['_id'])  # Convert ObjectId to string
        article.setdefault('id', str(ObjectId()))
        article.setdefault('title', 'Untitled News')
        article.setdefault('description', 'No description available.')
        article.setdefault('content', 'No content available.')
        article.setdefault('author', 'Unknown Author')
        article.setdefault('source', 'Unknown Source')
        article.setdefault('url', 'https://example.com')
        article.setdefault('imageUrl', 'https://via.placeholder.com/150')
        article.setdefault('publishedAt', datetime.datetime.utcnow().isoformat())
        article.setdefault('category', 'General')
        article.setdefault('topics', ['news'])
        article.setdefault('likes', 0)
        article.setdefault('comments', [])
    return jsonify(articles)

if __name__ == "__main__":
    app.run(debug=True)