import { useState } from "react";
import ShortcodeParser from "../components/ShortcodeParser";
import { ContentRenderer } from "../components";

export default function ShortcodeDemo() {
  const [testContent, setTestContent] = useState(`
    <h2>Welcome to Our Site</h2>
    <p>Please fill out our contact form below:</p>
    [form id="1"]
    <p>Thank you for reaching out!</p>
  `);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Shortcode Integration Demo</h1>

      {/* Method 1: ShortcodeParser - Most Flexible */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">
          Method 1: ShortcodeParser (Recommended)
        </h2>
        <p className="text-gray-600 mb-4">
          Wrap any content and shortcodes work automatically. Works with JSX,
          strings, and HTML.
        </p>

        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">Example 1: Direct in JSX</h3>
          <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto mb-3">
            {`<ShortcodeParser>
  <div>
    <h2>Contact Us</h2>
    <p>Fill the form: [form id="1"]</p>
    <p>More content here...</p>
  </div>
</ShortcodeParser>`}
          </pre>

          <div className="border-t pt-3">
            <h4 className="text-sm font-semibold mb-2 text-blue-600">
              Live Result:
            </h4>
            <ShortcodeParser>
              <div className="bg-blue-50 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                <p className="mb-4">Fill the form: [form id="1"]</p>
                <p className="text-sm text-gray-600">More content here...</p>
              </div>
            </ShortcodeParser>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">Example 2: With Variables</h3>
          <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto mb-3">
            {`const content = "Get a quote [form id='1'] today!";

<ShortcodeParser>
  <p>{content}</p>
</ShortcodeParser>`}
          </pre>

          <div className="border-t pt-3">
            <h4 className="text-sm font-semibold mb-2 text-blue-600">
              Live Result:
            </h4>
            <ShortcodeParser>
              <p className="bg-green-50 p-4 rounded">
                Get a quote [form id="1"] today!
              </p>
            </ShortcodeParser>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Example 3: From Database/CMS</h3>
          <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto mb-3">
            {`// Content from database
const dbContent = pageData.content; // Contains [form id="1"]

<ShortcodeParser>
  <div dangerouslySetInnerHTML={{__html: dbContent}} />
</ShortcodeParser>`}
          </pre>

          <div className="border-t pt-3">
            <h4 className="text-sm font-semibold mb-2 text-blue-600">
              Live Result:
            </h4>
            <ShortcodeParser>
              <div
                className="bg-purple-50 p-4 rounded"
                dangerouslySetInnerHTML={{ __html: testContent }}
              />
            </ShortcodeParser>
          </div>
        </div>
      </section>

      {/* Method 2: ContentRenderer - For HTML strings */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Method 2: ContentRenderer</h2>
        <p className="text-gray-600 mb-4">
          Simpler option for pure HTML string content (like from CMS).
        </p>

        <div className="bg-gray-100 p-4 rounded">
          <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto mb-3">
            {`const cmsContent = \`
  <h2>Newsletter Signup</h2>
  <p>Subscribe below:</p>
  [form id="1"]
\`;

<ContentRenderer content={cmsContent} />`}
          </pre>

          <div className="border-t pt-3">
            <h4 className="text-sm font-semibold mb-2 text-blue-600">
              Live Result:
            </h4>
            <ContentRenderer
              content={`
                <div class="bg-yellow-50 p-4 rounded">
                  <h2 class="text-xl font-bold mb-2">Newsletter Signup</h2>
                  <p class="mb-4">Subscribe below:</p>
                  [form id="1"]
                </div>
              `}
            />
          </div>
        </div>
      </section>

      {/* Interactive Playground */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Interactive Playground</h2>
        <p className="text-gray-600 mb-4">
          Try it yourself! Edit the content below and see the shortcode render
          in real-time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Edit Content (HTML with shortcodes):
            </label>
            <textarea
              value={testContent}
              onChange={(e) => setTestContent(e.target.value)}
              className="w-full h-64 p-3 border rounded font-mono text-sm"
              placeholder="Enter content with [form id='1'] shortcodes"
            />
            <p className="text-xs text-gray-500 mt-2">
              Tip: Use [form id="1"] anywhere in your content
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Live Preview:
            </label>
            <div className="border rounded p-4 bg-gray-50 h-64 overflow-y-auto">
              <ShortcodeParser>
                <div dangerouslySetInnerHTML={{ __html: testContent }} />
              </ShortcodeParser>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="mt-12 bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">📚 Quick Reference</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">✅ Shortcode Syntax:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <code className="bg-white px-2 py-1 rounded">
                  [form id="1"]
                </code>{" "}
                - Basic form embed
              </li>
              <li>
                <code className="bg-white px-2 py-1 rounded">
                  [form id="2" class="my-4"]
                </code>{" "}
                - With custom classes
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🚀 When to Use Each Method:</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>ShortcodeParser:</strong>
                <span className="text-gray-700">
                  {" "}
                  Use when mixing JSX with shortcodes, or when you have complex
                  nested content
                </span>
              </li>
              <li>
                <strong>ContentRenderer:</strong>
                <span className="text-gray-700">
                  {" "}
                  Use when you have pure HTML string from CMS/database
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">💡 Pro Tips:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Both methods work with the same shortcode syntax</li>
              <li>Forms must be published in admin to appear on frontend</li>
              <li>You can use multiple shortcodes in the same content</li>
              <li>Works with dynamic content from APIs/databases</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
