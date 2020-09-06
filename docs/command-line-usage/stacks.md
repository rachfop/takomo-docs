---
id: stacks
title: Stacks
description: CLI commands to manage CloudFormation stacks
keywords:
  - Takomo
  - CLI
---

Commands to manage stacks:

- [Deploy stacks](#deploy-stacks)
- [Undeploy stacks](#undeploy-stacks)
- [List stacks](#list-stacks)

## Deploy Stacks

Deploy stacks within the given command path. Also stacks outside the command path that are dependencies to the stacks within the command path are deployed. Stacks are sorted in deployment order by stack dependencies so that any given stack is deployed only after its dependencies have been successfully deployed. Stacks are deployed in parallel when possible.

### Usage

```
tkm stacks deploy [command path] \
  [--ignore-dependencies] \
  [--interactive|-i]
```

### Ignoring Dependencies

By default, when a stack is deployed, its dependencies are deployed first, and then the stack itself. In some exceptional cases, you might want to deploy just one stack and skip its dependencies. You can use `--ignore-dependencies` option to accomplish this.

Bear in mind that this option is supported only when exactly one stack is deployed. Ignoring dependencies may lead into unexpected results, so you should use this option only in exceptional circumstances

### Using Autocomplete to Choose The Command Path

When running the deploy command from your local machine, you can use `--interactive` or `-i` option to use autocompleting search to choose the command path.

### Examples

Deploy all stacks:

```
tkm stacks deploy
```

Deploy stacks within the given command path:

```
tkm stacks deploy /prod
```

Deploy only **/dev/vpc.yml** stack and its dependencies:

```
tkm stacks deploy /dev/vpc.yml
```

The region part must be specified if the stack has more than one region and you want to deploy it to only one region.

```
tkm stacks deploy /dev/vpc.yml/eu-west-1
```

Deploy exactly one stack and skip its dependencies:

```
tkm stacks deploy /cloudtrail.yml --ignore-dependencies
```

## Undeploy Stacks

Undeploy stacks within the given command path. Also stacks outside the command path that depend on the stacks within the command path are undeployed. Stacks are sorted in undeployment order by stack dependencies so that any given stack is undeployed only after its dependants have been successfully undeployed. Stacks are undeployed in parallel when possible.

### Usage

```
tkm stacks undeploy [command path] \
  [--ignore-dependencies] \
  [--interactive|-i]
```

### Ignoring Dependencies

By default, when a stack is undeployed, its dependants are undeployed first, and then the stack itself. In some exceptional cases, you might want to undeploy just one stack and skip its dependants. You can use `--ignore-dependencies` option to accomplish this.

Bear in mind that this option is supported only when exactly one stack is undeployed. Ignoring dependencies may lead into unexpected results, so you should use this option only in exceptional circumstances

### Using Autocomplete to Choose The Command Path

When running the undeploy command from your local machine, you can use `--interactive` or `-i` option to use autocompleting search to choose the command path.

### Examples

Undeploy all stacks:

```
tkm stacks undeploy
```

Undeploy within the given command path:

```
tkm stacks undeploy /dev
```

Undeploy only **/dev/vpc.yml** stack and its dependants:

```
tkm stacks undeploy /dev/vpc.yml
```

The region part must be specified if the stack has more than one region and you want to undeploy it from only one region.

```
tkm stacks undeploy /dev/vpc.yml/eu-west-1
```

Undeploy exactly one stack and skip its dependants:

```
tkm stacks undeploy /cloudtrail.yml --ignore-dependencies
```

## List Stacks

List stacks within the given command path.

### Usage

```
tkm stacks list [command path]
```

### Examples

List all stacks:

```
tkm stacks list
```

List stacks within the given command path:

```
tkm stacks list /prod
```
