import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiThumbsUp, FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { Article } from '../types';
import './ArticleCard.css'

interface ArticleCardProps {
  article: Article;
  onLike: (articleId: string) => void;
  onShare: (articleId: string) => void;
}

const ArticleCard = ({ article, onLike, onShare }: ArticleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card mb-6">
      {article.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
            {article.category}
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs text-secondary-500">
              {format(article.publishedAt, 'MMM d, yyyy')} • {article.source}
            </span>
          </div>
        </div>
        <Link to={`/article/${article.id}`}>
          <h2 className="text-xl font-bold mb-2 hover:text-primary-600 transition-colors">
            {article.title}
          </h2>
        </Link>
        <p className="text-secondary-600 mb-4">
          {isExpanded ? article.description : `${article.description.substring(0, 150)}...`}
          {article.description.length > 150 && (
            <button 
              onClick={toggleExpand} 
              className="text-primary-600 hover:text-primary-700 ml-1 font-medium"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
        <div className="flex items-center text-secondary-500 text-sm">
          <div className="flex items-center mr-4">
            <button 
              onClick={() => onLike(article.id)}
              className="flex items-center hover:text-primary-600"
            >
              <FiThumbsUp className="mr-1" />
              <span>{article.likes}</span>
            </button>
          </div>
          <Link to={`/article/${article.id}#comments`} className="flex items-center mr-4 hover:text-primary-600">
            <FiMessageSquare className="mr-1" />
            <span>{article.comments.length}</span>
          </Link>
          <button 
            onClick={() => onShare(article.id)}
            className="flex items-center hover:text-primary-600"
          >
            <FiShare2 className="mr-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;