import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

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
import ModalBuilder from "./pages/admin/ModalBuilder";
import PopupBuilder from "./pages/admin/PopupBuilder";
import EmailSettings from "./pages/admin/EmailSettings";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <About />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/services"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Services />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/portfolio"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Portfolio />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/blog"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <BlogList />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <BlogPost />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/shortcode-demo"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <ShortcodeDemo />
              </main>
              <Footer />
            </div>
          }
        />

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
          <Route path="forms/modals/new" element={<ModalBuilder />} />
          <Route path="forms/modals/:id/edit" element={<ModalBuilder />} />
          <Route path="forms/popups/new" element={<PopupBuilder />} />
          <Route path="forms/popups/:id/edit" element={<PopupBuilder />} />
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
