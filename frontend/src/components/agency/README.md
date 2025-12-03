# Agency Component Library

Reusable React components for the AI Marketing Agency website. All components follow the professional color palette (Navy, Purple, Cyan, Coral) and are fully responsive.

## Installation

```javascript
import {
  SectionHeader,
  StatDisplay,
  CTAButton,
  FeatureCard,
  ServiceCard,
  PricingCard,
  VideoCard,
  TestimonialCard,
  ProcessStep,
  CaseStudyCard,
} from "@/components/agency";
```

## Components

### 1. SectionHeader

Flexible section header with badge, gradient text, and alignment control.

**Props:**

- `badge` (string) - Badge text above heading
- `badgeIcon` (string) - FontAwesome icon class
- `badgeColor` (string) - Color variant: 'purple', 'cyan', 'coral'
- `heading` (string) - Main heading text
- `headingGradientText` (string) - Text to apply gradient styling
- `description` (string) - Description text
- `descriptionBelow` (boolean) - Place description below heading
- `align` (string) - Alignment: 'left', 'center', 'right'
- `className` (string) - Additional CSS classes
- `maxWidth` (string) - Max width class

**Usage:**

```jsx
<SectionHeader
  badge="Our Services"
  badgeIcon="fas fa-sparkles"
  badgeColor="purple"
  heading="Transform Your Brand with AI-Powered Marketing"
  headingGradientText="AI-Powered"
  description="Three core services designed to grow your business"
  align="center"
/>
```

### 2. StatDisplay

Display statistics and metrics with flexible orientation and styling.

**Props:**

- `value` (string/number) - Metric value
- `label` (string) - Metric label
- `icon` (string) - FontAwesome icon class
- `valueColor` (string) - Color: 'gradient', 'purple', 'cyan', 'coral', 'navy', 'white'
- `labelColor` (string) - Color: 'gray', 'white'
- `size` (string) - Size: 'small', 'medium', 'large', 'xlarge'
- `orientation` (string) - Layout: 'vertical', 'horizontal'
- `className` (string) - Additional CSS classes

**Usage:**

```jsx
<StatDisplay
  value="500K+"
  label="Views Generated"
  icon="fas fa-eye"
  size="large"
  valueColor="gradient"
/>

<StatDisplay
  value="10x"
  label="ROI Increase"
  orientation="horizontal"
  icon="fas fa-chart-line"
/>
```

### 3. CTAButton

Multi-variant CTA button with icon support.

**Props:**

- `children` (node) - Button text
- `variant` (string) - Style: 'primary' (gradient), 'coral', 'outline'
- `size` (string) - Size: 'small', 'medium', 'large'
- `icon` (string) - FontAwesome icon class
- `iconPosition` (string) - Position: 'left', 'right'
- `href` (string) - Link URL (renders as <a>)
- `onClick` (function) - Click handler (renders as <button>)
- `fullWidth` (boolean) - Full width button
- `className` (string) - Additional CSS classes

**Usage:**

```jsx
<CTAButton variant="primary" icon="fas fa-arrow-right" href="/contact">
  Get Started
</CTAButton>

<CTAButton variant="coral" size="large" onClick={handleClick}>
  Book a Call
</CTAButton>

<CTAButton variant="outline" icon="fas fa-play" iconPosition="left">
  Watch Demo
</CTAButton>
```

### 4. FeatureCard

Card for displaying features, problems, or benefits.

**Props:**

- `icon` (string) - FontAwesome icon class
- `iconColor` (string) - Color: 'gradient', 'purple', 'cyan', 'coral'
- `title` (string) - Card title
- `description` (string) - Card description
- `size` (string) - Icon size: 'small', 'medium', 'large'
- `variant` (string) - Style: 'default', 'glass', 'minimal'
- `className` (string) - Additional CSS classes

**Usage:**

```jsx
<FeatureCard
  icon="fas fa-clock"
  iconColor="coral"
  title="Time-Consuming Content Creation"
  description="Creating consistent, high-quality UGC content takes hours every day"
  variant="default"
/>
```

### 5. ServiceCard

Comprehensive service card with features list and CTA.

**Props:**

- `icon` (string) - FontAwesome icon class
- `title` (string) - Service title
- `subtitle` (string) - Service subtitle
- `description` (string) - Service description
- `features` (array) - Array of feature strings
- `ctaText` (string) - CTA button text (default: 'Learn More')
- `ctaLink` (string) - CTA link URL
- `variant` (string) - Style: 'default', 'glass'
- `className` (string) - Additional CSS classes

**Usage:**

```jsx
<ServiceCard
  icon="fas fa-video"
  title="AI UGC Content Creation"
  subtitle="Authentic Video Content at Scale"
  description="Generate unlimited authentic UGC-style videos that build trust and drive sales"
  features={[
    "10-50 AI-generated UGC videos per month",
    "Scripts written by AI trained on viral UGC",
    "48-hour turnaround time",
    "Unlimited revisions",
  ]}
  ctaText="Explore UGC Services"
  ctaLink="/services/ugc"
/>
```

