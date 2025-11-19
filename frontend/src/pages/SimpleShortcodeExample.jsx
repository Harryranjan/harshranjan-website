import { ShortcodeParser } from "../components";

/**
 * SIMPLEST EXAMPLE - Copy this entire file!
 *
 * This shows the absolute simplest way to use shortcodes.
 * Just wrap content with <ShortcodeParser> and paste [form id="1"] anywhere!
 */

export default function SimpleExample() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* EXAMPLE 1: Just paste shortcode in HTML */}
      <ShortcodeParser>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="mb-4">Please fill out our form:</p>
          [form id="1"]
          <p className="mt-4 text-gray-600">We'll respond within 24 hours!</p>
        </div>
      </ShortcodeParser>

      {/* EXAMPLE 2: Multiple forms */}
      <ShortcodeParser>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
          [form id="1"]
          <h2 className="text-2xl font-bold mb-4 mt-8">Contact</h2>
          [form id="2"]
        </div>
      </ShortcodeParser>

      {/* EXAMPLE 3: Inline in text */}
      <ShortcodeParser>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>
            Want to get in touch? Fill this [form id="1"] form and we'll contact
            you!
          </p>
        </div>
      </ShortcodeParser>
    </div>
  );
}

/*
 * USAGE IN YOUR PAGES:
 *
 * 1. Import:
 *    import { ShortcodeParser } from '../components';
 *
 * 2. Wrap your content:
 *    <ShortcodeParser>
 *      ...your content with [form id="1"] shortcodes...
 *    </ShortcodeParser>
 *
 * 3. Done! Forms appear automatically!
 */
