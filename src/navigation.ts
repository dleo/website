import {getPermalink, getBlogPermalink, getAsset} from './utils/permalinks';

export const headerData = {
    links: [
        {
            text: 'Home',
            href: '/',
        },
        {
            text: 'About',
            href: '/#about',
        },
        {
            text: 'Resume',
            href: '/#resume',
        },
        {
            text: 'Portfolio',
            href: '/#portfolio',
        },
        {
            text: 'Blog',
            href: '/blog',
        },
        {
            text: 'Contact Me',
            href: getPermalink('/contact'),
        }
    ],
    actions: [
        {
            text: 'Hire me',
            href: 'https://www.upwork.com/services/product/development-it-david-1882059583201817953?ref=project_share',
            target: '_blank',
        }
    ],
    showRssFeed: false
};

export const footerData = {
    links: [
        {
            title: 'Explore',
            links: [
                {text: 'Home', href: '/'},
                {text: 'Portfolio', href: '#portfolio'},
                {text: 'Testimonials', href: '#testimonials'},
                {text: 'Blog', href: '#blog'},
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
                    href: getPermalink('/contact'),
                },
            ],
        },
        {
            title: 'Tech & Tools',
            links: [
                {text: 'Laravel', href: '#'},
                {text: 'Vue.js', href: '#'},
                {text: 'TypeScript', href: '#'},
                {text: 'Tailwind CSS', href: '#'},
                {text: 'Mikrotik', href: '#'},
            ],
        },
    ],
    secondaryLinks: [
        {text: 'Terms', href: getPermalink('/terms')},
        {text: 'Privacy Policy', href: getPermalink('/privacy')},
    ],
    socialLinks: [
        {ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/dleolopez'},
        {ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/dleo'},
        {ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/in/dleolopez'},
    ],
    footNote: `
    <span class="text-muted">© ${new Date().getFullYear()} David Lopez.</span>
    <span class="ml-2">Crafted with Laravel, Vue, and a lot of coffee ☕.</span>
  `,
};
