# Solo Launch Next.js Template

A production-ready Next.js 14+ template for tour operators and travel businesses, integrated with Sanity CMS for content management.

## Features

- **Next.js 14+ App Router** - Modern React framework with server components
- **Sanity CMS Integration** - Headless CMS for managing content
- **TypeScript** - Full type safety throughout the codebase
- **Responsive Design** - Mobile-first CSS with design tokens
- **Dynamic Routes** - Destinations and itineraries with static generation
- **Image Optimization** - Next.js Image component with Sanity CDN
- **Component Library** - Reusable React components (SiteChrome, Logo, ChatWidget, etc.)
- **SEO Ready** - Metadata and structured data support

## Tech Stack

- [Next.js 14+](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.com/)
- [Sanity CMS](https://www.sanity.io/)
- [Vercel](https://vercel.com/) (deployment)

## Project Structure

```
solo-launch-nextjs/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with SiteChrome
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles and CSS variables
│   ├── destinations/        # Destinations pages
│   │   ├── page.tsx        # Destinations listing
│   │   └── [slug]/page.tsx # Individual destination
│   └── itineraries/         # Itineraries/tours pages
│       ├── page.tsx        # Itineraries listing
│       └── [slug]/page.tsx # Individual itinerary with day-by-day
├── components/              # React components
│   ├── SiteChrome.tsx      # Header and footer
│   ├── Logo.tsx            # Logo component
│   ├── ChatWidget.tsx      # Floating chat interface
│   ├── AboutBody.tsx       # About section layout
│   └── Stars.tsx           # Star rating component
├── lib/                     # Utility functions
│   ├── getContent.ts       # Sanity query helpers
│   ├── getPages.ts         # Page fetching utilities
│   ├── jsonLd.ts           # Structured data generation
│   ├── resolveImage.ts     # Image URL helpers
│   └── types.ts            # TypeScript interfaces
├── sanity/                  # Sanity CMS configuration
│   ├── lib/
│   │   ├── client.ts       # Sanity client setup
│   │   └── image.ts        # Image URL builder
│   └── schemas/             # Content schemas
│       ├── destination.ts
│       ├── itinerary.ts
│       ├── page.ts
│       └── siteSettings.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Sanity account and project

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rgrrobinson-pixel/solo-launch-nextjs.git
cd solo-launch-nextjs
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

To get your Sanity project ID:
- Go to [sanity.io/manage](https://www.sanity.io/manage)
- Create a new project or use an existing one
- Copy the Project ID from your project settings

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### Setting Up Sanity Studio

The Sanity schemas are already configured in the `/sanity/schemas` directory. To set up your Sanity Studio:

1. Install Sanity CLI globally:

```bash
npm install -g @sanity/cli
```

2. Initialize Sanity in your project (if not already done):

```bash
sanity init
```

3. Deploy your Sanity Studio:

```bash
sanity deploy
```

4. Access your studio at `https://your-project.sanity.studio`

## Content Types

### Destination
- Name, slug, description
- Main image and gallery
- Featured flag

### Itinerary
- Title, slug, excerpt, description
- Duration, price
- Day-by-day breakdown with activities
- Included/excluded items
- Main image and gallery

### Page
- Generic page content type
- Title, slug, content blocks

### Site Settings
- Global site configuration
- Logo, site name, contact information

## Deployment

### Deploy to Vercel

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel project:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```

## Customization

### Styling

The template uses CSS custom properties (CSS variables) defined in `app/globals.css`. Customize colors, typography, and spacing by modifying the `:root` variables.

### Components

All components are in the `/components` directory. They're built with TypeScript and follow React best practices.

### Adding New Content Types

1. Create a new schema file in `/sanity/schemas/`
2. Add the schema to `/sanity/schemas/index.ts`
3. Create corresponding pages in `/app/` directory
4. Use the Sanity client to fetch data

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.com/docs)

## License

MIT License - feel free to use this template for your projects.

## Support

For issues and questions, please open an issue on GitHub.
