type JupiterDoc = {
  title: string;
  path: string;
}

type JupiterDocsSection = {
  title: string;
  documents: JupiterDoc[];
}

type JupiterDocs = {
  title: string;
  sections: JupiterDocsSection[];
}

export const J1QL_DOCS: JupiterDocs = {
  title: "JupiterOne Query Language Documentation",
  sections: [
    {
      title: "JupiterOne Query Language (J1QL) Docs",
      documents: [
        {
          title: "J1QL Quick Start Tutorial",
          path: "guides/tutorial-j1ql.md"
        },
        {
          title: "J1QL Language Specifications",
          path: "docs/jupiterone-query-language.md"
        }
      ]
    },
    {
      title: "Queries for AWS Analysis",
      documents: [
        {
          title: "AWS Access Permissions and Trusts",
          path: "queries/common-qq-aws-permissions.md"
        },
        {
          title: "J1 Queries for AWS Vulnerability Findings and Threat Monitoring",
          path: "guides/j1-aws-threat-monitoring.md"
        },
        {
          title: "J1 Queries for AWS Config",
          path: "guides/j1-queries-for-aws-config.md"
        }
      ]
    },
    {
      title: "Other Common Questions and Queries",
      documents: [
        {
          title: "Applications and Processes",
          path: "queries/common-qq-apps-processes.md"
        },
        {
          title: "Changes and Attribution",
          path: "queries/common-qq-changes.md"
        },
        {
          title: "Data Security",
          path: "queries/common-qq-changes.md"
        },
        {
          title: "Development, DevOps and SDLC",
          path: "queries/common-qq-dev.md"
        },
        {
          title: "Servers and Endpoints",
          path: "queries/common-qq-endpoint.md"
        },
        {
          title: "Identity, People and Privileged Access",
          path: "queries/common-qq-idp.md"
        },
        {
          title: "Hardware/Software Inventory and Configuration",
          path: "queries/common-qq-inventory-config.md"
        },
        {
          title: "Secrets and Key Management",
          path: "queries/common-qq-key-mgmt.md"
        },
        {
          title: "Network Infrastructure, Connections and Zones",
          path: "queries/common-qq-network.md"
        },
        {
          title: "Risks and Vulnerability Management",
          path: "queries/common-qq-risks.md"
        },
        {
          title: "User Training and Awareness",
          path: "queries/common-qq-training.md"
        }
      ]
    },
  ]
};