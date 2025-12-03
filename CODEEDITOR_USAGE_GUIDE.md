# CodeEditorFullscreen Component - Usage Guide

A reusable code editor with fullscreen capability that can be used anywhere for custom HTML/CSS/JS editing.

## 📦 Features

- ✅ **Fullscreen Mode** - Opens outside modal in full browser window
- ✅ **Character & Line Counter** - Real-time statistics
- ✅ **ESC Key Support** - Quick exit from fullscreen
- ✅ **Dark Theme** - Optimized for coding
- ✅ **Mac-Style Window Controls** - Beautiful red/yellow/green dots
- ✅ **Auto-Focus** - Cursor ready in fullscreen
- ✅ **Customizable** - Language, height, placeholder

## 🚀 Quick Start

```jsx
import CodeEditorFullscreen from '../../components/CodeEditorFullscreen';

function MyComponent() {
  const [code, setCode] = useState('');

  return (
    <CodeEditorFullscreen
      value={code}
      onChange={setCode}
      language="HTML"
    />
  );
}
```

## 📖 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | `''` | The code content |
| `onChange` | function | - | Callback when code changes: `(newCode) => void` |
| `placeholder` | string | HTML template | Placeholder text shown when empty |
| `language` | string | `'HTML/JSX'` | Language label (HTML, CSS, JavaScript, etc.) |
| `minHeight` | string | `'450px'` | Minimum height of editor |
| `readOnly` | boolean | `false` | Make editor read-only |
| `className` | string | `''` | Additional CSS classes |

## 💡 Usage Examples

### 1. Custom Forms (Current Implementation)
```jsx
<CodeEditorFullscreen
  value={customCodeContent}
  onChange={setCustomCodeContent}
  language="HTML/JSX"
  minHeight="450px"
/>
```

### 2. Header Builder
```jsx
<CodeEditorFullscreen
  value={headerCode}
  onChange={setHeaderCode}
  language="HTML/CSS"
  placeholder="<header>...</header>"
/>
```

### 3. Footer Builder
```jsx
<CodeEditorFullscreen
  value={footerCode}
  onChange={setFooterCode}
  language="HTML/CSS"
  placeholder="<footer>...</footer>"
/>
```

### 4. Custom Page Code
```jsx
<CodeEditorFullscreen
  value={pageCode}
  onChange={setPageCode}
  language="HTML"
  minHeight="600px"
/>
```

### 5. CSS Editor
```jsx
<CodeEditorFullscreen
  value={cssCode}
  onChange={setCssCode}
  language="CSS"
  placeholder=".my-class { }"
/>
```

### 6. JavaScript Editor
```jsx
<CodeEditorFullscreen
  value={jsCode}
  onChange={setJsCode}
  language="JavaScript"
  placeholder="// Your JavaScript code"
/>
```

### 7. Read-Only Display
```jsx
<CodeEditorFullscreen
  value={generatedCode}
  readOnly={true}
  language="HTML"
/>
```

## 🎨 Where to Use

✅ **Forms** - Custom HTML forms
✅ **Headers** - Custom header code
✅ **Footers** - Custom footer code
✅ **Pages** - Custom page templates
✅ **Widgets** - Custom widget code
✅ **Emails** - Email templates
✅ **Landing Pages** - Custom sections
✅ **Popups/Modals** - Custom popup code
✅ **CTAs** - Custom call-to-action blocks

## ⌨️ Keyboard Shortcuts

- **ESC** - Exit fullscreen mode

## 🎯 Best Practices

1. **Always provide onChange** - Component needs to update parent state
2. **Use appropriate language label** - Helps users know what to write
3. **Set minHeight for better UX** - Prevents tiny editor windows
4. **Use placeholder for guidance** - Show users example code
5. **Don't nest inside z-index modals** - Fullscreen uses z-index 100

## 🔧 Technical Details

- **Z-Index**: 100 (ensure no modals block it)
- **Font**: Fira Code, Courier New, monospace
- **Tab Size**: 2 spaces
- **Line Height**: 1.6 (regular), 1.7 (fullscreen)
- **Fullscreen**: Uses `fixed inset-0` positioning

## 📝 Notes

- Fullscreen mode breaks out of any parent modal
- Changes are saved automatically (controlled component)
- Works with any text-based code (HTML, CSS, JS, etc.)
- Mobile-friendly (though fullscreen is better on desktop)
