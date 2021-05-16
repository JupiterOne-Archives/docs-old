import { entitySchemas } from '@jupiterone/data-model';
import * as fs from  'fs' ;

const nonBillableEntities = [
  'DomainRecord',
  'Finding',
  'Image',
  'IpAddress',
  'NetworkInterface',
  'PR',
  'PullRequest',
  'Record',
]

const ignoreFromDocs = [
  'Entity',
  'GraphObject',
  'RecordEntity',
]

const entityTableHeader = `
Entity             | Description
------             | -----------
`;

const entityBillingTableHeader = `
Entity             | Description             | Billable
------             | -----------             | --------
`;

const entityPropertiesHeader = `
Property           | Type      | Description
---------          | --------  | ------------
`;

function buildEntitiesTable() {
  let markdown = entityTableHeader;

  for (const key of Object.keys(entitySchemas).sort()) {
    if (!ignoreFromDocs.includes(key)) {
      const val = entitySchemas[key];
      markdown += `\`${key}\`${addSpaces(16, key.length)} | ${val.description}\n`;
    }
  }

  return markdown;
}

function buildEntitiesBillingTable() {
  let markdown = entityBillingTableHeader;

  for (const key of Object.keys(entitySchemas).sort()) {
    if (!ignoreFromDocs.includes(key)) {
      const val = entitySchemas[key];
      const billable = nonBillableEntities.includes(key) ? 'No' : 'Yes';
      markdown += `\`${key}\`${addSpaces(16, key.length)} | ${val.description} | ${billable} \n`;
    }
  }

  markdown += `\\[System Mapped Entities\\]   | Entities with \`_source='system-mapper'\`   | No \n`;
  markdown += `\\[System Internal Entities\\] | Entities with \`_source='system-internal'\` | No \n`;
  markdown += `\\[Custom Created Entities\\]  | Entities created with a custom-defined _class or _type | Yes \n`;

  return markdown;
}

function buildEntityPropertiesTable() {
  let markdown = entityPropertiesHeader;
  const properties = entitySchemas.Entity.allOf.find(item => item.properties);
  for (const [key, val] of Object.entries(properties.properties)) {
    markdown += `\`${key}\`${addSpaces(16, key.length)} | ${getPropertyTyle(val)} | ${val.description}\n`;
  }

  return markdown;
}

function getPropertyTyle(property) {
  if (property.anyOf) {
    return property.anyOf.map(item => '`'+item.type+'`');
  }
  if (Array.isArray(property.type)) {
    return property.type.map(item => '`'+item+'`');
  }
  else {
    return '`'+property.type+'`';
  }
}

function addSpaces(x: number, y: number) {
  let n = x - y;
  let spaces = '';
  while (n > 0) {
    spaces += ' ';
    n--;
  }
  return spaces;
}


function buildDocs() {
  fs.writeFileSync('./work/entities.md', buildEntitiesTable(), 'utf8');
  fs.writeFileSync('./work/billable-entities.md', buildEntitiesBillingTable(), 'utf8');
  fs.writeFileSync('./work/entity-properties.md', buildEntityPropertiesTable(), 'utf8');
}

buildDocs();
