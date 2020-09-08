---
id: custom-resolver-with-stack-dependencies
title: Custom Resolver with Stack Dependencies
description: An example demonstrating how to implement a custom parameter resolver that utilizes stack dependencies.
keywords:
  - Examples
  - Dependencies
  - Takomo
---

This example demonstrates how to implement a custom resolver that depends on other stacks.

When the example is deployed, the custom resolver is used to read the creation time from the other stack and use it as stack input parameter value.

See the complete example at [GitHub](https://github.com/takomo-io/takomo-examples/tree/master/custom-resolvers/stack-dependencies).

## Files

The example consists of the following files:

```
.
├─ stacks
│  ├─ config.yml
│  ├─ stack-a.yml
│  └─ stack-b.yml
├─ templates
│  ├─ stack-a.yml
│  └─ stack-b.yml
└─ resolvers
   └─ stack-creation-time.js
```

## Stacks

There are two stacks of which the **stacks/stack-b.yml** is more interesting as it uses the custom resolver **stack-creation-time**. The stack configuration looks like this:

```yaml title="stacks/stack-b.yml"
name: resolvers-with-dependencies-b
parameters:
  LogGroupName:
    resolver: stack-creation-time
    otherStack: /stack-a.yml
```

## Custom Resolver

The custom resolver takes the stack path of a stack in **otherStack** property and uses it to query the stack's creation time. The given stack path is also assigned to the resolver's dependencies property, making the stack a dependency of the stack where the resolver is used.

```javascript title="resolvers/stack-creation-time.js"
module.exports = {
  name: "stack-creation-time",
  init: (props) => {
    console.log("Initialize resolver: stack-creation-time");
    return {
      dependencies: [props.otherStack],
      schema: (joi, schema) => {
        return schema.keys({
          otherStack: joi.string().required()
        })
      },
      resolve: async (input) => {
        input.logger.debug("Execute resolver: stack-creation-time");

        const stacks = input.ctx.getStacksByPath(props.otherStack)
        if (stacks.length > 1) {
          throw new Error("Expected exactly one matching stacks but got " + (rest.length + 1))
        }

        const [ stack ] = stacks

        const client = await stack.getCloudFormationClient().getAwsClient()
        const { Stacks } = await client.describeStacks({ StackName: stack.getName() }).promise()
        if (Stacks.length !== 1) {
          throw new Error("Expected exactly one matching stacks but got " + Stacks.length)
        }

        const creationTime = Stacks[0].CreationTime

        input.logger.debug(`Resolved value for parameter '${creationTime}'`)
        return creationTime.getTime()
      }
    }
  }
}
```

## Deploy Stacks

To deploy the example stack, run command:

```
tkm stacks deploy
```

## Remove Stacks

To remove the created stack, run command:

```
tkm stacks undeploy
```

## See Also

Find more information from the documentation:

- [Custom Parameter Resolvers](/docs/stacks/parameter-resolvers#implementing-custom-parameter-resolvers)
- [Configuring Resolvers](/docs/config-reference/stacks#parameters)
