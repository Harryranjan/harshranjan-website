# Reusable UI Components Library

## Overview

Comprehensive collection of reusable React components extracted from the demo system and admin panel. These components follow consistent design patterns, are fully typed, and work across the entire application.

## Component Catalog

### 1. RangeSlider

**Purpose:** Interactive range slider with live value display

**Props:**

- `label` (string) - Label above slider
- `value` (number) - Current value
- `min` (number) - Minimum value (default: 0)
- `max` (number) - Maximum value (default: 100)
- `step` (number) - Increment step (default: 1)
- `onChange` (function) - Change callback
- `prefix` (string) - Value prefix (e.g., '$')
- `suffix` (string) - Value suffix (e.g., 'h', '%')
- `color` (string) - blue, green, purple, orange, red
- `showMinMax` (boolean) - Show min/max labels (default: true)

**Usage:**

```jsx
import { RangeSlider } from './components/ui';

<RangeSlider
  label="Number of Employees"
  value={employeeCount}
  min={1}
  max={100}
  onChange={setEmployeeCount}
  color="blue"
/>

<RangeSlider
  label="Hourly Wage"
  value={wage}
  min={15}
  max={100}
  step={5}
  onChange={setWage}
  prefix="$"
  color="green"
/>
```

**Use Cases:**

- ROI calculators
- Settings pages
- Form inputs with live preview
- Filtering interfaces

---

### 2. MessageBubble & TypingIndicator

**Purpose:** Chat message display with typing animation

**MessageBubble Props:**

- `type` (string) - 'user' or 'bot'
- `text` (string) - Message content
- `timestamp` (Date) - Message time
- `showTime` (boolean) - Display timestamp (default: true)
- `avatar` (string) - Emoji or image URL

**Usage:**

```jsx
import { MessageBubble, TypingIndicator } from "./components/ui";

{
  messages.map((msg) => (
    <MessageBubble
      key={msg.id}
      type={msg.type}
      text={msg.text}
      timestamp={msg.timestamp}
      avatar="🤖"
    />
  ));
}

{
  isTyping && <TypingIndicator />;
}
```

**Use Cases:**

- Chatbots
- Customer support interfaces
- Comment threads
- Real-time messaging

---

### 3. QuickReplyButtons

**Purpose:** Button group for quick selections

**Props:**

- `options` (array) - [{label, value, icon}]
- `onSelect` (function) - Selection callback
- `variant` (string) - primary, secondary, outline, gradient
- `size` (string) - small, medium, large
- `multiSelect` (boolean) - Multiple selections (default: false)
- `selected` (array) - Selected values (for multiSelect)

**Usage:**

```jsx
import { QuickReplyButtons } from './components/ui';

<QuickReplyButtons
  options={[
    { label: 'Yes', value: 'yes', icon: '✓' },
    { label: 'No', value: 'no', icon: '✗' },
    { label: 'Maybe', value: 'maybe', icon: '🤔' }
  ]}
  onSelect={(value) => handleResponse(value)}
  variant="outline"
  size="medium"
/>

// Multi-select example
<QuickReplyButtons
  options={interests}
  onSelect={setSelectedInterests}
  multiSelect={true}
  selected={selectedInterests}
  variant="primary"
/>
```

**Use Cases:**

- Chatbot quick replies
- Survey forms
- Filters
- Tag selection

---

### 4. StepProgress

**Purpose:** Animated step-by-step progress indicator

**Props:**

- `steps` (array) - [{title, description, icon, time}]
- `currentStep` (number) - Active step (0-based)
- `showTime` (boolean) - Display time estimates
- `orientation` (string) - vertical or horizontal
- `color` (string) - blue, green, purple, orange

**Usage:**

```jsx
import { StepProgress } from "./components/ui";

const steps = [
  {
    title: "Inquiry",
    description: "Lead submits form",
    icon: "📧",
    time: "Instant",
  },
  {
    title: "Qualify",
    description: "AI asks questions",
    icon: "🤖",
    time: "30 sec",
  },
  {
    title: "Schedule",
    description: "Book meeting",
    icon: "📅",
    time: "10 sec",
  },
];

<StepProgress
  steps={steps}
  currentStep={currentStep}
  orientation="vertical"
  color="blue"
  showTime={true}
/>;
```

**Use Cases:**

- Workflow visualizations
- Onboarding flows
- Checkout processes
- Tutorial steps

---

### 5. MetricCard & MetricGrid

**Purpose:** Display key metrics with visual emphasis

**MetricCard Props:**

