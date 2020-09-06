---
id: stack-secrets
title: Stack Secrets
description: CLI commands to manage stack secrets
keywords:
  - Takomo
  - CLI
---

Commands to manage stack secrets:

- [List secrets](#list-secrets)
- [Diff secrets](#diff-secrets)
- [Sync secrets](#sync-secrets)
- [Get secret](#get-secret)
- [Set secret](#set-secret)

## List Secrets

List secrets within the given command path.

### Usage

```
tkm stacks secrets list [command path]
```

### Examples

List all secrets:

```
tkm stacks secrets list
```

List secrets within the given command path:

```
tkm stacks secrets list /dev/eu-west-1
```

## Diff Secrets

Show differences between the secrets found from local configuration and what is persisted in
AWS Systems Manager Parameter Store from stacks within the given command path.

### Usage

```
tkm stacks secrets diff [command path]
```

### Examples

Diff all secrets:

```
tkm stacks secrets diff
```

Diff secrets within the given command path:

```
tkm stacks secrets diff /prod
```

## Sync Secrets

Synchronize secrets between the local configuration and what is persisted in
AWS Systems Manager Parameter Store from stacks within the given command path.

Sync will ask values for secrets missing from Parameter Store and remove secrets
from Parameter Store that are not found from the local stack config.

Requires user input and does not support `--yes` option.

### Usage

```
tkm stacks secrets sync [command path]
```

### Examples

Sync all secrets:

```
tkm stacks secrets sync
```

Sync secrets within the given command path:

```
tkm stacks secrets sync /prod
```

## Get Secret

Get value of a single secret.

### Usage

```
tkm stacks secrets get <stack path> <secret name>
```

### Examples

Get secret **password** configured in a stack with path **/dev/rds.yml**:

```
tkm stacks secrets get /dev/rds.yml password
```

## Set Secret

Set value of a single secret. Requires user input and does not support `--yes` option.

### Usage

```
tkm stacks secrets set <stack path> <secret name>
```

### Examples

Set value of secret **password** configured in stack with path **/dev/rds.yml**:

```
tkm stacks secrets set /dev/rds.yml password
```