### 6. PricingCard

Pricing tier card with features and CTA.

**Props:**

- `name` (string) - Pricing tier name
- `price` (string) - Price display (e.g., '$1,500', 'Custom')
- `priceUnit` (string) - Price unit (default: 'project')
- `description` (string) - Tier description
- `features` (array) - Array of feature strings
- `isPopular` (boolean) - Show 'Most Popular' badge
- `ctaText` (string) - CTA button text
- `ctaVariant` (string) - Button style: 'gradient', 'coral', 'outline'
- `ctaLink` (string) - CTA link URL
- `className` (string) - Additional CSS classes

**Usage:**

```jsx
<PricingCard
  name="Growth"
  price="$3,000"
  priceUnit="month"
  description="Perfect for growing brands"
  features={[
    "20 UGC videos per month",
    "Premium AI voices",
    "72-hour turnaround",
    "Dedicated support",
  ]}
  isPopular={true}
  ctaVariant="gradient"
  ctaLink="/contact"
/>
```

### 7. VideoCard

Portfolio video card with thumbnail and overlay info.

**Props:**

- `videoUrl` (string) - Video URL
- `thumbnailUrl` (string) - Thumbnail image URL
- `title` (string) - Video title
- `description` (string) - Video description
- `category` (string) - Category badge text
- `stats` (object) - Stats object: `{ views, engagement }`
- `onClick` (function) - Click handler
- `className` (string) - Additional CSS classes

**Usage:**

```jsx
<VideoCard
  thumbnailUrl="/images/video-thumb.jpg"
  title="Product Launch Campaign"
  description="Generated 500K+ views in 7 days"
  category="E-commerce"
  stats={{ views: "500K+", engagement: "12%" }}
  onClick={() => openVideoModal()}
/>
```

### 8. TestimonialCard

Client testimonial card with rating and stats.

**Props:**

- `quote` (string) - Testimonial quote
- `author` (string) - Author name
- `role` (string) - Author role/title
- `company` (string) - Company name
- `avatar` (string) - Avatar image URL
- `rating` (number) - Star rating (1-5, default: 5)
- `stats` (array) - Array of stat objects: `[{ value, label }]`
- `variant` (string) - Style: 'default', 'glass'
- `className` (string) - Additional CSS classes

**Usage:**

```jsx
<TestimonialCard
  quote="Harsh's AI UGC videos transformed our brand. We saw 3x more engagement and 40% higher conversions within the first month."
  author="Sarah Johnson"
  role="Marketing Director"
  company="TechStart Inc"
  avatar="/images/sarah.jpg"
  rating={5}
  stats={[
    { value: "3x", label: "Engagement" },
    { value: "40%", label: "Conversions" },
    { value: "30K", label: "New Followers" },
  ]}
/>
```

### 9. ProcessStep

Workflow/process step component with connector lines.

**Props:**

- `number` (number) - Step number
- `title` (string) - Step title
- `description` (string) - Step description
- `icon` (string) - FontAwesome icon class (optional)
- `isLast` (boolean) - Hide connector line for last step
- `variant` (string) - Style: 'default', 'glass', 'minimal'
- `className` (string) - Additional CSS classes

**Usage:**

```jsx
<ProcessStep
  number={1}
  icon="fas fa-comments"
  title="Discovery Call"
  description="We understand your brand, audience, and content goals in a 30-minute consultation"
/>

<ProcessStep
  number={2}
  icon="fas fa-wand-magic-sparkles"
  title="AI Generation"
  description="Our AI creates authentic UGC-style videos tailored to your brand"
/>

<ProcessStep
  number={3}
  icon="fas fa-rocket"
  title="Delivery & Launch"
  isLast={true}
  description="Receive your videos in 48 hours, ready to post and convert"
/>
```

### 10. CaseStudyCard

Case study card with results, metrics, and tags.

**Props:**

- `icon` (string) - FontAwesome icon class
- `title` (string) - Case study title
- `subtitle` (string) - Subtitle
- `description` (string) - Description
- `results` (array) - Array of result objects: `[{ value, label }]`
- `tags` (array) - Array of tag strings
- `ctaText` (string) - CTA text (default: 'View Case Study')
- `ctaLink` (string) - CTA link URL
- `variant` (string) - Style: 'default', 'glass', 'gradient'
- `className` (string) - Additional CSS classes

**Usage:**

```jsx
<CaseStudyCard
  icon="fas fa-cogs"
  title="E-commerce Automation System"
  subtitle="Fashion Brand"
  description="Automated lead nurturing and abandoned cart recovery for a growing fashion brand"
  results={[
    { value: '5hrs', label: 'Saved Daily' },
    { value: '35%', label: 'Cart Recovery' }
  ]}
  tags={['E-commerce', 'Automation', 'Email Marketing']}
  variant="default"
/>

<CaseStudyCard
  icon="fas fa-bullhorn"
  title="Multi-Channel Campaign"
  subtitle="SaaS Startup"
  description="Integrated campaign across Instagram, Facebook, and email for SaaS launch"
  results={[
    { value: '200%', label: 'CTR Increase' },
    { value: '50K', label: 'New Users' }
  ]}
  tags={['Paid Ads', 'Social Media', 'Launch Campaign']}
  variant="gradient"
/>
```

