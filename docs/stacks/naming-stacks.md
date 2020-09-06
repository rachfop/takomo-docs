---
id: naming-stacks
title: Naming Stacks
description: Naming stacks
keywords:
  - Takomo
  - stacks
  - naming
---

Takomo uses stack names to identify which of the stacks defined in the local configuration are already deployed to the target accounts and can be updated, and which ones do not yet exist and need to be created.

You specify the name for a stack in its configuration file with the [name](/docs/config-reference/stacks#name) property. 

#### Example: Specify the Stack Name

```yaml
name: my-application-stack
```

## Stack Names Are Optional

The name is optional, and if omitted, is generated using the following logic:

1. Start with the relative file path to the stack configuration file from the stacks directory
2. Remove the file extension
3. Replace all forward slashes with hyphens
4. If the [project](/docs/config-reference/stacks#project) property is defined, prepend it to the name with a hyphen  

#### Example: Generated Stack Name

Say, our project's file structure looks like this:

```
.
└─ stacks
   └- dev
      └- webapp
         └- application.yml
```

There's a single stack whose configuration is given in **application.yml**. Let's assume that there is no **name** property defined in this file. Then, based on the logic presented above, the stack's generated name will be **dev-webapp-application**. 

## Stack Names Are Immutable

Once a stack is created, i.e., it exists in an AWS account, its name can’t be changed. If the name of an existing stack is changed in the local configuration, Takomo will use the new name to determine if the stack already exists in the target account. The existing stack, which was created with the old name, remains in the account and won’t be managed by Takomo anymore. 

## See Also

- [Config reference > name property](/docs/config-reference/stacks#name)
- [Config reference > project property](/docs/config-reference/stacks#project)