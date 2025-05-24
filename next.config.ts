import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig, ResolveOptions } from 'webpack';

interface CustomResolveOptions extends ResolveOptions {
  alias: {
    [key: string]: string | false;
  };
}

interface CustomWebpackConfig extends WebpackConfig {
  resolve: CustomResolveOptions;
}

interface ExperimentalConfig {
  serverComponentsExternalPackages: string[];
}

interface CustomNextConfig extends NextConfig {
  webpack: (config: CustomWebpackConfig) => CustomWebpackConfig;
  experimental: ExperimentalConfig;
}

const config: CustomNextConfig = {
  webpack: (config: CustomWebpackConfig): CustomWebpackConfig => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'canvas': false,
      'encoding': false
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [
      'chartjs-node-canvas',
      'canvas',
      '@napi-rs/canvas'
    ]
  }
};