---
id: introduction
title: Introduction to Organizations
description: With Takomo Organizations you can manage your AWS organization, including organizational units, authorization and management policies, trusted AWS services, and accounts that belong to the organization
keywords:
  - Takomo
  - organization
---
With Takomo Organizations you can manage your AWS organization, including organizational units, authorization and management policies, trusted AWS services, and accounts belonging to the organization. Takomo Organizations builds on top of Takomo Stacks, so you can deploy infrastructure to your organization accounts using the standard Takomo configuration and features.

:::important
This documentation assumes that you have a good understanding of how [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html) work.
:::

## Directory Structure

Organization configuration is located in the **organization** directory, right next to the other Takomo directories. Most of the configuration goes into **organization.yml** file, and the four directories are for the different policy types available in AWS Organizations.

```
.
└- organization
   ├- organization.yml
   ├- ai-services-opt-out-policies
   ├- backup-policies
   ├- service-control-policies
   └- tag-policies
```