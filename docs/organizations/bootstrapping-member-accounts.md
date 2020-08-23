---
id: bootstrapping-member-accounts
title: Bootstrapping Member Accounts
description: Bootstrapping organization member accounts
keywords:
  - Takomo
  - organization
---

It’s best practice to follow the principle of least privilege when deploying configuration to organization accounts. To achieve this, you should create an account administrator role with restricted permissions and use it to deploy configuration. Now, the next question is, how to create this restricted role in the first place?

## Bootstrap Configuration

You can have separate bootstrap configuration that creates the restricted role and other resources that are needed to deploy the rest of the configuration with scoped down permissions.
 
Bootstrap configuration is defined using config sets but attached to organizational units and accounts with `bootstrapConfigSets` property. 

### Example: Attaching bootstrap config sets

Here's how you could define and attach bootstrap config sets:

```yaml title="organization.yml"
organizationalUnits:
  Root/Application:
    bootstrapConfigSets:
      - bootstrap
    accounts:
      - "111111111111"
      - "888888888888"
  Root/Sandbox:
    accounts:
      - id: "222222222222"
        bootstrapConfigSets: anotherBootstrap

configSets:
  bootstrap:
    description: Create deployer role with restricted permissions
    commandPaths:
      /bootstrap
  anotherBootstrap:
    description: Create another deployer role with restricted permissions
    commandPaths:
      /another-bootstrap
```

You use accountBootstrapRoleName to specify which role to use to deploy the bootstrap configuration.


## Setting Bootstrap Role

Just like with the regular config sets, when the bootstrap config sets are deployed to member accounts, Takomo assumes a role from each account and uses that for deployment. By default, Takomo attempts to assume a role named **OrganizationAccountAccessRole** which is the default role created for each account when the account is itself created and added to the organization.

You can also provide a custom bootstrap role. The custom bootstrap role name can be specifiedin many places within the organization configuration. When bootstrap config sets are deployed to a member account, the bootstrap role is looked in the following order:

1. `accountBootstrapRoleName` key under the current account
2. `accountBootstrapRoleName` key under the current organizational unit
3. `accountBootstrapRoleName` key at the top-level of the organization configuration
4. `accountCreation.defaults.roleName` key in the account creation configuration 

If none of the above is defined, the default role name **OrganizationAccountAccessRole** is used.

It's important to notice that the role name must not be a full IAM role ARN.

### Example: Setting the bootstrap role

Here are all the places where you can set the bootstrap role.

```yaml title="organization.yml"
accountCreation:
  defaults:
    roleName: MyRole

accountBootstrapRoleName: MyBootstrapRole

organizationalUnits:
  Root:
    accountBootstrapRoleName: AnotherBootstrapRole
    accounts:
      - id: "111111111111"
        accountBootstrapRoleName: YetAnotherBootstrapRole
```

## Command Line Usage

The bootstrap config sets are deployed using [bootstrap accounts](/docs/command-line-usage/organization-accounts#bootstrap-accounts) command.

```
tkm org accounts bootstrap
```

The bootstrap configs are removed using [teardown accounts](/docs/command-line-usage/organization-accounts#tear-down-accounts) command.

```
tkm org accounts teardown
```

Both commands lets you review the deployment plan and decide whether you want to proceed with the deployment.

## See Also

- [Command line usage > Bootstrap accounts](/docs/command-line-usage/organization-accounts#bootstrap-accounts)
- [Command line usage > Teardown accounts](/docs/command-line-usage/organization-accounts#teardown-accounts)
