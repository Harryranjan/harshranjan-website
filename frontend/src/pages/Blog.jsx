import { Helmet } from "react-helmet-async";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Harsh Ranjan | Digital Marketing Insights</title>
        <meta
          name="description"
          content="Read the latest articles on digital marketing strategies, SEO tips, and industry insights."
        />
      </Helmet>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Blog</h1>
          <p className="text-xl text-gray-600">Blog page coming soon...</p>
        </div>
      </div>
    </>
  );
};

export default Blog;
