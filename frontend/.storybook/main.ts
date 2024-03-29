import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
  ],
  docs: {
    autodocs: 'tag',
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  stories: [
    '../app/**/*.mdx',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
};

export default config;
