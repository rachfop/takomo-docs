---
id: member-accounts
title: Member Accounts
---

Accounts that belong to an organization are called as member accounts. Each member account belongs to exactly one organizational unit. 

## Adding Member Accounts to Organizational Units

To specify member accounts that belong to an organizational unit, you list the accounts under organizational unit's `accounts` key. You can use plain account ids or key-value objects with `id` key for the account id.

#### Example: Setting member accounts

In this example, account **222222222222** is given as a key-value object, while the other accounts are given as plain strings.

```yaml title="organization.yml"
organizationalUnits:
  Root/Environments:
    accounts:
      - "123456789012"
  Root/Environments/Dev:
    accounts:
      - "111111111111"
      - "888888888888"
  Root/Sandbox:
    accounts:
      - id: "222222222222"
```

## Additional Information

When configuring accounts with key-value objects, you can provide additional information that helps you identify the account and its purpose. Takomo uses this information also to validate that operations targeting the accounts are executed against the correct account. 

### Description

For documentation purposes, you can provide a short description for an account with `description` key.

#### Example: Setting account description

```yaml title="organization.yml"
organizationalUnits:
  Root:
    accounts:
      - id: "123456789012"
        description: Production environment of acme.com
```

### Name

Each account has a name, and you can use `name` key to document it. 

When the account is deployed, Takomo validates that the name actually belongs to the same account as the account id does. If there's no match, the deployment is aborted with an error message.

The `name` key is used only for documentation and validation purposes - you can't change account's name by changing the account name in the local configuration.

#### Example: Setting account name

```yaml title="organization.yml"
organizationalUnits:
  Root:
    accounts:
      - id: "123456789012"
        name: acme-prod
```

### Email

Each account has an email (used also as an username of the account's root), and you can use `email` key to document it. 

When the account is deployed, Takomo validates that the email actually belongs to the same account as the account id does. If there's no match, the deployment is aborted with an error message.

The `email` key is used only for documentation and validation purposes - you can't change account's email by changing the account email in the local configuration.

#### Example: Setting account email

```yaml title="organization.yml"
organizationalUnits:
  Root:
    accounts:
      - id: "123456789012"
        email: acme-prod@acme.com
```




 