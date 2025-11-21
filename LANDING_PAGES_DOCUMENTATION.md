# Landing Pages System Documentation

## Overview

The Landing Pages system provides a comprehensive solution for creating high-converting landing pages with pre-built templates and a drag-and-drop section builder.

## Features

### 🎯 **Core Features**

- **Pre-built Templates**: 6 professionally designed templates
- **Section-based Builder**: Drag-and-drop sections for easy customization
- **Template System**: Hero, Features, CTA, Testimonials, Pricing, Forms, and Custom HTML
- **Stats Dashboard**: Track views, published pages, and drafts
- **SEO Optimization**: Built-in meta tags and custom scripts support
- **Status Management**: Draft and Published states

### 📋 **Available Templates**

1. **Hero + CTA** 🎯

   - Simple landing with hero section and call-to-action
   - Perfect for: Quick campaigns, product announcements

2. **Product Launch** 🚀

   - Product features, testimonials, and pricing
   - Perfect for: New product releases, feature showcases

3. **Lead Magnet** 🧲

   - Download offer with opt-in form
   - Perfect for: eBooks, guides, resources

4. **Webinar Registration** 🎓

   - Event details with countdown and registration
   - Perfect for: Webinars, workshops, events

5. **Sales Page** 💰

   - Long-form sales with testimonials and guarantees
   - Perfect for: High-ticket items, detailed offers

6. **Coming Soon** ⏰
   - Pre-launch page with email signup
   - Perfect for: Product teasers, beta signups

### 🧱 **Section Types**

#### 1. Hero Section 🎯

- Heading
- Subheading
- CTA Button with link
- Background image support

#### 2. Features Grid ⭐

- Title
- Multiple feature items with icons
- Description for each feature

#### 3. Testimonials 💬

- Title
- Customer quotes
- Author name and role

#### 4. Call to Action 📢

- Title
- Description
- Button with link

#### 5. Form Section 📋

- Integration with Forms system
- Title customization
- Form ID selection

#### 6. Pricing Table 💰

- Multiple pricing plans
- Feature comparison
- CTA buttons

#### 7. Custom HTML 📝

- Full HTML/CSS/JS support
- Complete customization freedom

## Usage

### Creating a Landing Page

1. **Navigate to Landing Pages**

   - Go to Admin Dashboard → Landing Pages

2. **Choose Your Path**

   - **Start from Template**: Click on a pre-built template
   - **Start from Scratch**: Click "Create Landing Page"

3. **Configure Page Settings**

   - Page Title (required)
   - Slug (URL path, required)
   - Description
   - Status (Draft/Published)

4. **Build Your Page**

   - Add sections from the left sidebar
   - Customize each section's content
   - Reorder sections with up/down arrows
   - Delete unwanted sections

5. **Save & Publish**
   - Save as Draft for preview
   - Publish when ready to go live

### Editing a Landing Page

1. Navigate to Landing Pages list
2. Click "Edit" on the page you want to modify
3. Make your changes
4. Save to update

### Managing Sections

#### Adding Sections

- Click any section type from the "Add Sections" panel
- Section appears at the bottom of your page
- Customize immediately in the builder

#### Reordering Sections

- Use ↑ and ↓ arrows to move sections up or down
- Changes save when you click "Save Landing Page"

#### Deleting Sections

- Click the trash icon on any section
- Confirm deletion
- Section is removed immediately

## Page Structure

Landing pages are stored in the `pages` table with:

- `template`: 'custom' (identifies landing pages)
- `content`: JSON string containing sections array
- `meta_keywords`: 'landing' (for filtering)

### Section Data Structure

```json
{
  "id": 1234567890,
  "type": "hero",
  "heading": "Transform Your Business",
  "subheading": "Join thousands of successful businesses",
  "ctaText": "Get Started",
  "ctaLink": "#signup"
}
```

## API Integration

Landing pages use the existing Pages API:

### Endpoints Used

- `GET /api/pages?template=custom` - List landing pages
- `GET /api/pages/:id` - Get single landing page
- `POST /api/pages` - Create landing page
- `PUT /api/pages/:id` - Update landing page
- `DELETE /api/pages/:id` - Delete landing page

## Frontend Routes

- `/admin/landing-pages` - List all landing pages
- `/admin/landing-pages/create` - Create new landing page
- `/admin/landing-pages/create?template=hero-cta` - Create from template
- `/admin/landing-pages/edit/:id` - Edit existing landing page

## Components

### LandingPageList.jsx

Main listing page showing:

- Stats dashboard (Total, Published, Drafts, Views)
- Template selection cards
- Search and filter options
- Grid view of all landing pages
- Quick actions (Preview, Edit, Duplicate, Delete)

### LandingPageBuilder.jsx

Page builder interface with:

- Three-column layout
- Settings sidebar (left)
- Section management sidebar (left)
- Main content area (center-right)
- Section editor with inline editing
- Drag-and-drop ordering

## Customization

### Adding New Section Types

1. Add section type to `sectionTypes` array in LandingPageBuilder
2. Create default data in `getDefaultSectionData()`
3. Add section editor UI in the sections map
4. Update frontend rendering component

### Custom Styling

Each landing page supports:

- **Custom CSS**: Add page-specific styles
- **Custom JS**: Add custom interactions
- **Head Scripts**: Analytics, meta tags
- **Body Scripts**: Third-party integrations

## Best Practices

### 📝 Content

- Keep headlines clear and benefit-focused
- Use compelling CTAs with action verbs
- Add social proof (testimonials, stats)
- Include clear value propositions

### 🎨 Design

- Maintain visual hierarchy
- Use consistent colors and fonts
- Ensure mobile responsiveness
- Optimize images for web

### 🚀 Performance

- Minimize custom scripts
- Optimize images before upload
- Test on multiple devices
- Monitor page load times

### 📊 Conversion Optimization

- Single clear CTA per section
- Remove navigation distractions
- Add trust signals
- A/B test variations

## Future Enhancements

### Planned Features

- [ ] Visual drag-and-drop builder
- [ ] More section types (Video, Countdown, FAQ)
- [ ] A/B testing integration
- [ ] Analytics dashboard
- [ ] Mobile preview mode
- [ ] Section templates library
- [ ] Export/Import landing pages
- [ ] Conversion tracking
- [ ] Heat map integration

### Advanced Features (Roadmap)

- [ ] AI-powered content suggestions
- [ ] Template marketplace
- [ ] Dynamic content personalization
- [ ] Advanced form integrations
- [ ] Multi-variant testing
- [ ] Conversion funnel tracking

## Troubleshooting

### Landing Pages Not Showing

- Ensure `template` is set to 'custom'
- Check `meta_keywords` includes 'landing'
- Verify page status is correct

### Sections Not Saving

- Check console for errors
- Verify JSON structure is valid
- Ensure required fields are filled

### Preview Not Working

- Confirm slug is set correctly
- Check page status (published vs draft)
- Verify frontend routing

## Support

For issues or feature requests:

1. Check this documentation
2. Review existing pages for examples
3. Contact development team
4. Submit issue on project repository

---

**Version**: 1.0.0  
**Last Updated**: November 22, 2025  
**Status**: ✅ Fully Functional
