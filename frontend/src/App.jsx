import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import ShortcodeDemo from "./pages/ShortcodeDemo";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBlogList from "./pages/admin/BlogList";
import BlogForm from "./pages/admin/BlogForm";
import PageList from "./pages/admin/PageList";
import PageForm from "./pages/admin/PageForm";
import PageOrdering from "./pages/admin/PageOrdering";
import CategoryManager from "./pages/admin/CategoryManager";
import TagManager from "./pages/admin/TagManager";
import FormList from "./pages/admin/FormList";
import FormBuilder from "./pages/admin/FormBuilderNew";
import FormSubmissions from "./pages/admin/FormSubmissions";
import ModalList from "./pages/admin/ModalList";
import ModalBuilder from "./pages/admin/ModalBuilder";
import PopupBuilder from "./pages/admin/PopupBuilder";
import EmailSettings from "./pages/admin/EmailSettings";
import DownloadList from "./pages/admin/DownloadList";
import DownloadForm from "./pages/admin/DownloadForm";
import DownloadLeads from "./pages/admin/DownloadLeads";
import DownloadsLibrary from "./pages/DownloadsLibrary";
import MenuList from "./pages/admin/MenuList";
import MenuForm from "./pages/admin/MenuForm";
import HeaderBuilder from "./pages/admin/HeaderBuilder";
import FooterBuilder from "./pages/admin/FooterBuilder";
import CTABannerDemo from "./pages/CTABannerDemo";
import CTABannerList from "./pages/admin/CTABannerList";
import CTABannerForm from "./pages/admin/CTABannerForm";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><BlogList /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/shortcode-demo" element={<PublicLayout><ShortcodeDemo /></PublicLayout>} />
        <Route path="/downloads" element={<PublicLayout><DownloadsLibrary /></PublicLayout>} />
        <Route path="/cta-demo" element={<CTABannerDemo />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pages" element={<PageList />} />
          <Route path="pages/create" element={<PageForm />} />
          <Route path="pages/edit/:id" element={<PageForm />} />
          <Route path="pages/ordering" element={<PageOrdering />} />
          <Route path="blog" element={<AdminBlogList />} />
          <Route path="blog/create" element={<BlogForm />} />
          <Route path="blog/edit/:id" element={<BlogForm />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="tags" element={<TagManager />} />
          <Route path="forms" element={<FormList />} />
          <Route path="forms/new" element={<FormBuilder />} />
          <Route path="forms/:id/edit" element={<FormBuilder />} />
          <Route
            path="forms/:formId/submissions"
            element={<FormSubmissions />}
          />
          <Route path="forms/modals" element={<ModalList />} />
          <Route path="forms/modals/new" element={<ModalBuilder />} />
          <Route path="forms/modals/:id/edit" element={<ModalBuilder />} />
          <Route path="forms/popups/new" element={<PopupBuilder />} />
          <Route path="forms/popups/:id/edit" element={<PopupBuilder />} />
          <Route path="downloads" element={<DownloadList />} />
          <Route path="downloads/new" element={<DownloadForm />} />
          <Route path="downloads/edit/:id" element={<DownloadForm />} />
          <Route path="downloads/:id/leads" element={<DownloadLeads />} />
          <Route path="menus" element={<MenuList />} />
          <Route path="menus/new" element={<MenuForm />} />
          <Route path="menus/:id" element={<MenuForm />} />
          <Route path="header-builder/new" element={<HeaderBuilder />} />
          <Route path="header-builder/:id" element={<HeaderBuilder />} />
          <Route path="footer-builder/new" element={<FooterBuilder />} />
          <Route path="footer-builder/:id" element={<FooterBuilder />} />
          <Route path="cta-banners" element={<CTABannerList />} />
          <Route path="cta-banners/create" element={<CTABannerForm />} />
          <Route path="cta-banners/edit/:id" element={<CTABannerForm />} />
          <Route
            path="portfolio"
            element={
              <div className="text-2xl">Portfolio Management - Coming Soon</div>
            }
          />
          <Route
            path="testimonials"
            element={<div className="text-2xl">Testimonials - Coming Soon</div>}
          />
          <Route
            path="media"
            element={
              <div className="text-2xl">Media Library - Coming Soon</div>
            }
          />
          <Route
            path="seo"
            element={<div className="text-2xl">SEO Settings - Coming Soon</div>}
          />
          <Route
            path="landing-pages"
            element={
              <div className="text-2xl">Landing Pages - Coming Soon</div>
            }
          />
          <Route
            path="messages"
            element={
              <div className="text-2xl">Contact Messages - Coming Soon</div>
            }
          />
          <Route path="email-settings" element={<EmailSettings />} />
          <Route
            path="settings"
            element={<div className="text-2xl">Settings - Coming Soon</div>}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
