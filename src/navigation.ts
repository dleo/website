import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Homes',
      links: [
        {
          text: 'SaaS',
          href: getPermalink('/homes/saas'),
        },
        {
          text: 'Startup',
          href: getPermalink('/homes/startup'),
        },
        {
          text: 'Mobile App',
          href: getPermalink('/homes/mobile-app'),
        },
        {
          text: 'Personal',
          href: getPermalink('/homes/personal'),
        },
      ],
    },
    {
      text: 'Pages',
      links: [
        {
          text: 'Features (Anchor Link)',
          href: getPermalink('/#features'),
        },
        {
          text: 'Services',
          href: getPermalink('/services'),
        },
        {
          text: 'Pricing',
          href: getPermalink('/pricing'),
        },
        {
          text: 'About us',
          href: getPermalink('/about'),
        },
        {
          text: 'Contact',
          href: getPermalink('/contact'),
        },
        {
          text: 'Terms',
          href: getPermalink('/terms'),
        },
        {
          text: 'Privacy policy',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: 'Landing',
      links: [
        {
          text: 'Lead Generation',
          href: getPermalink('/landing/lead-generation'),
        },
        {
          text: 'Long-form Sales',
          href: getPermalink('/landing/sales'),
        },
        {
          text: 'Click-Through',
          href: getPermalink('/landing/click-through'),
        },
        {
          text: 'Product Details (or Services)',
          href: getPermalink('/landing/product'),
        },
        {
          text: 'Coming Soon or Pre-Launch',
          href: getPermalink('/landing/pre-launch'),
        },
        {
          text: 'Subscription',
          href: getPermalink('/landing/subscription'),
        },
      ],
    },
    {
      text: 'Blog',
      links: [
        {
          text: 'Blog List',
          href: getBlogPermalink(),
        },
        {
          text: 'Article',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'Article (with MDX)',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
        {
          text: 'Category Page',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'Tag Page',
          href: getPermalink('astro', 'tag'),
        },
      ],
    },
    {
      text: 'Widgets',
      href: '#',
    },
  ],
  actions: [{ text: 'Download', href: 'https://github.com/dleo', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Explore',
      links: [
        { text: 'Home', href: '/' },
        { text: 'Portfolio', href: '#portfolio' },
        { text: 'Testimonials', href: '#testimonials' },
        { text: 'Blog', href: '#blog' },
        { text: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Work With Me',
      links: [
        {
          text: 'Hire me on Upwork',
          href: 'https://www.upwork.com/freelancers/davidlopezd',
        },
        {
          text: 'Upwork Project',
          href: 'https://www.upwork.com/services/product/development-it-david-1882059583201817953?ref=project_share',
        },
        {
          text: 'Contact me',
          href: '',
        },
      ],
    },
    {
      title: 'Tech & Tools',
      links: [
        { text: 'Laravel', href: '#' },
        { text: 'Vue.js', href: '#' },
        { text: 'TypeScript', href: '#' },
        { text: 'Tailwind CSS', href: '#' },
        { text: 'API Integrations', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/dleolopez' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/dleo' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/in/dleolopez' },
  ],
  footNote: `
    <span class="text-muted">© ${new Date().getFullYear()} David Lopez.</span>
    <span class="ml-2">Crafted with Laravel, Vue, and a lot of coffee ☕.</span>
  `,
};
