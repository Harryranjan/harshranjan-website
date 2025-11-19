/**
 * TrackingScriptsSection Component
 * Reusable section for adding tracking & analytics scripts
 * 
 * @param {string} headScripts - Current head scripts value
 * @param {string} bodyScripts - Current body scripts value
 * @param {Function} onHeadScriptsChange - Callback for head scripts change
 * @param {Function} onBodyScriptsChange - Callback for body scripts change
 * @param {string} title - Optional custom title (default: "Tracking & Analytics Scripts")
 * @param {string} description - Optional custom description
 */
export default function TrackingScriptsSection({
  headScripts = "",
  bodyScripts = "",
  onHeadScriptsChange,
  onBodyScriptsChange,
  title = "Tracking & Analytics Scripts",
  description = "Add third-party tracking codes for analytics, ads, and marketing tools",
}) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md overflow-hidden border border-blue-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {title}
            </h2>
            <p className="text-sm text-blue-100 mt-0.5">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        {/* Popular Services Icons */}
        <div className="flex flex-wrap gap-3 pb-4 border-b border-blue-200">
          <span className="text-xs font-medium text-gray-600">Popular Services:</span>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-blue-200 text-blue-700">
              📊 Google Analytics
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-blue-200 text-blue-700">
              📘 Facebook Pixel
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-blue-200 text-blue-700">
              🏷️ Tag Manager
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-blue-200 text-blue-700">
              🎯 Google Ads
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-blue-200 text-blue-700">
              💬 Chat Widgets
            </span>
          </div>
        </div>

        {/* Head Scripts */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 rounded-lg p-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Head Scripts
                </label>
                <p className="text-xs text-gray-600">
                  Loads in <code className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono">&lt;head&gt;</code> section • Best for analytics & tracking
                </p>
              </div>
            </div>
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
              Before Page Load
            </span>
          </div>
          
          <div className="relative">
            <textarea
              name="head_scripts"
              value={headScripts}
              onChange={(e) => onHeadScriptsChange(e.target.value)}
              rows={10}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 font-mono text-xs focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-inner transition-all hover:border-gray-400"
              placeholder={`<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;n=f.fbq=function(){...};
  }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>

<!-- Google Analytics GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`}
            />
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                HEAD
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 bg-purple-50 border border-purple-200 rounded-lg p-3">
            <svg className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs text-purple-800">
              <span className="font-semibold">Best for:</span> Facebook Pixel, Google Analytics (GA4), Google Tag Manager, Google Ads conversion tracking, LinkedIn Insight Tag
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-blue-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
              AND
            </span>
          </div>
        </div>

        {/* Body Scripts */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-100 rounded-lg p-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Body Scripts
                </label>
                <p className="text-xs text-gray-600">
                  Loads after <code className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono">&lt;body&gt;</code> tag • Best for widgets & tools
                </p>
              </div>
            </div>
            <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
              With Page Content
            </span>
          </div>
          
          <div className="relative">
            <textarea
              name="body_scripts"
              value={bodyScripts}
              onChange={(e) => onBodyScriptsChange(e.target.value)}
              rows={10}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-inner transition-all hover:border-gray-400"
              placeholder={`<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>

<!-- Intercom Chat Widget -->
<script>
  window.intercomSettings = {
    app_id: "YOUR_APP_ID"
  };
</script>
<script>(function(){var w=window;var ic=w.Intercom;...})();</script>`}
            />
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                </svg>
                BODY
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs text-emerald-800">
              <span className="font-semibold">Best for:</span> Google Tag Manager (noscript), Live chat widgets (Intercom, Drift), Heatmap tools (Hotjar, Crazy Egg), Pop-ups
            </div>
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-5 mt-6">
          <div className="flex gap-3">
            <div className="bg-amber-100 rounded-lg p-2 h-fit">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                💡 Pro Tips & Best Practices
              </h3>
              <ul className="space-y-2 text-xs text-amber-800">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Always test:</strong> Use browser dev tools to verify scripts are loading correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Complete tags:</strong> Include full &lt;script&gt; or &lt;noscript&gt; tags</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Performance:</strong> Too many scripts can slow down your page load time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Privacy:</strong> Ensure compliance with GDPR/CCPA when using tracking codes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