- `label` (string) - Metric label
- `value` (string|number) - Metric value
- `icon` (string) - Icon emoji
- `trend` (string) - Trend indicator ('+12%')
- `color` (string) - blue, green, purple, orange, red, pink
- `subtext` (string) - Additional context
- `size` (string) - small, medium, large
- `onClick` (function) - Click handler

**MetricGrid Props:**

- `columns` (number) - 1, 2, 3, or 4

**Usage:**

```jsx
import { MetricCard, MetricGrid } from "./components/ui";

<MetricGrid columns={3}>
  <MetricCard
    label="First Year Savings"
    value={`$${savings.toLocaleString()}`}
    icon="💰"
    color="green"
    trend="+250%"
    subtext="After implementation"
  />
  <MetricCard
    label="ROI"
    value={`${roi}%`}
    icon="📈"
    color="blue"
    size="large"
  />
  <MetricCard
    label="Payback Period"
    value={`${months} months`}
    icon="⏱️"
    color="purple"
  />
</MetricGrid>;
```

**Use Cases:**

- Dashboards
- Analytics displays
- ROI calculators
- KPI tracking

---

### 6. ComparisonCard & SavingsDisplay

**Purpose:** Side-by-side before/after comparisons

**ComparisonCard Props:**

- `before` (object) - {title, value, icon, subtitle, details[]}
- `after` (object) - {title, value, icon, subtitle, details[]}
- `metric` (string) - Comparison title
- `showDetails` (boolean) - Show detailed lists
- `color` (string) - Color theme

**SavingsDisplay Props:**

- `savings` (number) - Savings amount
- `period` (string) - 'month', 'year', etc.
- `additionalInfo` (object) - Extra details

**Usage:**

```jsx
import { ComparisonCard, SavingsDisplay } from './components/ui';

<ComparisonCard
  metric="Time Comparison"
  before={{
    title: 'Manual Process',
    value: '30-45 min',
    subtitle: '$25-40',
    icon: '👤',
    details: ['Manual data entry', 'Phone calls', 'Follow-up emails']
  }}
  after={{
    title: 'Automated',
    value: '1-2 min',
    subtitle: '$0.10',
    icon: '🤖',
    details: ['Instant response', 'Auto-scheduling', 'Email sent']
  }}
  showDetails={true}
/>

<SavingsDisplay
  savings={5000}
  period="month"
  additionalInfo={{ hours: 100 }}
/>
```

**Use Cases:**

- Demo pages
- Feature comparisons
- ROI presentations
- Process improvements

---

### 7. SelectableGrid

**Purpose:** Grid of selectable cards with multiple variants

**Props:**

- `items` (array) - [{id, name, icon, description, value}]
- `selected` (array) - Selected item IDs
- `onSelectionChange` (function) - Selection callback
- `multiSelect` (boolean) - Multiple selections (default: false)
- `columns` (number) - 2, 3, 4, or 5
- `variant` (string) - card, compact, detailed

**Usage:**

```jsx
import { SelectableGrid } from './components/ui';

const processes = [
  { id: 'lead-qual', name: 'Lead Qualification', icon: '🎯', value: '~4h saved' },
  { id: 'data-entry', name: 'Data Entry', icon: '📊', value: '~8h saved' }
];

<SelectableGrid
  items={processes}
  selected={selectedProcesses}
  onSelectionChange={setSelectedProcesses}
  multiSelect={true}
  columns={4}
  variant="compact"
/>

// Detailed variant for more content
<SelectableGrid
  items={services}
  selected={selectedService}
  onSelectionChange={setSelectedService}
  multiSelect={false}
  columns={2}
  variant="detailed"
/>
```

**Use Cases:**

- Process selection
- Feature selection
- Product catalogs
- Settings toggles

---

## Previously Created Components

### 8. ConfirmationModal

Delete/critical action confirmations with variants (danger/warning/primary)

### 9. EmptyStateWithAction

Standardized empty states with CTAs and 8 icon options

### 10. StatsCards

Enhanced statistics display with trends and loading states

### 11. LazyImage

Lazy-loaded images with Intersection Observer

---

## Design Patterns

### Color System

All components use consistent color themes:

- **blue** - Primary actions, info
- **green** - Success, savings, positive metrics
- **purple** - Premium features, special items
- **orange** - Warnings, attention
- **red** - Errors, negative metrics, before states
- **pink** - Creative, design-focused

### Size System

Consistent sizing across components:

- **small** - Compact interfaces, sidebars
- **medium** - Default, most common use
- **large** - Hero sections, emphasis

