import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "../types";

const NewsList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/news")  // Fetch stored news
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trending News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            onLike={() => console.log("Liked", article.title)}
            onShare={() => console.log("Shared", article.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;