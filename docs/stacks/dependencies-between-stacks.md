---
id: dependencies-between-stacks
title: Dependencies Between Stacks
description: Specifying dependencies between stacks
keywords:
  - Takomo
  - dependencies
  - stacks
---

It’s a good practice to split the infrastructure into multiple stacks that group related resources together. Naturally, there will be dependencies between the stacks, for example, one stack creates a VPC with subnets, and another stack creates some resources into those subnets. This means that the stacks need to be created and updated in a certain order to ensure that the dependencies can be satisfied, for example, the subnets need to be ready before other resources can be created to them. This order is reversed when the stacks are deleted.

When CLI commands are run, Takomo first builds a plan that contains run order for the stacks and then executes required operations in that order and in parallel when possible.  

## Defining Dependencies

You can use `depends` property to explicitly specify dependencies for a stack by providing a single command path or a list of command paths. Dependencies can span multiple accounts and regions as long as there are no circular dependencies.

#### Examples

A single dependency:

```yaml
depends: /dev/vpc.yml
```

A single dependency including the region specifier:

```yaml
depends: /dev/vpc.yml/eu-west-1
```

Multiple dependencies:

```yaml
depends:
  - /dev/vpc.yml
  - /dev/security-groups.yml
```

## Dependencies from Parameter Resolvers

Parameter resolvers can also introduce dependencies between stacks. A good example is [stack-output parameter resolver](/docs/stacks/parameter-resolvers#stack-output) that reads value from stack output and then passes it as input parameter for another stack. When a parameter resolver creates the dependency between stacks, there's no need to specify it using `depends` property.

## See Also

- [depends property in config reference](/docs/config-reference/stacks#depends)