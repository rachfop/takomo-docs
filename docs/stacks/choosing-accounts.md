---
id: choosing-accounts
title: Choosing Accounts
description: Choosing AWS accounts where to deploy stacks
keywords:
  - Takomo
  - accounts
  - deploy
  - stack
---

The account where stacks get deployed is dictated by the AWS credentials available in the current terminal session. We call these credentials **the default credentials**.

If you want to deploy stacks to a different account, you can specify an IAM role that Takomo should assume using the default credentials and then use the assumed IAM role to deploy the stacks to the account where the role is bound. We call this role **the command role** and you can specify it with `commandRole` property, which accepts an IAM role ARN.

In addition to deploying the stack, the command role is also used to perform all other operations targeting the stack, including describing and removing the stack.

#### Example: Specifying the Command Role

```yaml
commandRole: arn:aws:iam::123456789012:role/deployer-role
```

## Principle of Least Privilege

It's a best practice always to use credentials that grant only permissions needed to get the job done. In Takomo's context, this means permissions required to deploy the stack and resources defined within it. To achieve this, you first create an IAM role with limited privileges and then use `commandRole` property to instruct Takomo to use the role when managing the stack.

## Specifying Allowed Accounts

Working simultaneously with multiple accounts usually requires switching between many credentials or IAM roles, and this poses a real risk of accidentally deploying infrastructure to a wrong account. This risk can be mitigated with `accountIds` property, which defines a list of accounts where the stack can be deployed. It accepts a single account id or a list of account ids.

#### Examples: Restricting Allowed Accounts

Setting a single allowed account:

```yaml
accountIds: "123456789012"
```

Setting multiple allowed accounts:

```yaml
accountIds:
  - "876272828282"
  - "763273627326"
```
## See Also

- [commandRole property in config reference](/docs/config-reference/stacks#commandRole)
- [accountIds property in config reference](/docs/config-reference/stacks#accountIds)