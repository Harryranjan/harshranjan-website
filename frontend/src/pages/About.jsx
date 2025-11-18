import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - Harsh Ranjan | Digital Marketing Expert</title>
        <meta
          name="description"
          content="Learn about Harsh Ranjan's 7-year journey in digital marketing and expertise in SEO, social media, and data-driven strategies."
        />
      </Helmet>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">About Me</h1>
          <p className="text-xl text-gray-600">About page coming soon...</p>
        </div>
      </div>
    </>
  );
};

export default About;
