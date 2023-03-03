import { PlaywrightTestConfig } from '@playwright/test';

const appName = process.env.NX_TASK_TARGET_PROJECT || 'next-app';
const outputFolderForProject = process.env.CI
  ? `../../test-results/${appName}`
  : 'test-results';
const baseURL = process.env.BASE_URL || 'http://localhost:4200/';

export const baseConfig: PlaywrightTestConfig = {
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : undefined,
  maxFailures: process.env.CI ? 10 : undefined,
  timeout: 30000,
  outputDir: outputFolderForProject,
  reporter: process.env.CI
    ? [
        ['dot'],
        [
          'html',
          {
            open: 'never',
            outputFolder: outputFolderForProject.concat('/html-report'),
          },
        ],
        [
          'junit',
          { outputFile: outputFolderForProject.concat('/', appName, '.xml') },
        ],
      ]
    : 'list',
  use: { baseURL },
};
