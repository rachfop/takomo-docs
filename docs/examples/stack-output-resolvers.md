---
id: stack-output-resolvers
title: Stack Output Resolvers
---

This example demonstrates how to use [stack output resolver](/docs/stacks/parameter-resolvers#stack-output) to read outputs from one stack and use them as input parameters in another stack.

When the example is deployed, the custom resolvers are used to resolve values
for the stack parameters.

See the complete example at [GitHub](https://github.com/takomo-io/takomo-examples/tree/master/stack-output-resolvers).

## Files

The example consists of the following files:

```
.
├─ stacks
│  ├- security-groups.yml
│  └- vpc.yml
└─ templates
   ├- security-groups.yml
   └- vpc.yml
```

## Stacks

There are two stacks: `vpc.yml` and `security-groups.yml`. The former creates a VPC and the latter takes the VPC's id as a parameter and uses it to create a security group.

### vpc.yml

The template of `vpc.yml` stack contains the VPC resource whose id is exposed through stack outputs:

```yaml title="stacks/vpc.yml"
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/24
Outputs:
  VpcId:
    Description: VPC id
    Value: !Ref VPC
```

### security-groups.yml

The configuration file of `security-groups.yml` stack uses `stack-output` resolver to read the value for the `VpcId` parameter:

```yaml title="stacks/security-groups.yml"
parameters:
  VpcId:
    resolver: stack-output
    stack: /vpc.yml
    output: VpcId
```

## Deploy Stacks

To deploy the example stacks, run command:

```bash
tkm stacks deploy
```

## Remove Stacks

To remove the created stacks, run command:

```bash
tkm stacks undeploy
```

## See Also

Find more information from the documentation:

- [Stack Output Resolver](/docs/stacks/parameter-resolvers#stack-output)
- [Configuring Resolvers](/docs/config-reference/stacks#parameters)