### Animation Standards

- Transitions: 300ms ease
- Hover scale: 1.05
- Pulse: 2s infinite
- Bounce: For active indicators
- Fade-in: 0.6s ease-out

---

## Usage Best Practices

### 1. Import from Index

Always import from the index file for consistency:

```jsx
import { RangeSlider, MetricCard, ComparisonCard } from "./components/ui";
```

### 2. Combine Components

Components are designed to work together:

```jsx
<SelectableGrid
  items={processes}
  selected={selected}
  onSelectionChange={setSelected}
/>
<ComparisonCard
  before={manualStats}
  after={automatedStats}
/>
<SavingsDisplay savings={calculateSavings(selected)} />
```

### 3. Customize with Props

All components accept `className` for additional styling:

```jsx
<RangeSlider
  className="my-custom-class"
  // ... other props
/>
```

### 4. Consistent Callbacks

Use consistent callback patterns:

```jsx
// Good
onChange={(value) => handleChange(value)}
onSelect={(id) => handleSelect(id)}

// Also good (direct)
onChange={handleChange}
onSelect={handleSelect}
```

---

## Component Composition Examples

### ROI Calculator Interface

```jsx
<RangeSlider
  label="Employees"
  value={employees}
  onChange={setEmployees}
  color="blue"
/>
<RangeSlider
  label="Hourly Wage"
  value={wage}
  onChange={setWage}
  prefix="$"
  color="green"
/>
<SelectableGrid
  items={processes}
  selected={selectedProcesses}
  onSelectionChange={setSelectedProcesses}
  multiSelect={true}
/>
<MetricGrid columns={3}>
  <MetricCard label="Savings" value={`$${savings}`} color="green" />
  <MetricCard label="ROI" value={`${roi}%`} color="blue" />
  <MetricCard label="Payback" value={`${months}m`} color="purple" />
</MetricGrid>
```

### Chatbot Interface

```jsx
<div className="messages">
  {messages.map(msg => (
    <MessageBubble
      type={msg.type}
      text={msg.text}
      timestamp={msg.timestamp}
      avatar={msg.type === 'bot' ? '🤖' : '👤'}
    />
  ))}
  {isTyping && <TypingIndicator />}
</div>
<QuickReplyButtons
  options={quickReplies}
  onSelect={handleReply}
  variant="outline"
/>
```

### Process Workflow Display

```jsx
<StepProgress
  steps={workflowSteps}
  currentStep={currentStep}
  orientation="vertical"
  color="blue"
/>
<ComparisonCard
  metric="Time & Cost Comparison"
  before={manualProcess}
  after={automatedProcess}
/>
```

---

## Migration Guide

### Refactoring Existing Components

**Before (ChatbotDemo):**

```jsx
// Custom slider implementation (30+ lines)
<div className="p-6">
  <label>...</label>
  <input type="range" ... />
  <div className="flex justify-between">...</div>
</div>
```

**After:**

```jsx
import { RangeSlider } from "./components/ui";

<RangeSlider
  label="Hours per Week"
  value={hours}
  onChange={setHours}
  suffix="h"
  color="blue"
/>;
```

**Result:** Reduced from 30 lines to 6 lines (80% reduction)

---

## Testing

### Component Testing Template

```jsx
import { render, fireEvent, screen } from "@testing-library/react";
import { RangeSlider } from "./components/ui";

test("RangeSlider changes value on input", () => {
  const handleChange = jest.fn();
  render(
    <RangeSlider label="Test Slider" value={50} onChange={handleChange} />
  );

  const slider = screen.getByRole("slider");
  fireEvent.change(slider, { target: { value: 75 } });

  expect(handleChange).toHaveBeenCalledWith(75);
});
```

---

## Performance

### Bundle Size Impact

- **Individual components:** 1-3KB each
- **Combined (tree-shaken):** ~15KB total
- **With dependencies:** ~18KB

### Optimization Tips

1. Import only what you need (tree-shaking works)
2. Use `React.memo()` for expensive renders
3. Debounce slider `onChange` for calculations
4. Lazy load demo-specific components

---

## Accessibility

All components include:

- ✅ Keyboard navigation support
- ✅ ARIA labels where appropriate
- ✅ Semantic HTML elements
- ✅ Color contrast (WCAG AA compliant)
- ✅ Focus indicators

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 10+)

---

## Version History

- **v2.0.0** - Added 7 new reusable components from demo system
- **v1.0.0** - Initial 4 components (ConfirmationModal, EmptyState, StatsCards, LazyImage)
