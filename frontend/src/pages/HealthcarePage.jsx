import { useTranslation } from "react-i18next";
import { useEffect } from "react";

/**
 * Healthcare Landing Page with i18n support
 * Demonstrates the language switching functionality
 */
export default function HealthcarePage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log("🏥 Healthcare Page - Current Language:", i18n.language);
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">{t("home.hero.title")}</h1>
            <p className="text-xl mb-6 text-blue-100">
              {t("home.hero.subtitle")}
            </p>
            <p className="text-lg mb-8 text-white/90">
              {t("home.hero.tagline")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg">
                {t("home.hero.bookAppointment")}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                {t("home.hero.learnMore")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white shadow-md -mt-8 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">4.8★</div>
              <div className="text-gray-600">{t("home.stats.rating")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">7+</div>
              <div className="text-gray-600">{t("home.stats.experience")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600">1000+</div>
              <div className="text-gray-600">{t("home.stats.patients")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("home.services.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.services.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Spine Service */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-spine text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t("home.services.spine.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.services.spine.description")}
              </p>
            </div>

            {/* Joint Service */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-bone text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t("home.services.joint.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.services.joint.description")}
              </p>
            </div>

            {/* Neuro Service */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-brain text-purple-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t("home.services.neuro.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.services.neuro.description")}
              </p>
            </div>

            {/* Post-Op Service */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-hospital text-orange-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t("home.services.postOp.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.services.postOp.description")}
              </p>
            </div>

            {/* Manual Therapy */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-hands text-teal-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t("home.services.manual.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.services.manual.description")}
              </p>
            </div>

            {/* Cupping */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-spa text-pink-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t("home.services.cupping.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.services.cupping.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("home.doctors.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Dr. Subodh */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-user-md text-white text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">
                {t("home.doctors.drSubodh.name")}
              </h3>
              <p className="text-blue-600 text-center font-semibold mb-4">
                {t("home.doctors.drSubodh.credentials")}
              </p>
              <p className="text-gray-600 text-center">
                {t("home.doctors.drSubodh.description")}
              </p>
            </div>

            {/* Dr. Tiwari */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-user-md text-white text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">
                {t("home.doctors.drTiwari.name")}
              </h3>
              <p className="text-purple-600 text-center font-semibold mb-4">
                {t("home.doctors.drTiwari.credentials")}
              </p>
              <p className="text-gray-600 text-center">
                {t("home.doctors.drTiwari.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t("home.cta.title")}</h2>
            <p className="text-xl mb-8 text-blue-100">
              {t("home.cta.subtitle")}
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg text-lg">
              {t("home.cta.button")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
