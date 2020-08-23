---
id: deploying-stacks
title: Deploying Stacks
description: Deploying stacks
keywords:
  - Takomo
  - stacks
  - deploy
---

CloudFormation stacks described in the local configuration are managed with CLI commands. All commands first load the local configuration and then compare it to the current AWS infrastructure state in order to build an execution plan. The plan can then be reviewed to see what changes are to be executed.

## Creating and Updating Stacks

The deploy stacks command creates new stacks and updates existing stacks. Locally configured stacks that are found from the target account are updated, and stacks that do not have an existing counterpart, are created. Stacks that exist in the target account but are not found from the local configuration are not touched.

It is possible to deploy all stacks, just a single stack, or only stacks that belong under a specified stack group.

The stacks are deployed in order that ensures that if a stack has dependencies, those are deployed first, and only then the dependent stack itself. The stacks are also deployed in parallel when possible.

#### Examples

Deploy all stacks:

```
tkm stacks deploy
```

Deploy stacks within the given command path:

```
tkm stacks deploy /prod
```

Deploy only /dev/vpc.yml stack and its dependencies:

```
tkm stacks deploy /dev/vpc.yml
```

## Removing Stacks

Undeploy stacks command is the counterpart of the deploy stacks command, and removes existing stacks. Locally configured stacks that are found from the target account are removed. Stacks that exist in the target account but are not found from the local configuration are not touched.

It is possible to undeploy all stacks, just a single stack, or only stacks that belong under a specified stack group.

The stacks are undeployed in order that ensures that if a stack has dependents, those are undeployed first, and only then the stack itself. The stacks are also undeployed in parallel when possible.

#### Examples

Undeploy all stacks:

```
tkm stacks undeploy
```

Undeploy within the given command path:

```
tkm stacks undeploy /dev
```

Undeploy only /dev/vpc.yml stack and its dependants:

```
tkm stacks undeploy /dev/vpc.yml
```

## See Also

Commands are documented in detail in command line usage.

- [Command line usage > Deploy stacks](/docs/command-line-usage/stacks#deploy-stacks)
- [Command line usage > Undeploy stacks](/docs/command-line-usage/stacks#undeploy-stacks)
