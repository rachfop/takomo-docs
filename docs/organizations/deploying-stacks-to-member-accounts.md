---
id: deploying-stacks-to-member-accounts
title: Deploying Stacks to Member Accounts
---

When you have an organization with a number of member accounts you soon want to deploy some common infrastructure like VPCs and transit gateway routings across the accounts. To accomplish this, Takomo provides config sets that let you choose which stacks should be deployed and to which accounts. Config sets build on top of Takomo’s standard stack configuration and deployment features. 

## Configuring Stacks

You configure the stacks to be deployed to your organization’s member accounts the same way you would normally configure stacks with Takomo, i.e. you create stack groups, stack configurations and templates. If you are unfamiliar with how to do this, you might want to consult [the documentation](/docs/stacks/introduction) before moving on.

## Config Sets

Once you have your stacks configuration ready, you use config sets to specify which of the stacks should be deployed together. You can have multiple config sets and each config set can have one or more command paths that specify which stacks to deploy.

You define config sets with `configSets` property. It's an object where keys are config set names and values objects containing configuration for the corresponding config set. Each config set must have a `name` that is used to refer to it from other parts of the organization configuration, and a `description` to document its purpose. The command paths are specified with `commandPaths` key.

### Example: Defining config sets

Let's see how to use config sets to specify which stacks should be deployed together. 

We have the following directory structure:

```
.
├─ stacks
|  ├─ application
|  |  └- beanstalk-app.yml
|  ├─ networking
|  |  └- vpc.yml
|  └- logs
|     ├─ access-logs.yml
|     └- audit-logs.yml
└- organization
   └- organization.yml
```

For brevity, only the essential files are listed above. The stacks are grouped by their role - there are stacks for networking, logging and application.
 
Next, we defined some config sets in `organization.yml` file:
 
```yaml title="organization.yml"
configSets:
  baseNetwork:
    description: Create base networking config including a VPC
    commandPaths:
      - /networking
  commonLogs:
    description: Common logging resources
    commandPaths:
      - /logs
```

There is one config set for networking and another for logging. The former includes **/networking/vpc.yml** stack and the latter **/logs/access-logs.yml** and **/logs/audit-logs.yml**.

Note also that we didn't create a config set for application related stacks.

## Attaching Config Sets to Organizational Units and Member Accounts

Once you have the config sets thought out and configured, you need to determine to which member accounts you want to deploy them. You do this by attaching config sets to organizational units and member accounts. When you attach a config set to an organizational unit, it becomes attached to all accounts that belong to the organizational unit, and is also inherited by all child organizational units. 

### Example: Attaching config sets

Let's continue from the example above. We attach the config sets into our organization hierarchy as follows:

```yaml title="organization.yml"
organizationalUnits:
  Root:
    configSets:
      - logging
  Root/Application:
    configSets:
      - baseNetwork
    accounts:
      - "111111111111"
      - "888888888888"
  Root/Sandbox:
    accounts:
      - "222222222222"
```

We attached **logging** config set to **Root** organizational unit from where it's inherited by all organizational units and member accounts. Our second config set **baseNetwork** we attach to **Root/Application** organizational unit from where it's inherited by the accounts **111111111111** and **888888888888**, but not by **222222222222**.

## Setting Deployment Role

When config sets are deployed to member accounts, Takomo assumes a role from each account and uses that for deployment. By default, Takomo attempts to assume a role named **OrganizationAccountAccessRole** which is the default role created for each account when the account is itself created and added to the organization.

You can also provide a custom deployment role. The custom deployment role name can be specified in many places within the organization configuration. When config sets are deployed to a member account, the deployment role is looked in the following order:

1. `accountAdminRoleName` key under the current account
2. `accountAdminRoleName` key under the current organizational unit
3. `accountAdminRoleName` key at the top-level of the organization configuration
4. `accountCreation.defaults.roleName` key in the account creation configuration 

If none of the above is defined, the default role name **OrganizationAccountAccessRole** is used.

