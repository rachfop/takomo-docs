---
id: managing-organization
title: Managing Organization
---

This example demonstrates how to manage an AWS organization with [organization](/docs/command-line-usage/organization) and [organization accounts](/docs/command-line-usage/organization-accounts) commands.

See the complete example at [GitHub](https://github.com/takomo-io/takomo-examples/tree/master/organization).

## Files

The example consists of the following files:

```
.
├─ organization
│  ├─ organization.yml
|  └─ service-control-policies
│     └─ AllowedRegions.json
├─ stacks
│  ├─ examples
│  │  └─ budgets.yml
│  ├─ master
│  │  ├─ budgets.yml
│  │  └─ cloudtrail.yml
│  └- config.yml
└─ templates
   ├─ examples
   │  └─ budgets.yml
   └─ master
      ├─ budgets.yml
      └─ cloudtrail.yml
```

## Organization Configuration

Configuration for the organization is located in the **organization** directory. The organization configuration file **organization.yml** describes organizational units along with service control policies and member accounts. It also contains config sets used to define the infrasturcture to deploy to the member accounts and variables that are used as inputs for the config sets.

```yaml title="organization/organization.yml"
masterAccountId: "{{ env.MASTER_ACCOUNT_ID }}"

serviceControlPolicies:
  FullAWSAccess:
    description: AWS managed default policy
    awsManaged: true
  AllowedRegions:
    description: Set allowed regions

vars:
  cloudTrailBucketName: {{ env.MASTER_ACCOUNT_CLOUD_TRAIL_BUCKET_NAME }}
  budgets:
    totalCostLimit: 10
    notificationEmail: {{ env.BUDGETS_NOTIFICATION_EMAIL }}
   
organizationalUnits:
  
  Root:
    serviceControlPolicies:
      - FullAWSAccess
      - AllowedRegions
  
  Root/Master:
    accounts:
      - "{{ env.MASTER_ACCOUNT_ID }}"
    vars:
      budgets:
        totalCostLimit: 50
    configSets:
      - masterAccount  
  
  Root/Examples:
    accounts:
      - "{{ env.ACCOUNT_1 }}"   
      - "{{ env.ACCOUNT_2 }}"   
      - "{{ env.ACCOUNT_3 }}"
    configSets:
      - examples

configSets:

  masterAccount:
    commandPaths:
      - /master

  examples:
    commandPaths:
      - /examples 
```

Configuration that is organization specific such as account ids and email addresses is read from environment variables. When deploying this configuration you must provide values for the environment variables.

### Master Account Id

The master account id is required. It is used to ensure that the credentials used to run commands targeting the organization belong to the right account.

### Service Control Policies

The organization has two service control policies. **FullAWSAccess** is the default policy managed by AWS. The **awsManaged** property indicates this. The other policy, **AllowedRegions**, defines regions where the member accounts can create resources to. The actual JSON file containing the policy is named as **AllowedRegions.json** and located in the **service-control-polices** directory.

```yaml
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyAllOutsideAllowedRegions",
        "Effect": "Deny",
        "Action": "*",
        "Resource": "*",
        "Condition": {
          "StringNotEquals": {
            "aws:RequestedRegion": [
              "us-east-1",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "eu-west-3",
              "eu-north-1"
            ]
          }
        }
      }
    ]
  }
```

### Organizational Units

Organizational units are defined under **organizationalUnits** property. In reality, organizational units form a tree-like hierarchy, but to make the configuration more readable, they are not nested but defined all in the same level using their paths.

The actual organizational units hierarchy that matches the configuration looks like this:

```
ROOT
├─ Master
└─ Examples
```

### Member Accounts

The member accounts are defined under the organizational units with **accounts** property.

### Config Sets

Infrastructure that can be deployed to the member accounts is defined using config sets under the top-level **configSets** property. Each config set has a name which is used to reference to it from the organizational units configuration, and a list of command paths to be deployed when the config set is itself deployed. 

### Variables

Variables used as inputs for config sets are defined with **vars** property which can be used at the top-level and under an organizational unit or a member account. Variables are inherited from the top-level to organizational units, and from organizational units to member accounts. 

## Deploy Organization

The organization basic configuration, including service control policies, tag policies, trusted AWS services and organizational units, is deployed with [deploy organization command](/docs/command-line-usage/organization#deploy-organization). It also relocates member accounts under correct organizational units. 

## Deploy Organization Accounts

Infrastucture for the member accounts is deployed using [deploy organization accounts command](/docs/command-line-usage/organization-accounts#deploy-accounts).

In this example, stacks **/master/budgets.yml** and **/master/cloudtrail.yml** are deployed to the member accounts that belong to **Root/Master** organizational unit, and stack **/examples/budgets.yml** is deployed to the accounts of organizational unit **Root/Examples**.

## See Also

Find more information from the documentation:

- [Organization commands](/docs/command-line-usage/organization)
- [Organization accounts command](/docs/command-line-usage/organization-accounts)
- [Organization configuration reference](/docs/config-reference/organization)