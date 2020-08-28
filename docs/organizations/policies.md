---
id: policies
title: Policies
description: Managing authorization and management policies
keywords:
  - Takomo
  - organization
---

Takomo supports managing of authorization and management policies.

:::important
Policies are supported only when **all features** is enabled in the organization.
:::

## Policy Types

There are four policy types. Policies for each policy type are configured under its own key in `organization.yml` file and the actual policy files are located in the corresponding directories under `organization` directory.

| Policy type | Key | Policy file directory | 
| ----------- | --- | --------------------- |
| AI services opt-out policy | aiServicesOptOutPolicies | ai-services-opt-out-policies |
| Backup policy              | backupPolicies           | backup-policies              |
| Service control policy     | serviceControlPolicies   | service-control-policies     |
| Tag policy                 | tagPolicies              | tag-policies                 |

## Enabling Policy Types

By default all policy types are disabled. To enable a policy type, you just need to configure at least one policy for it and the policy type is automatically enabled when the organization is deployed. If you don't have policies configured but still want to enable the policy type, you can set `true` for its value.

### Example: Enabling a Policy Type

Here's how to enable tag policies with a boolean value without configuring actual policies:

```yaml title="organization.yml"
tagPolicies: true
```

## Disabling Policy Types

A policy type is disabled if it doesn't have any policies configured. So, to disable a policy that has policies in it, you just need to remove policy type's configuration from `organization.yml` file and the policy type is disabled when the organization is deployed. You can also disable a policy type by setting `false` to its value. 

### Example: Disabling a Policy Type

Here's how to disable backup policies with a boolean value:

```yaml title="organization.yml"
backupPolicies: true
```

## Policy Configuration

Configuration structure for each policy type is identical and is given in an object whose keys are policy names and values are policy objects containing configuration for the corresponding policies.

A policy object has the following keys:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| description | yes | string  | Mandatory description for the policy |
| awsManaged  | no  | boolean | A boolean indicating if the policy is managed by AWS |

### Example: Configuring Policies

Here's how to configure some policies:

```yaml title="organization.yml"
serviceControlPolicies:
  my-policy:
    description: My strict policy
  allowedRegions:
    decription: Restricts access only to specified regions
tagPolicies:
  taggingPolicy:
    description: My tag policy
```

In the above example, we configure two service control policies and one tag policy. The service control policies are named `my-policy` and `allowedRegions`. The tag policy is named as `taggingPolicy`.

## Policy Files

For each policy defined in the policy configuration, there must be a corresponding `.json` file with the same name containing the actual policy in the policy file directory.

### Example: Adding policy files

Let's continue from the previous example where we defined some service control and tag policies. To make the configuration valid, we need to have the following policy files in place:

```
.
└- organization
   ├- organization.yml
   ├- service-control-policies
   |  ├- my-policy.json
   |  └- allowedRegions.json
   └- tag-policies
      └- taggingPolicy.json
```

As you can see, we have created the policy files under the correct policy type directories.

## AWS Managed Policies

There is a default service control policy that is managed by AWS and named as `FullAWSAccess`. You can't provide your own policy with this name. You can still use this policy with your organizational units and accounts by defining it with `awsManaged: true`. Because the policy is managed by AWS, you donn't need to provide a policy file for it.

### Example: Configure the AWS managed default policy 

Here's how to configure the default AWS managed service control policy.

```yaml title="organization.yml"
serviceControlPolicies:
  FullAWSAccess:
    description: AWS managed default policy
    awsManaged: true
```

## Attaching Policies to Organizational Units and Member Accounts

Once you have some policies configured, you can start attaching them to organizational units and member accounts.

In their configuration, both organizational units and member accounts have keys for each policy type. You use these keys to specify which policies to attach to them.

| Policy type | Key |
| ----------- | --- |
| AI services opt-out policy | aiServicesOptOutPolicies |
| Backup policy              | backupPolicies           |
| Service control policy     | serviceControlPolicies   |
| Tag policy                 | tagPolicies              |

Organizational units and member accounts inherit policies from their parent organizational unit.

### A Note Regarding Service Control Policies 

Takomo handles service control policies differently compared to other policies. Service control policies attached to an organizational unit are also attached directly to all organizational units and accounts under it. When other policies are attached to an organizational unit, they are just inherited by all organizational units and accounts under it and not directly attached.

### Example: Attaching policies to organizational units

Here, we have some policies which we attach to organizational units.

```yaml title="organization.yml"
serviceControlPolicies:
  FullAWSAccess:
    description: AWS managed default policy
    awsManaged: true

backupPolicies:
  rdsBackups:
    decription: Policy for RDS backups

organizationalUnits:
  Root:
    serviceControlPolicies:
      - FullAWSAccess
  Root/Website:
    backupPolicies:
      - rdsBackups
```

### Example: Attaching policies to member accounts

You can attach policies to member accounts, too.

```yaml title="organization.yml"
serviceControlPolicies:
  FullAWSAccess:
    description: AWS managed default policy
    awsManaged: true

tagPolicies:
  myTaggingPolicy:
    decription: My tag policy

organizationalUnits:
  Root:
    accounts:
      - id: "123456789012"
        backupPolicies:
          - rdsBackups
        tagPolicies:
          - myTaggingPolicy
```

### Example: Inheriting policies

In this example we have service control and backup policies.

- The AWS managed policy **FullAWSAccess** is attached to the **Root** and also attached to all other organizational units and member accounts.
- The organization master account **999999999999** is put into **Root/Master** because we don't want to apply any additional policies to it.
- **Root/Applications** is the parent of two organizational units that host the two application environments, and has **AllowedRegions** service control policy attached to it. This policy could set the allowed regions for the application environments and their member accounts.
- Finally, the production account **888888888888** has **Production** service control policy, maybe containing some strict restrictions, attached directly to it. 


```yaml title="organization.yml"
serviceControlPolicies:
  FullAWSAccess:
    description: AWS managed default policy
    awsManaged: true
  AllowedRegions:
    description: Set allowed regions
  Production:
    description: Extra strict policy for production enviroment

backupPolicies:
  EBS:
    description: EBS backups
  RDS:
    description: RDS backups

organizationalUnits:
  Root:
    serviceControlPolicies:
      - FullAWSAccess
  Root/Master:
    accounts:
      - id: "999999999999"
        description: This is the organization master account
  Root/Applications:
    serviceControlPolicies:
      - AllowedRegions
  Root/Applications/Dev:
    accounts:
      - "111111111111"
      - "222222222222"
  Root/Applications/Prod:
    accounts:
      - id: "888888888888"
        serviceControlPolicies:
          - Production
```

## See Also

- [AWS documentation: AI services opt-out policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_ai-opt-out.html)
- [AWS documentation: Backup policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_backup.html)
- [AWS documentation: Service control policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html)
- [AWS documentation: Tag policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html)
