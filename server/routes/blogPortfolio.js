import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data files paths
const blogsFilePath = path.join(__dirname, '..', 'data', 'blogs.json');
const portfolioFilePath = path.join(__dirname, '..', 'data', 'portfolio.json');

// Ensure data folder and default JSON files exist
const ensureDataFiles = () => {
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(blogsFilePath)) {
    const initialBlogs = [
      {
        id: "b1",
        title: "10 Proven Digital Marketing Strategies for High-Growth Brands in 2026",
        category: "Growth Strategy",
        date: "Sept 10, 2026",
        author: "Inflix Marketing Team",
        excerpt: "Learn how data-driven ad targeting, hyper-personalized landing pages, and multi-channel funnels consistently double conversion rates.",
        content: "Detailed blog post content goes here..."
      },
      {
        id: "b2",
        title: "How to Scale Meta & Google Ads Without Burning Your Acquisition Budget",
        category: "Paid Acquisition",
        date: "Sept 04, 2026",
        author: "Inflix Media Buyers",
        excerpt: "Discover the exact creative testing frameworks and bidding strategies we use to scale monthly ad spend past $50k at high ROAS.",
        content: "Detailed ad strategy content..."
      },
      {
        id: "b3",
        title: "Why Modern Brands Need High-Performance React Web Experiences",
        category: "Web & UX",
        date: "August 28, 2026",
        author: "Inflix Web Team",
        excerpt: "Slow websites kill ad conversions. Explore how sub-second load speeds and interactive UX components turn casual visitors into loyal buyers.",
        content: "Web performance optimization breakdown..."
      }
    ];
    fs.writeFileSync(blogsFilePath, JSON.stringify(initialBlogs, null, 2), 'utf-8');
  }

  if (!fs.existsSync(portfolioFilePath)) {
    const initialPortfolio = [
      {
        id: "p1",
        title: "Scaling E-Commerce Revenue by 340% via Omnichannel Media Buying",
        category: "Paid Acquisition",
        clientName: "Aura Apparel",
        metrics: "+340% Revenue Growth | 4.2x ROAS",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        description: "Full funnel redesign combined with high-intent Search and Meta retargeting campaigns."
      },
      {
        id: "p2",
        title: "High-Converting Brand Rebrand & Digital Experience Launch",
        category: "Brand & Web Design",
        clientName: "NexGen Fintech",
        metrics: "68% Bounce Rate Reduction | 2.5x Leads",
        imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
        description: "Complete visual identity rebrand and responsive web app experience."
      },
      {
        id: "p3",
        title: "Organic SEO & Content Authority Campaign for SaaS Enterprise",
        category: "SEO & Content",
        clientName: "CloudScale Systems",
        metrics: "120,000+ Monthly Organic Traffic",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        description: "Keyword mapping, technical SEO overhaul, and authority link acquisition."
      }
    ];
    fs.writeFileSync(portfolioFilePath, JSON.stringify(initialPortfolio, null, 2), 'utf-8');
  }
};

// Helper read/write functions
const readJSON = (filePath) => {
  ensureDataFiles();
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeJSON = (filePath, data) => {
  ensureDataFiles();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

/* ==========================================================================
   BLOG ENDPOINTS
   ========================================================================== */

// GET /api/blogs - Get all blogs (optional search filter)
router.get('/blogs', (req, res) => {
  try {
    let blogs = readJSON(blogsFilePath);
    const { search, category } = req.query;

    if (category) {
      blogs = blogs.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      blogs = blogs.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    }

    res.json({ success: true, count: blogs.length, blogs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve blogs.' });
  }
});

// GET /api/blogs/:id - Get single blog post by ID
router.get('/blogs/:id', (req, res) => {
  try {
    const blogs = readJSON(blogsFilePath);
    const blog = blogs.find(b => b.id === req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve blog post.' });
  }
});

// POST /api/blogs - Create a new blog post
router.post('/blogs', (req, res) => {
  try {
    const { title, category, excerpt, content, author } = req.body;
    if (!title || !category || !excerpt) {
      return res.status(400).json({ error: 'Title, category, and excerpt are required fields.' });
    }

    const blogs = readJSON(blogsFilePath);
    const newBlog = {
      id: `b_${Date.now()}`,
      title,
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: author || 'Inflix Team',
      excerpt,
      content: content || excerpt
    };

    blogs.unshift(newBlog);
    writeJSON(blogsFilePath, blogs);

    res.status(201).json({ success: true, message: 'Blog post created successfully!', blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog post.' });
  }
});

// PUT /api/blogs/:id - Update blog post
router.put('/blogs/:id', (req, res) => {
  try {
    const blogs = readJSON(blogsFilePath);
    const index = blogs.findIndex(b => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    blogs[index] = { ...blogs[index], ...req.body, id: req.params.id };
    writeJSON(blogsFilePath, blogs);

    res.json({ success: true, message: 'Blog post updated successfully!', blog: blogs[index] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog post.' });
  }
});

// DELETE /api/blogs/:id - Delete blog post
router.delete('/blogs/:id', (req, res) => {
  try {
    let blogs = readJSON(blogsFilePath);
    const initialLength = blogs.length;
    blogs = blogs.filter(b => b.id !== req.params.id);

    if (blogs.length === initialLength) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    writeJSON(blogsFilePath, blogs);
    res.json({ success: true, message: 'Blog post deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog post.' });
  }
});

/* ==========================================================================
   PORTFOLIO ENDPOINTS
   ========================================================================== */

// GET /api/portfolio - Get all portfolio items
router.get('/portfolio', (req, res) => {
  try {
    let items = readJSON(portfolioFilePath);
    const { category } = req.query;

    if (category) {
      items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
    }

    res.json({ success: true, count: items.length, items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve portfolio items.' });
  }
});

// GET /api/portfolio/:id - Get single portfolio item
router.get('/portfolio/:id', (req, res) => {
  try {
    const items = readJSON(portfolioFilePath);
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Portfolio item not found.' });
    }
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve portfolio item.' });
  }
});

// POST /api/portfolio - Create portfolio item
router.post('/portfolio', (req, res) => {
  try {
    const { title, category, clientName, metrics, imageUrl, description } = req.body;
    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required fields.' });
    }

    const items = readJSON(portfolioFilePath);
    const newItem = {
      id: `p_${Date.now()}`,
      title,
      category,
      clientName: clientName || 'Client Project',
      metrics: metrics || 'High Growth Result',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      description: description || ''
    };

    items.unshift(newItem);
    writeJSON(portfolioFilePath, items);

    res.status(201).json({ success: true, message: 'Portfolio item added successfully!', item: newItem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add portfolio item.' });
  }
});

// PUT /api/portfolio/:id - Update portfolio item
router.put('/portfolio/:id', (req, res) => {
  try {
    const items = readJSON(portfolioFilePath);
    const index = items.findIndex(i => i.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Portfolio item not found.' });
    }

    items[index] = { ...items[index], ...req.body, id: req.params.id };
    writeJSON(portfolioFilePath, items);

    res.json({ success: true, message: 'Portfolio item updated successfully!', item: items[index] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update portfolio item.' });
  }
});

// DELETE /api/portfolio/:id - Delete portfolio item
router.delete('/portfolio/:id', (req, res) => {
  try {
    let items = readJSON(portfolioFilePath);
    const initialLength = items.length;
    items = items.filter(i => i.id !== req.params.id);

    if (items.length === initialLength) {
      return res.status(404).json({ error: 'Portfolio item not found.' });
    }

    writeJSON(portfolioFilePath, items);
    res.json({ success: true, message: 'Portfolio item deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete portfolio item.' });
  }
});

export default router;
