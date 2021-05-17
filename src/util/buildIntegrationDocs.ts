import pMap from 'p-map';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

interface DocsConfig {
  integrations: IntegrationProjectConfig[];
}

interface IntegrationProjectConfig {
  /**
   * e.g. graph-google-cloud
   */
  projectName: string;
  /**
   * e.g. Google Cloud
   */
  displayName: string;
}

interface IntegrationProjectConfigRenderable extends IntegrationProjectConfig {
  /**
   * The body contents of the integration documentation
   */
  body: string;
}

function buildGithubDocFileUrl(projectName: string) {
  return `https://raw.githubusercontent.com/JupiterOne/${projectName}/master/docs/jupiterone.md`;
}

/**
 * Example input: graph-google-cloud
 * Example output: google-cloud
 */
function getIntegrationDocFileBaseName(projectName: string) {
  const split = projectName.split('-');

  if (!split.length) {
    throw new Error(`Invalid project name supplied to "getIntegrationDocFilePath" (projectName=${projectName})`);
  }

  split.shift()
  return split.join('-');
}

async function generateRenderableIntegrationConfigs(
  integrationConfigs: IntegrationProjectConfig[]
): Promise<IntegrationProjectConfigRenderable[]> {
  const result = await pMap(
    integrationConfigs,
    async (config) => {
      const response = await fetch(buildGithubDocFileUrl(config.projectName), {});

      if (response.status === 404) {
        console.log('Could not fetch documentation file for project', config.projectName);
        return null;
      }

      const docContents = generateIntegrationPageContents(
        config.displayName,
        await response.text()
      );

      const renderableConfig: IntegrationProjectConfigRenderable = {
        ...config,
        body: docContents
      };

      return renderableConfig;
    },
    {
      concurrency: 5
    }
  );

  return (result.filter((r) => r !== null) as IntegrationProjectConfigRenderable[]);
}

function generateIntegrationPageContents(
  integrationName: string,
  githubFileContents: string
) {
  return `
---
name: ${integrationName};
---

${githubFileContents}
`;
}

async function createAllIntegrationProjectDocFilesFromConfig(
  integrationConfigs: IntegrationProjectConfig[]
) {
  const renderableConfigs = await generateRenderableIntegrationConfigs(integrationConfigs);

  await pMap(
    renderableConfigs,
    async (config) => {
      const docFilePath = path.join(
        __dirname,
        `../pages/integrations/${getIntegrationDocFileBaseName(config.projectName)}.mdx`
      );

      await fs.writeFile(
        docFilePath,
        config.body,
        {
          encoding: 'utf-8'
        }
      );
    }
  )
}

async function readDocsConfig(docsConfigFilePath: string): Promise<DocsConfig> {
  const fileContents = await fs.readFile(
    docsConfigFilePath,
    {
      encoding: 'utf-8'
    }
  );

  try {
    const yamlContents = (yaml.load(fileContents) as DocsConfig);
    return yamlContents;
  } catch (err) {
    throw new Error(`Failed to convert config file to YAML (path=${fileContents}, msg=${err.message})`);
  }
}

;(async () => {
  const docsConfig = await readDocsConfig(
    path.join(__dirname, '../docs.config.yaml')
  );

  await createAllIntegrationProjectDocFilesFromConfig(docsConfig.integrations);
})().catch((err) => {
  console.error('Error generating integraiton docs: ', err);
});
