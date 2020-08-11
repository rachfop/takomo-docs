---
id: secrets
title: Secrets
---

Managing secrets, such as database credentials and various authorization tokens, is a common problem that is quite hard to automate. Takomo offers one way to tackle this problem with stack secrets that are declared locally and persisted to AWS Systems Manager Parameter Store as encrypted parameters. Secret configuration contains only name and description for the secrets, but the actual values are never stored to the local disk.

You use `secret` property to declare stack secrets. It's an object whose keys are secret names and values are objects containing descriptions for the corresponding secrets.

The secrets are managed with CLI commands and can be referred from the configuration of the declaring stack or from some other stack.

## How Secrets Are Stored

Secrets are always owned by the declaring stack and when the stack is deleted, so are the secrets it declared. Secrets are stored to the Parameter Store with stack's secrets path which is generated from the stack path using the following formula:

1. Append a forward slash to the stack path
2. If the `project` property is defined, prepend it with a forward slash

For example, if the stack path is `/dev/rds.yml/eu-west-1` and project is `example`, then the secrets path will be `/example/dev/rds.yml/eu-west-1/`. If the stack declares a secret named **myPassword**, it will be stored to the Parameter Store with name `/example/dev/rds.yml/eu-west-1/myPassword`.

This way, all the stack secrets are found from the Parameter Store under the same path prefix which enables Takomo to detect differences between the local configuration and the secrets stored in Parameter Store.

#### Examples

A single secret named password:

```yaml
secrets:
  password:
    description: Password for RDS database
```

Multiple secrets:

```yaml
secrets:
  privateKey:
    description: Some private key
  accessKey:
    description: Access key
```
