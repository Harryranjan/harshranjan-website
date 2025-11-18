import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          Harsh Ranjan - Digital Marketing Expert | 7 Years Transforming Brands
        </title>
        <meta
          name="description"
          content="Digital Marketing Expert with 7 years of experience. Specializing in SEO, Social Media, PPC, and Data-Driven Marketing Strategies."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Digital Marketing Expert
              <span className="block text-primary-600">
                7 Years Transforming Brands
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Data-driven marketing strategies that generate leads, increase
              ROI, and build lasting brand authority in the digital space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Book a Free Consultation
              </Link>
              <Link
                to="/services"
                className="bg-gray-100 text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
              >
                View My Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">7+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                200+
              </div>
              <div className="text-gray-600">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Successful Campaigns</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                250%
              </div>
              <div className="text-gray-600">Average ROI Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How I Can Help Your Business Grow
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive digital marketing solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "SEO & Content Marketing",
                description:
                  "Rank higher, attract more organic traffic, and establish thought leadership.",
              },
              {
                title: "Social Media Marketing",
                description:
                  "Build engaged communities and convert followers into customers.",
              },
              {
                title: "PPC & Paid Advertising",
                description:
                  "Get immediate results with optimized ad campaigns that maximize ROI.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link
                  to="/services"
                  className="text-primary-600 font-semibold hover:text-primary-700"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Let's discuss how I can help you achieve your marketing goals.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Schedule a Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
