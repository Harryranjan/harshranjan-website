# Reusable Components Documentation

This document provides usage examples for all 8 reusable components created from the page management system.

---

## 1. FilterBar Component

A flexible filter bar with search, sorting, and multiple filter types.

### Basic Usage

```jsx
import { FilterBar } from "../../components/ui";

function MyListPage() {
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    search: "",
    sortBy: "created",
    sortOrder: "desc"
  });

  const filterConfig = [
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" }
      ],
      placeholder: "All Statuses"
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "tech", label: "Technology" },
        { value: "news", label: "News" }
      ]
    },
    {
      name: "search",
      label: "Search",
      type: "search",
      placeholder: "Search by title...",
      span: 2,
      isSecondary: true
    }
  ];

  const sortConfig = {
    defaultSort: "created",
    defaultOrder: "desc",
    options: [
      { value: "created", label: "Date Created" },
      { value: "updated", label: "Date Updated" },
      { value: "title", label: "Title" }
    ]
  };

  return (
    <FilterBar
      filters={filters}
      onFilterChange={setFilters}
      filterConfig={filterConfig}
      sortConfig={sortConfig}
      onClearFilters={() => setFilters({})}
      searchPlaceholder="Search..."
    />
  );
}
```

### Filter Types
- `select` - Dropdown select
- `search` - Search input with icon
- `text` - Plain text input
- `date` - Date picker

---

## 2. BulkActionsBar Component

Multi-select with bulk operations dropdown.

### Basic Usage

```jsx
import { BulkActionsBar } from "../../components/ui";

function MyListPage() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [loading, setLoading] = useState(false);

  const bulkActions = [
    { value: "publish", label: "Publish" },
    { value: "draft", label: "Move to Draft" },
    { value: "delete", label: "Delete" }
  ];

  const handleBulkApply = async () => {
    setLoading(true);
    // Perform bulk action
    await performBulkAction(bulkAction, selectedItems);
    setLoading(false);
    setSelectedItems([]);
  };

  return (
    <BulkActionsBar
      selectedItems={selectedItems}
      onClearSelection={() => setSelectedItems([])}
      actions={bulkActions}
      selectedAction={bulkAction}
      onActionChange={setBulkAction}
      onApply={handleBulkApply}
      loading={loading}
      itemLabel="posts"
    />
  );
}
```

---

## 3. StatsCards Component

Dashboard statistics cards with icons.

### Basic Usage

```jsx
import { StatsCards } from "../../components/ui";

function Dashboard() {
  const stats = [
    {
      label: "Total Posts",
      value: 124,
      subtext: "+12 this month",
      color: "blue",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    },
    {
      label: "Published",
      value: 98,
      subtext: "79% of total",
      color: "green",
      icon: "M5 13l4 4L19 7"
    },
    {
      label: "Drafts",
      value: 26,
      color: "yellow",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      label: "Views",
      value: "45.2K",
      subtext: "+18% from last month",
      color: "purple",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    }
  ];

  return <StatsCards stats={stats} columns={4} />;
}
```

### Available Colors
`blue`, `green`, `yellow`, `red`, `purple`, `indigo`, `gray`

---

## 4. DataTable Component

Responsive data table with selection, actions, and custom rendering.

### Basic Usage

```jsx
import { DataTable } from "../../components/ui";

function PostsList() {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (item) => (
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-gray-500">{item.slug}</p>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {item.status}
        </span>
      )
    },
    {
      key: "views",
      label: "Views"
    },
    {
      key: "created_at",
      label: "Date",
      render: (item) => new Date(item.created_at).toLocaleDateString()
    }
  ];

  const actions = [
    {
      label: "Edit",
      icon: "✏️",
      onClick: (item) => navigate(`/edit/${item.id}`),
      variant: "primary"
    },
    {
      label: "Delete",
      icon: "🗑️",
      onClick: (item) => handleDelete(item.id),
      variant: "danger",
      condition: (item) => item.status !== 'published'
    }
  ];

  const handleSelectRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <DataTable
      columns={columns}
      data={posts}
      selectable={true}
      selectedRows={selectedRows}
      onSelectRow={handleSelectRow}
      onSelectAll={setSelectedRows}
      actions={actions}
      keyField="id"
      emptyMessage="No posts found"
    />
  );
}
```

### Action Variants
`primary`, `success`, `danger`, `warning`, `default`

---

## 5. Pagination Component

Full-featured pagination with counter and navigation.

### Basic Usage

