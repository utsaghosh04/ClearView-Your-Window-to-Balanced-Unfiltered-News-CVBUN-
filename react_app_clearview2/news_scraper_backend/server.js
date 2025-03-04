import express from 'express';  // ✅ Correct for ES modules
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://siddhantsingh:5RhPCpEZG0uOEW2A@clearview.watxj.mongodb.net/?retryWrites=true&w=majority&appName=ClearView", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  publishedAt: Date,
  likes: Number,
});

const Article = mongoose.model('Article', articleSchema);

app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishedAt: -1 }).limit(20);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching articles' });
  }
});

app.post('/api/articles/:id/like', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Error liking article' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
