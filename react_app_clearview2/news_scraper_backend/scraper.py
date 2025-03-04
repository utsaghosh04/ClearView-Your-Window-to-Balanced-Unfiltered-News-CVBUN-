from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup
import datetime

# MongoDB Connection
MONGO_URI = "mongodb+srv://siddhantsingh:5RhPCpEZG0uOEW2A@clearview.watxj.mongodb.net/?retryWrites=true&w=majority&appName=ClearView"
client = MongoClient(MONGO_URI)
db = client["news_db"]
collection = db["articles"]

def scrape_articles():
    headers = {"User-Agent": "Mozilla/5.0"}
    url = "https://www.bbc.com/news"  # Replace with your target website
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return None
    soup = BeautifulSoup(response.text, "html.parser")

    articles = []
    items = soup.select("a h2")  # Select all <h2> inside <a>

    for item in items:
        title = item.text.strip()
        article_url = item.find_parent("a")["href"]
        full_url = f"https://www.bbc.com{article_url}"  # Ensure full URL

        # Check if article already exists in the database
        if collection.find_one({"url": full_url}):
            continue  # Skip duplicate articles

        articles.append({
            "title": title,
            "url": full_url,
            "publishedAt": datetime.datetime.utcnow(),
        })

    if articles:
        collection.insert_many(articles, ordered=False)
        print(f"✅ {len(articles)} New Articles Stored in MongoDB")
    else:
        print("⚠️ No new articles found.")

if __name__ == "__main__":
    scrape_articles()