import { entitySchemas } from '@jupiterone/data-model';
import * as fs from  'fs' ;

const nonBillableEntities = [
  'CodeCommit',
  'DataObject',
  'Document',
  'DomainRecord',
  'Everyone',
  'Finding',
  'Image',
  'Internet',
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
  let markdown = '??? reference "Defined Entities Table"\n' + entityTableHeader;

  for (const key of Object.keys(entitySchemas).sort()) {
    if (!ignoreFromDocs.includes(key)) {
      const val = entitySchemas[key];
      markdown += `    \`${key}\`${addSpaces(16, key.length)} | ${val.description}\n`;
    }
  }

  return markdown;
}

function buildEntitiesBillingTable() {
  let markdown = '??? reference "Billable Entities Table"\n' + entityBillingTableHeader;

  for (const key of Object.keys(entitySchemas).sort()) {
    if (!ignoreFromDocs.includes(key)) {
      const val = entitySchemas[key];
      const billable = nonBillableEntities.includes(key) ? 'No' : 'Yes';
      markdown += `    \`${key}\`${addSpaces(16, key.length)} | ${val.description} | ${billable} \n`;
    }
  }

  markdown += `    \\[System Mapped Entities\\]   | Entities with \`_source='system-mapper'\`   | No \n`;
  markdown += `    \\[System Internal Entities\\] | Entities with \`_source='system-internal'\` | No \n`;
  markdown += `    \\[Custom Created Entities\\]  | Entities created with a custom-defined _class or _type | Yes \n`;

  return markdown;
}

function buildEntityPropertiesTable() {
  let markdown = '??? reference "Common Entity Properties Table"\n' + entityPropertiesHeader;

  const properties = entitySchemas.Entity.allOf.find(item => item.properties);
  for (const [key, val] of Object.entries(properties.properties)) {
    markdown += `    \`${key}\`${addSpaces(16, key.length)} | ${getPropertyTyle(val)} | ${val.description}\n`;
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
  const billingDocPath = './faqs/faqs-account-billing.md';
  let billingDoc = fs.readFileSync(billingDocPath, 'utf8');
  const billingRefTableRegex = /<!--BEGIN Entity Billing Reference table-->(.*\n)*<!--END Entity Billing Reference table-->/gm;
  const billingRefTable = `<!--BEGIN Entity Billing Reference table-->\n${buildEntitiesBillingTable()}\n<!--END Entity Billing Reference table-->`;
  billingDoc = billingDoc.replace(billingRefTableRegex, billingRefTable);

  fs.writeFileSync(billingDocPath, billingDoc, 'utf8');

  const dataModelDocPath = './docs/jupiterone-data-model.md';
  let dataModelDoc = fs.readFileSync(dataModelDocPath, 'utf8');

  const entitiesTableRegex = /<!--BEGIN Defined Entities table-->(.*\n)*<!--END Defined Entities table-->/gm;
  const entitiesTable = `<!--BEGIN Defined Entities table-->\n${buildEntitiesTable()}\n<!--END Defined Entities table-->`;
  const entityPropertiesTableRegex = /<!--BEGIN Common Entity Properties table-->(.*\n)*<!--END Common Entity Properties table-->/gm;
  const entityPropertiesTable = `<!--BEGIN Common Entity Properties table-->\n${buildEntityPropertiesTable()}\n<!--END Common Entity Properties table-->`;
  dataModelDoc = dataModelDoc.replace(entitiesTableRegex, entitiesTable);
  dataModelDoc = dataModelDoc.replace(entityPropertiesTableRegex, entityPropertiesTable);

  fs.writeFileSync(dataModelDocPath, dataModelDoc, 'utf8');

  // FOR LOCAL DEBUG
  // fs.writeFileSync('./work/entities.md', buildEntitiesTable(), 'utf8');
  // fs.writeFileSync('./work/billable-entities.md', buildEntitiesBillingTable(), 'utf8');
  // fs.writeFileSync('./work/entity-properties.md', buildEntityPropertiesTable(), 'utf8');
}

buildDocs();
