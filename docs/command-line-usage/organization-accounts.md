---
id: organization-accounts
title: Organization Accounts
description: CLI commands to manage AWS organization member accounts
keywords:
  - Takomo
  - CLI
---

Commands to manage organization member accounts:

- [List Accounts](#list-accounts)
- [Create Account](#create-account)
- [Deploy Accounts](#deploy-accounts)
- [Undeploy Accounts](#undeploy-accounts)
- [Bootstrap Accounts](#bootstrap-accounts)
- [Tear Down Accounts](#tear-down-accounts)

## List Accounts

List accounts that belong to the organization.

### Usage

```
tkm org accounts list
```

### Examples

List all accounts.

```
tkm org accounts list
```

## Create Account

Create a new account into the organization.

### Usage

You must provide the account name and email.

```
tkm org accounts create --name <account name> --email <account email>
```

### Examples

Create a new account with email **hello@example.com** and name **example**.

```
tkm org accounts create --email hello@example.com --name example
```

## Deploy Accounts

Deploy infrastructure for organization accounts. The infrastructure to deploy is
configured with config sets.

Under the hood, the [deploy stacks command](stacks.md#deploy-stacks)
is used.

The local organization configuration must be in sync with the actual organization state
before this command can be run.

### Usage

You can pass one or more organizational unit paths to deploy only the accounts
that belong to organizational units located under the given paths in the organization
hierarchy. Alternatively, you can choose to deploy only specific accounts using `--account` option.

```
tkm org accounts deploy [ORGANIZATIONAL_UNIT_PATH...] [--account <account_id>]...
```

### Examples

Deploy all accounts in the organization.

```
tkm org accounts deploy
```

Deploy only accounts that belong to the organizational unit **Root/Sandbox** or to any organizational units
under it.

```
tkm org accounts deploy Root/Sandbox
```

Deploy only accounts that belong to the organizational unit **Root/Apps/Dev** or **Root/Apps/Test**,
or to any organizational units under them.

```
tkm org accounts deploy Root/Apps/Dev Root/Apps/Test
```

Deploy only account **123456789012**.

```
tkm org accounts deploy --account 123456789012
```

Deploy only account **123456789012** and **777777777777**.

```
tkm org accounts deploy --account 123456789012 --account 777777777777
```

## Undeploy Accounts

Undeploy infrastructure from organization accounts. The infrastructure to undeploy is configured with config sets.

Under the hood, the [undeploy stacks command](stacks.md#undeploy-stacks)
is used.

The local organization configuration must be in sync with the actual organization state before this command can be run.

### Usage

You can pass one or more organizational unit paths to undeploy only the accounts that belong to organizational units located under the given paths in the organization hierarchy. Alternatively, you can choose to undeploy only specific accounts using `--account` option.

```
tkm org accounts undeploy [ORGANIZATIONAL_UNIT_PATH...] [--account <account_id>]...
```

### Examples

Undeploy all accounts in the organization.

```
tkm org accounts undeploy
```

Undeploy only accounts that belong to the organizational unit **Root/Sandbox** or to any organizational units
under it.

```
tkm org accounts undeploy Root/Sandbox
```

Undeploy only accounts that belong to the organizational unit **Root/Apps/Dev** or **Root/Apps/Test**,
or to any organizational units under them.

```
tkm org accounts undeploy Root/Apps/Dev Root/Apps/Test
```

Undeploy only account **123456789012**.

```
tkm org accounts undeploy --account 123456789012
```

Undeploy only account **123456789012** and **777777777777**.

```
tkm org accounts undeploy --account 123456789012 --account 777777777777
```

## Bootstrap Accounts

Bootstrap organization accounts. The infrastructure to deploy is configured with bootstrap config sets.

Under the hood, the [deploy stacks command](stacks.md#deploy-stacks)
is used.

The local organization configuration must be in sync with the actual organization state
before this command can be run.

### Usage

You can pass one or more organizational unit paths to bootstrap only the accounts that belong to organizational units located under the given paths in the organization hierarchy. Alternatively, you can choose to bootstrap only specific accounts using `--account` option.

```
tkm org accounts bootstrap [ORGANIZATIONAL_UNIT_PATH...] [--account <account_id>]...
```

### Examples

Bootstrap all accounts in the organization.

```
tkm org accounts bootstrap
```

Bootstrap only accounts that belong to the organizational unit **Root/Sandbox** or to any organizational units
under it.

```
tkm org accounts bootstrap Root/Sandbox
```

## Tear Down Accounts

Tear down organization accounts. The infrastructure to tear down is configured with bootstrap config sets.

Under the hood, the [undeploy stacks command](stacks.md#undeploy-stacks)
is used.

The local organization configuration must be in sync with the actual organization state
before this command can be run.

### Usage

You can pass one or more organizational unit paths to tear down only the accounts that belong to organizational units located under the given paths in the organization hierarchy. Alternatively, you can choose to tear down only specific accounts using `--account` option.

```
tkm org accounts tear-down [ORGANIZATIONAL_UNIT_PATH...] [--account <account_id>]...
```

### Examples

Tear down all accounts in the organization.

```
tkm org accounts tear-down
```

Tear down only accounts that belong to the organizational unit **Root/Sandbox** or to any organizational units
under it.

```
tkm org accounts tear-down Root/Sandbox
```
