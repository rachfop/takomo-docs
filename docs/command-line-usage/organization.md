---
id: organization
title: Organization
---

Commands to manage organizations.

- [Create Organization](#create-organization)
- [Describe Organization](#describe-organization)
- [Deploy Organization](#deploy-organization)

## Create Organization

Create a new organization and initialize a minimum organization configuration file in `organization/organization.yml`.

### Usage

You can use `--feature-set` option to specify the feature set you want the organization to have.

```
tkm org create [--feature-set <FEATURE_SET>]
```

### Examples

Create a new organization with default feature set, which is **ALL**.

```
tkm org create
```

Create a new organization with **ALL** feature set.

```
tkm org create --feature-set ALL
```

Create a new organization with **CONSOLIDATED_BILLING** feature set.

```
tkm org create --feature-set CONSOLIDATED_BILLING
```

## Describe Organization

Describe organization.

### Usage

```
tkm org describe
```

## Deploy Organization

Deploy the organization configuration including trusted AWS services, service control policies,
tag policies, organizational units and accounts.

This command does not deploy infrastructure defined with config sets for the accounts. For that,
use [Deploy accounts command](organization-accounts.md#deploy-accounts).

### Usage

```
tkm org deploy
```
