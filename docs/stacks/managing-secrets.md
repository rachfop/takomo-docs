---
id: managing-secrets
title: Managing Secrets
---

Managing secrets, such as database credentials and various authorization tokens, is a common problem that is quite hard to automate. Takomo offers one way to tackle this problem with stack secrets that are declared locally and persisted to AWS Systems Manager Parameter Store as encrypted parameters.

## Configuring Secrets

Secret configuration contains only name and description for the secrets, but the actual values are never stored to the local disk.

You use `secret` property to declare stack secrets. It's an object whose keys are secret names and values are objects containing descriptions for the corresponding secrets.

#### Example

We have a single stack defined in file **my-stack.yml** and our file structure looks like this:

```
.
└- stacks
   └- my-stack.yml
```

In the stack configuration we define two secrets named **privateKey** and **password**.

```yaml title="my-stack.yml"
secrets:
  privateKey:
    description: Some private key
  password:
    description: Password for RDS database
```

Note that you don't define values for the secrets in configuration files. 

## Command Line Usage

Values for secrets are managed using CLI commands. There are commands to get and set secrets values, list all secrets, view differences between the local secrets configuration and the secrets persisted in the parameter store, and to sync the local configuration to the parameter store.   

#### Examples

Let's continue from the example above where we defined the two secrets named **privateKey** and **password**.

List secrets defined in **my-stack.yml** stack:

```
tkm stacks secrets list /my-stack.yml
```

Set value to **password** secret:

```
tkm stacks secrets set /my-stack.yml password
```

Get value of **password** secret:

```
tkm stacks secrets get /my-stack.yml password
```

Show differences between locally configured secrets and the ones persisted into Parameter Store:

```
tkm stacks secrets diff /my-stack.yml
```

Sync the locally configured secrets to Parameter Store:

```
tkm stacks secrets sync /my-stack.yml
```





## How Secrets Are Stored

Secrets are always owned by the declaring stack and when the stack is deleted, so are the secrets it declared. Secrets are stored to the Parameter Store with stack's secrets path which is generated from the stack path using the following formula:

1. Append a forward slash to the stack path
2. If the `project` property is defined, prepend it with a forward slash

For example, if the stack path is `/dev/rds.yml/eu-west-1` and project is `example`, then the secrets path will be `/example/dev/rds.yml/eu-west-1/`. If the stack declares a secret named **myPassword**, it will be stored to the Parameter Store with name `/example/dev/rds.yml/eu-west-1/myPassword`.

This way, all the stack secrets are found from the Parameter Store under the same path prefix which enables Takomo to detect differences between the local configuration and the secrets stored in Parameter Store.

## See Also

- [Command line usage > Set secret](docs/command-line-usage/stack-secrets#set-secret)
- [Command line usage > Get secret](docs/command-line-usage/stack-secrets#get-secret)
- [Command line usage > Sync secrets](docs/command-line-usage/stack-secrets#sync-secrets)
- [Command line usage > Diff secrets](docs/command-line-usage/stack-secrets#diff-secrets)
- [Command line usage > List secrets](docs/command-line-usage/stack-secrets#list-secrets)