It's important to notice that the role name must not be a full IAM role ARN.

### Example: Setting the deployment role

Here are all the places where you can set the deployment role.

```yaml title="organization.yml"
accountCreation:
  defaults:
    roleName: MyRole

accountAdminRoleName: FooBar

organizationalUnits:
  Root:
    accountAdminRoleName: AnotherRole
    accounts:
      - id: "111111111111"
        accountAdminRoleName: YetAnotherRole
```

## Using Variables

You can define variables that will be passed to stacks when config sets are deployed. Variables can be defined at the top-level of the organization configuration, and under organizational units and accounts.

Organizational units inherit and can override variables from the top-level, and accounts, in turn, inherit and can override variables from the organizational unit they belong to.

### Example: Defining Variables

Here's an example how to defined variables.

```yaml title="organization.yml"
vars:
  settings:
    debug: true
    logLevel: info
  region: eu-west-1

organizationalUnits:
  Root:
    vars:
      settings:
        debug: false
    accounts:
      - id: "111111111111"
        vars:
          foo: bar
          vpcCidr: 10.0.0.0/22
```

Variables for account **111111111111** look like this:

```
vars:
  settings:
    debug: false
    logLevel: info
  region: eu-west-1
  foo: bar  
  vpcCidr: 10.0.0.0/22
```

These variables are then available in stack configuration files and could be used like so:

```yaml
regions: {{ var.region }}
parameters:
  EnabledDebug: {{ var.settings.debug }}
  LogLevel: {{ var.settings.logLevel }}
  Cidr: {{ var.vpcCidr }}
data:
  foo: {{ var.foo }}
```

## Controlling Deployment Order

When the config sets are deployed, the organization hierarchy is traversed recursively starting from the Root organizational unit. By default, the child organizational units are sorted by their name. For each organizational unit, the accounts that belong to it are processed one at a time, in the order they are defined, and stacks specified by the config sets attached to the account are deployed. 

You can use `priority` property to control the order organizational unit's children are processed. It accepts a number that is used to sort the children to ascending order. Organizational units without `priority` are sorted by their name and processed after the ones with `priority` set.

### Example: Setting organizational unit priority

Because **Root/Website** has its priority set, the organizational units are processed in this order: Root, Root/Website, Root/Application. Otherwise the order would be Root, Root/Application, Root/Website.

```yaml title="organization.yml"
organizationalUnits:
  Root:
    configSets:
      - foobar
  Root/Application: {}
  Root/Website:
    priority: 1
```

## Excluding Member Accounts from Deployment

Sometimes you might want to exclude some member accounts from deployment. You can exclude an account from deployment by setting its `status` to `disabled`. You can also exclude a whole organizational unit and all its children by setting the organizational unit `status` to `disabled`. 

### Example: Excluding member accounts

In this example, we have disabled organization unit **Root/Environments/Dev** which prevents deployment to its accounts **111111111111** and **222222222222**. We have also disabled account **444444444444**.

```yaml title="organization.yml"
organizationalUnits:
  Root:
    configSets:
      - foobar
  Root/Environments/Dev:
    status: disabled
    accounts:
      - "111111111111"
      - "222222222222"
  Root/Environments/Prod:
    accounts:
      - "333333333333"
      - id: "444444444444"
        status: disabled
```

## Command Line Usage

The config sets are deployed to member accounts with [deploy accounts](/docs/command-line-usage/organization-accounts#deploy-accounts) command.

```
tkm org accounts deploy
```

The config sets are undeployed, i.e. the stacks defined in the config sets are removed, with [undeploy accounts](/docs/command-line-usage/organization-accounts#undeploy-accounts) command.

```
tkm org accounts undeploy
```

Both commands lets you review the deployment plan and decide whether you want to proceed with the deployment.

## See Also

- [Command line usage > Deploy accounts](/docs/command-line-usage/organization-accounts#deploy-accounts)
- [Command line usage > Undeploy accounts](/docs/command-line-usage/organization-accounts#undeploy-accounts)