```jsx
import { Pagination } from "../../components/ui";

function PostsList() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      totalCount={95}
      itemsPerPage={10}
      onPageChange={setCurrentPage}
      showCounter={true}
      itemLabel="posts"
    />
  );
}
```

### Compact Mode

```jsx
<Pagination
  currentPage={currentPage}
  totalPages={5}
  totalCount={50}
  itemsPerPage={10}
  onPageChange={setCurrentPage}
  compact={true}
/>
```

---

## 6. AutoSaveIndicator Component

Shows auto-save status with countdown timer.

### Basic Usage

```jsx
import { AutoSaveIndicator } from "../../components/ui";

function PostForm() {
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  return (
    <div className="flex items-center justify-between mb-4">
      <h2>Edit Post</h2>
      
      <AutoSaveIndicator
        enabled={true}
        saving={autoSaving}
        lastSaved={lastSaved}
        interval={30}
        variant="inline"
      />
    </div>
  );
}
```

### Badge Variant

```jsx
<AutoSaveIndicator
  enabled={true}
  saving={autoSaving}
  lastSaved={lastSaved}
  interval={30}
  variant="badge"
/>
```

---

## 7. DraggableList Component

Generic drag-and-drop list with reordering.

### Basic Usage

```jsx
import { DraggableList } from "../../components/ui";

function MenuOrdering() {
  const [items, setItems] = useState([
    { id: 1, name: "Home", order: 1 },
    { id: 2, name: "About", order: 2 },
    { id: 3, name: "Services", order: 3 }
  ]);

  const handleReorder = (reorderedItems) => {
    setItems(reorderedItems);
    // Save to backend
  };

  return (
    <DraggableList
      items={items}
      onReorder={handleReorder}
      renderItem={(item, index) => (
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">{item.path}</p>
          </div>
          <span className="text-xs text-gray-400">Order: {item.order}</span>
        </div>
      )}
      keyField="id"
      showOrderNumbers={true}
      emptyMessage="No items to order"
    />
  );
}
```

---

## 8. PreviewPanel Component

Live preview panel with device modes and custom templates.

### Basic Usage

```jsx
import { PreviewPanel } from "../../components/ui";

function PostEditor() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      
      <PreviewPanel
        content={content}
        title={title}
        baseStyles="tailwind"
        showToolbar={true}
      />
    </div>
  );
}
```

### Custom Template

```jsx
const customTemplate = ({ content, title, customCSS, customJS }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Georgia, serif; }
          ${customCSS}
        </style>
      </head>
      <body>
        <article>
          <h1>${title}</h1>
          <div>${content}</div>
        </article>
        <script>${customJS}</script>
      </body>
    </html>
  `;
};

<PreviewPanel
  content={content}
  title={title}
  customCSS=".my-class { color: red; }"
  customJS="console.log('Preview loaded');"
  templateRenderer={customTemplate}
  showToolbar={true}
/>
```

### Custom Devices

```jsx
const customDevices = {
  desktop: { width: "1440px", icon: "..." },
  laptop: { width: "1024px", icon: "..." },
  tablet: { width: "768px", icon: "..." },
  mobile: { width: "375px", icon: "..." }
};

<PreviewPanel
  content={content}
  title={title}
  devices={customDevices}
/>
```

---

## Complete Example: Blog Post Management

Here's how to use multiple components together:

```jsx
import { useState, useEffect } from "react";
import {
  FilterBar,
  BulkActionsBar,
  StatsCards,
  DataTable,
  Pagination
} from "../../components/ui";

