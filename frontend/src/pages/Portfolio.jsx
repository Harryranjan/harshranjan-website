import { Helmet } from "react-helmet-async";

const Portfolio = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio - Harsh Ranjan | Case Studies & Success Stories</title>
        <meta
          name="description"
          content="View successful digital marketing campaigns and case studies with proven results."
        />
      </Helmet>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Portfolio</h1>
          <p className="text-xl text-gray-600">Portfolio page coming soon...</p>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
