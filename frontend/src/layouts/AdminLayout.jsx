import { Link, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Pages', path: '/admin/pages', icon: '📄' },
    { name: 'Blog Posts', path: '/admin/blog', icon: '📝' },
    { name: 'Portfolio', path: '/admin/portfolio', icon: '💼' },
    { name: 'Testimonials', path: '/admin/testimonials', icon: '⭐' },
    { name: 'Media Library', path: '/admin/media', icon: '🖼️' },
    { name: 'SEO Settings', path: '/admin/seo', icon: '🔍' },
    { name: 'Landing Pages', path: '/admin/landing-pages', icon: '🚀' },
    { name: 'Contact Messages', path: '/admin/messages', icon: '✉️' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                target="_blank"
                className="text-gray-600 hover:text-gray-900"
              >
                View Site →
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{user?.email}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen fixed left-0">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
