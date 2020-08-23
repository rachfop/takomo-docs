---
id: trusted-aws-services
title: Trusted AWS Services
description: Managing trusted AWS services
keywords:
  - Takomo
  - organization
---

Takomo supports managing of trusted AWS services.

:::important
Trusted AWS services are supported only when **all features** is enabled in the organization.
:::

## Configuration

Trusted AWS services are configured in `trustedAwsServices` list. All services present in the list are considered as trusted. By default, if `trustedAwsServices` is not defined, all services are considered as trusted.

#### Example: Configure trusted AWS services

Here' how to add two trusted AWS services.

```yaml title="organization.yml"
trustedAwsServices:
  - cloudtrail.amazonaws.com
  - config.amazonaws.com
```

Allowed values:

- aws-artifact-account-sync.amazonaws.com
- cloudtrail.amazonaws.com
- compute-optimizer.amazonaws.com
- config.amazonaws.com
- ds.amazonaws.com
- fms.amazonaws.com
- license-manager.amazonaws.com
- member.org.stacksets.cloudformation.amazonaws.com
- ram.amazonaws.com
- servicecatalog.amazonaws.com
- ssm.amazonaws.com
- sso.amazonaws.com
- tagpolicies.tag.amazonaws.com

## See also

- [Config reference > trustedServices](/docs/config-reference/organization#trustedawsservices)
- [AWS documentation > Enabling trusted access with other AWS services](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html)
