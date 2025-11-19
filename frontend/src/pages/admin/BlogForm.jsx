import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../utils/api';
import { Input, Textarea, Button, Card, ImageUpload } from '../../components/ui';

export default function BlogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: '',
    tags: '',
    is_published: false,
    meta_title: '',
    meta_description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blog/${id}`);
      const post = response.data;
      setFormData({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        featured_image: post.featured_image || '',
        category: post.category || '',
        tags: post.tags ? post.tags.join(', ') : '',
        is_published: post.is_published || false,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
      });
    } catch (error) {
      console.error('Failed to fetch post:', error);
      alert('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageChange = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      featured_image: imageUrl,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      if (isEditMode) {
        await api.put(`/blog/${id}`, payload);
      } else {
        await api.post('/blog', payload);
      }

      navigate('/admin/blog');
    } catch (error) {
      console.error('Failed to save post:', error);
      if (error.response?.data?.errors) {
        const apiErrors = {};
        error.response.data.errors.forEach((err) => {
          apiErrors[err.param] = err.msg;
        });
        setErrors(apiErrors);
      } else {
        alert('Failed to save post');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>
          {isEditMode ? 'Edit Blog Post' : 'Create Blog Post'} - Admin Dashboard
        </title>
      </Helmet>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? 'Edit Blog Post' : 'Create New Post'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditMode ? 'Update your blog post' : 'Create a new blog post'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Content Card */}
        <Card title="Content">
          <div className="space-y-4">
            {/* Title */}
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              error={errors.title}
              required
            />

            {/* Excerpt */}
            <Textarea
              label="Excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder="Brief summary of the post"
            />

            {/* Content */}
            <Textarea
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              placeholder="Write your post content here..."
              error={errors.content}
              helperText="Rich text editor coming soon. For now, you can use Markdown or HTML."
              required
              className="font-mono text-sm"
            />
          </div>
        </Card>

        {/* Media & Categorization */}
        <Card title="Media & Categorization">
          <div className="space-y-4">
            {/* Featured Image */}
            <ImageUpload
              value={formData.featured_image}
              onChange={handleImageChange}
              label="Featured Image"
            />

            {/* Category */}
            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Marketing, SEO, Branding"
            />

            {/* Tags */}
            <Input
              label="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Separate tags with commas"
            />
            <p className="text-gray-500 text-sm -mt-2">
              e.g., digital marketing, strategy, growth
            </p>
          </div>
        </Card>

        {/* SEO Settings */}
        <Card title="SEO Settings">
          <div className="space-y-4">
            {/* Meta Title */}
            <Input
              label="Meta Title"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
              maxLength={60}
              placeholder="Leave empty to use post title"
            />

            {/* Meta Description */}
            <Textarea
              label="Meta Description"
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              rows={3}
              maxLength={160}
              placeholder="Leave empty to use excerpt"
            />
          </div>
        </Card>

        {/* Publishing Options */}
        <Card title="Publishing">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_published"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">
              Publish this post immediately
            </label>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            If unchecked, this post will be saved as a draft
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/blog')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            {isEditMode ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}
