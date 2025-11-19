import { FormEmbed, ContentRenderer } from "../components";

/**
 * Example page demonstrating all form integration methods
 */
export default function FormIntegrationExamples() {
  // Example content with shortcodes
  const contentWithShortcodes = `
    <h2>Contact Us</h2>
    <p>Fill out the form below to get in touch with us.</p>
    
    [form id="1"]
    
    <p>We'll get back to you within 24 hours!</p>
  `;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">Form Integration Examples</h1>
        <p className="text-gray-600">
          This page demonstrates different ways to integrate forms into your
          pages.
        </p>
      </div>

      {/* Method 1: Direct React Component */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-2">Method 1: React Component</h2>
        <p className="text-gray-600 mb-4">
          Directly use the FormEmbed component in your React code.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
          <pre className="text-sm">
            {`import { FormEmbed } from "../components";

<FormEmbed formId={1} />`}
          </pre>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border">
          <FormEmbed formId={1} />
        </div>
      </section>

      {/* Method 2: Shortcode in Content */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-2">Method 2: Shortcode Parser</h2>
        <p className="text-gray-600 mb-4">
          Use shortcodes in your content that gets parsed automatically.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
          <pre className="text-sm">
            {`import { ContentRenderer } from "../components";

const content = \`
  <h2>Contact Us</h2>
  [form id="1"]
  <p>More content here...</p>
\`;

<ContentRenderer content={content} />`}
          </pre>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border">
          <ContentRenderer content={contentWithShortcodes} />
        </div>
      </section>

      {/* Method 3: JavaScript Widget */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-2">Method 3: JavaScript Widget</h2>
        <p className="text-gray-600 mb-4">
          Embed forms in any HTML page (non-React sites).
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            {`<!-- Add this HTML where you want the form -->
<div id="form-container-1"></div>

<!-- Add this script before closing </body> -->
<script src="http://localhost:5000/api/embed/forms/1/widget.js"></script>`}
          </pre>
        </div>
      </section>

      {/* Method 4: iframe */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-2">Method 4: iframe Embed</h2>
        <p className="text-gray-600 mb-4">
          Maximum compatibility - works everywhere with complete isolation.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
          <pre className="text-sm">
            {`<iframe 
  src="http://localhost:5000/api/embed/forms/1/embed"
  width="100%"
  height="600"
  frameborder="0"
  title="Contact Form"
></iframe>`}
          </pre>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border">
          <iframe
            src="http://localhost:5000/api/embed/forms/1/embed"
            width="100%"
            height="600"
            className="border-0 rounded"
            title="Contact Form"
          />
        </div>
      </section>

      {/* Tips */}
      <section className="border-t pt-8 pb-8">
        <h2 className="text-2xl font-bold mb-4">Integration Tips</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              ✨ React Component (Best for React apps)
            </h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Full type safety and React features</li>
              <li>Direct access to form events</li>
              <li>Optimal performance</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">
              📝 Shortcode (Best for CMS content)
            </h3>
            <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
              <li>Easy for non-technical users</li>
              <li>Works in rich text editors</li>
              <li>Simple syntax: [form id="123"]</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">
              🔧 JavaScript Widget (Best for external sites)
            </h3>
            <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
              <li>Works on any website</li>
              <li>No React required</li>
              <li>Simple copy-paste integration</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">
              🖼️ iframe (Best for maximum isolation)
            </h3>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>Complete CSS/JS isolation</li>
              <li>Works everywhere</li>
              <li>No conflicts with host page</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