## Color System

All components use the professional color palette:

- **Navy**: `#0F172A` - Primary background, text
- **Purple**: `#8B5CF6` - Primary brand color
- **Cyan**: `#06B6D4` - Accent, highlights
- **Coral**: `#F97316` - CTA, urgency

### Gradient Classes

Components automatically use these Tailwind classes:

- `gradient-text` - Purple to Cyan text gradient
- `gradient-button` - Purple to Pink button gradient
- `gradient-cta` - Purple to Cyan background gradient
- `bg-navy`, `text-navy`, `bg-purple`, `text-purple`, etc.

## Styling

All components support:

- Responsive design (mobile-first)
- Dark/light variants where applicable
- Hover states and animations
- Custom className overrides
- Tailwind utility classes

## Examples

### Complete Hero Section

```jsx
<section className="relative bg-gradient-to-br from-navy via-navy to-purple min-h-screen flex items-center">
  <div className="container mx-auto px-6 py-24">
    <SectionHeader
      badge="Welcome"
      badgeIcon="fas fa-sparkles"
      heading="AI-Powered Marketing Agency"
      headingGradientText="AI-Powered"
      description="Transform your brand with our three core services"
      align="center"
      className="mb-12"
    />

    <div className="flex justify-center gap-6">
      <CTAButton variant="primary" size="large" icon="fas fa-rocket">
        Get Started
      </CTAButton>
      <CTAButton
        variant="outline"
        size="large"
        icon="fas fa-play"
        iconPosition="left"
      >
        Watch Demo
      </CTAButton>
    </div>

    <div className="grid grid-cols-3 gap-8 mt-16">
      <StatDisplay value="500K+" label="Views Generated" size="large" />
      <StatDisplay value="10x" label="ROI Increase" size="large" />
      <StatDisplay value="24hr" label="Turnaround" size="large" />
    </div>
  </div>
</section>
```

### Services Grid

```jsx
<section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <SectionHeader
      badge="Our Services"
      heading="Three Core Services"
      align="center"
      className="mb-16"
    />

    <div className="grid md:grid-cols-3 gap-8">
      <ServiceCard
        icon="fas fa-video"
        title="AI UGC Content"
        description="Authentic video content at scale"
        features={[
          "10-50 videos/month",
          "AI-generated scripts",
          "48hr turnaround",
        ]}
        ctaLink="/services/ugc"
      />
      <ServiceCard
        icon="fas fa-cogs"
        title="Marketing Automation"
        description="Smart systems that work 24/7"
        features={["Email automation", "Lead nurturing", "CRM integration"]}
        ctaLink="/services/automation"
      />
      <ServiceCard
        icon="fas fa-bullhorn"
        title="Campaign Management"
        description="Multi-channel performance marketing"
        features={["Paid ads", "Social media", "Analytics tracking"]}
        ctaLink="/services/campaigns"
      />
    </div>
  </div>
</section>
```

### Pricing Section

```jsx
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    <SectionHeader
      badge="Pricing"
      heading="Simple, Transparent Pricing"
      align="center"
      className="mb-16"
    />

    <div className="grid md:grid-cols-3 gap-8">
      <PricingCard
        name="Starter"
        price="$1,500"
        priceUnit="project"
        description="Perfect for testing"
        features={["10 UGC videos", "Basic AI voices", "5-day turnaround"]}
        ctaVariant="outline"
      />
      <PricingCard
        name="Growth"
        price="$3,000"
        priceUnit="month"
        description="For growing brands"
        features={[
          "20 videos/month",
          "Premium AI",
          "72hr turnaround",
          "Support",
        ]}
        isPopular={true}
        ctaVariant="gradient"
      />
      <PricingCard
        name="Enterprise"
        price="Custom"
        description="For established brands"
        features={[
          "50+ videos/month",
          "Custom AI training",
          "24hr turnaround",
          "Dedicated team",
        ]}
        ctaVariant="outline"
      />
    </div>
  </div>
</section>
```

## Component Reusability

**High Reuse Components:**

- `SectionHeader` - Used 6+ times across homepage
- `StatDisplay` - Very high reuse (hero, floating cards, testimonials)
- `CTAButton` - 3+ variants throughout site
- `PricingCard` - 3 tiers per pricing section

**Moderate Reuse:**

- `FeatureCard` - 4 instances (problems, benefits)
- `ServiceCard` - 3 services per section
- `VideoCard` - Portfolio/work sections
- `ProcessStep` - 3-5 steps per process

**Specialized:**

- `TestimonialCard` - Results sections
- `CaseStudyCard` - Case study showcases

## Notes

- All components are fully typed for TypeScript support
- Icons use FontAwesome classes
- Responsive breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Color palette documented in `BRAND_COLOR_SYSTEM.md`
