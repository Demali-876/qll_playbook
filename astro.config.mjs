import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://demali-876.github.io',
  base: '/qll_playbook',
  output: 'static',
  integrations: [
    starlight({
      title: 'Quantum Leap Labs',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/orgs/Quantum-Leap-Labs-Inc' }
      ],
      sidebar: [
        { label: 'Architecture Design', autogenerate: { directory: 'architecture' }},
        { label: 'Product Design & UX', autogenerate: { directory: 'design' }},
        { label: 'Marketing & Positioning', autogenerate: { directory: 'marketing' }},
        { label: 'Pitching & Fundraising', autogenerate: { directory: 'fundraising' }},
        { label: 'Legal & Compliance', autogenerate: { directory: 'legal' }},
        { label: 'Repositories', autogenerate: { directory: 'repositories' }},
        { label: 'Blogs', badge: 'New', autogenerate: { directory: 'blogs' }},
      ],
    }),
  ],
});