export default function BlogPostList() {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });

  // Filter configuration
  const filterConfig = [
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "published", label: "Published" },
        { value: "draft", label: "Draft" }
      ]
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "tech", label: "Technology" },
        { value: "news", label: "News" }
      ]
    },
    {
      name: "search",
      label: "Search",
      type: "search",
      span: 2,
      isSecondary: true
    }
  ];

  const sortConfig = {
    options: [
      { value: "created", label: "Date Created" },
      { value: "title", label: "Title" },
      { value: "views", label: "Views" }
    ]
  };

  // Stats configuration
  const statsData = [
    {
      label: "Total Posts",
      value: stats.total,
      color: "blue",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    },
    {
      label: "Published",
      value: stats.published,
      color: "green",
      icon: "M5 13l4 4L19 7"
    },
    {
      label: "Drafts",
      value: stats.draft,
      color: "yellow",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  // Table columns
  const columns = [
    {
      key: "title",
      label: "Title",
      render: (post) => (
        <div>
          <p className="font-medium">{post.title}</p>
          <p className="text-xs text-gray-500">{post.slug}</p>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (post) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          post.status === 'published' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {post.status}
        </span>
      )
    }
  ];

  // Bulk actions
  const bulkActions = [
    { value: "publish", label: "Publish" },
    { value: "draft", label: "Move to Draft" },
    { value: "delete", label: "Delete" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
      
      <StatsCards stats={statsData} columns={3} />
      
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        filterConfig={filterConfig}
        sortConfig={sortConfig}
        onClearFilters={() => setFilters({})}
      />
      
      <BulkActionsBar
        selectedItems={selectedPosts}
        onClearSelection={() => setSelectedPosts([])}
        actions={bulkActions}
        selectedAction=""
        onActionChange={() => {}}
        onApply={() => {}}
        itemLabel="posts"
      />
      
      <DataTable
        columns={columns}
        data={posts}
        selectable={true}
        selectedRows={selectedPosts}
        onSelectRow={(id) => setSelectedPosts(prev => 
          prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )}
        onSelectAll={setSelectedPosts}
        actions={[
          {
            label: "Edit",
            icon: "✏️",
            onClick: (post) => {},
            variant: "primary"
          }
        ]}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        totalCount={95}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
        itemLabel="posts"
      />
    </div>
  );
}
```

---

## Component Props Reference

### FilterBar
- `filters` (Object) - Current filter values
- `onFilterChange` (Function) - Filter change callback
- `filterConfig` (Array) - Filter field configuration
- `sortConfig` (Object) - Sort configuration
- `onClearFilters` (Function) - Clear filters callback
- `searchPlaceholder` (String) - Search placeholder text

### BulkActionsBar
- `selectedItems` (Array) - Selected item IDs
- `onClearSelection` (Function) - Clear selection callback
- `actions` (Array) - Action options
- `selectedAction` (String) - Current action
- `onActionChange` (Function) - Action change callback
- `onApply` (Function) - Apply callback
- `loading` (Boolean) - Loading state
- `itemLabel` (String) - Item label (e.g., "posts")

### StatsCards
- `stats` (Array) - Stats data
- `columns` (Number) - Number of columns (2, 3, or 4)

### DataTable
- `columns` (Array) - Column configuration
- `data` (Array) - Data array
- `selectable` (Boolean) - Enable selection
- `selectedRows` (Array) - Selected row IDs
- `onSelectRow` (Function) - Row select callback
- `onSelectAll` (Function) - Select all callback
- `actions` (Array) - Action buttons
- `keyField` (String) - Unique key field
- `emptyMessage` (String) - Empty state message

### Pagination
- `currentPage` (Number) - Current page
- `totalPages` (Number) - Total pages
- `totalCount` (Number) - Total items
- `itemsPerPage` (Number) - Items per page
- `onPageChange` (Function) - Page change callback
- `showCounter` (Boolean) - Show counter
- `itemLabel` (String) - Item label
- `compact` (Boolean) - Compact mode

### AutoSaveIndicator
- `enabled` (Boolean) - Enable auto-save
- `saving` (Boolean) - Saving state
- `lastSaved` (Date|String) - Last saved time
- `interval` (Number) - Save interval in seconds
- `variant` (String) - "inline" or "badge"

### DraggableList
- `items` (Array) - Items array
- `onReorder` (Function) - Reorder callback
- `renderItem` (Function) - Custom render function
- `keyField` (String) - Unique key field
- `showOrderNumbers` (Boolean) - Show order numbers
- `emptyMessage` (String) - Empty message

### PreviewPanel
- `content` (String) - HTML content
- `title` (String) - Preview title
- `customCSS` (String) - Custom CSS
- `customJS` (String) - Custom JavaScript
- `templateRenderer` (Function) - Custom template function
- `devices` (Object) - Custom device configurations
- `showToolbar` (Boolean) - Show toolbar
- `baseStyles` (String) - Base styles ("tailwind" or custom)

---

## Benefits of These Components

1. **Consistency** - Uniform UI/UX across all admin pages
2. **DRY Principle** - Write once, use everywhere
3. **Maintainability** - Fix bugs in one place
4. **Flexibility** - Highly customizable via props
5. **Productivity** - Build new pages 5x faster
6. **Type Safety** - Well-documented prop types
7. **Accessibility** - Built-in a11y best practices
8. **Responsive** - Mobile-first design

---

## Next Steps

1. Use these components in other admin pages (Posts, Media, Users, etc.)
2. Add TypeScript definitions for better type safety
3. Create Storybook documentation for visual component library
4. Add unit tests for each component
5. Create more specialized variants as needed
