---
id: custom-resolver-with-iam-role
title: Custom Resolver with an IAM Role
description: An example demonstrating how to implement a custom parameter resolver that utilizes IAM role.
keywords:
  - Examples
  - IAM
  - Takomo
---

This example demonstrates how to implement a custom resolver that utilizes an IAM role to access a stack in another account and read value from its outputs.

See the complete example at [GitHub](https://github.com/takomo-io/takomo-examples/tree/master/custom-resolvers/iam-roles).

## Files

The example consists of the following files:

```
.
├─ stacks
│  ├─ config.yml
│  └─ iam-roles-example
│     ├─ stack-01.yml
│     └─ stack-02.yml
├─ templates
│  ├─ stack-01.yml
│  └─ stack-02.yml
└─ resolvers
   └─ output-reader.js
```

## Stacks

There are two stacks of which the **stacks/iam-roles-example/stack-02.yml** is more interesting as it uses the custom resolver **output-reader**. The stack configuration looks like this:

```yaml title="stacks/stack-b.yml"
template: stack-02.yml
accountIds: "{{ env.ACCOUNT_2_ID }}"
commandRole: {{ env.ACCOUNT_2_ROLE }}
parameters:
  LogGroupName:
    resolver: output-reader
    role: {{ env.ACCOUNT_1_ROLE }}
    stackName: takomo-examples-iam-roles-example-stack-01
    outputName: LogGroupName
    region: eu-central-1
depends: /iam-roles-example/stack-01.yml
```

## Custom Resolver

The custom resolver needs values for properties **stackName**, **role**, **region**, and **outputName** to access the target stack and read the value from its output.

```javascript title="resolvers/output-reader.js"
const AWS = require("aws-sdk")


/**
 * Custom resolver that reads output from a stack.
 */
module.exports = {
  name: "output-reader",
  init: (props) => {
    console.log("Initialize resolver: output-reader");
    return {
      schema: (joi, schema) => {
        return schema.keys({
          stackName: joi.string().required(),
          role: joi.string().required(),
          region: joi.string().required(),
          outputName: joi.string().required(),
        })
      },
      resolve: async (input) => {
        input.logger.debug("Execute resolver: output-reader");

        const cp = await input.ctx.getCredentialProvider().createCredentialProviderForRole(props.role)

        const cf = new AWS.CloudFormation({
          region: props.region,
          credentials: await cp.getCredentials()
        })

        const { Stacks } = await cf.describeStacks({ StackName: props.stackName }).promise()

        if (Stacks.length !== 1) {
          throw new Error("Expected exactly one matching stacks but got " + Stacks.length)
        }

        const outputs = Stacks[0].Outputs.filter(o => o.OutputKey === props.outputName).map(o => o.OutputValue)
        if (outputs.length > 1) {
          throw new Error("Expected exactly one matching output but got " + outputs.length)
        }

        return outputs[0]
      }
    }
  }
}
```

## Environment Variables

This example uses the following environment variables:

- **ACCOUNT_1_ID** = An id of the first account
- **ACCOUNT_1_ROLE** = An IAM role ARN used to manage the first account
- **ACCOUNT_2_ID** = An id of the second account
- **ACCOUNT_2_ROLE** = An IAM role ARN used to manage the second account

You need to provide values for these variables before you can run the deploy or undeploy commands described below.

```
export ACCOUNT_1_ID={set the account id of your first account here}
export ACCOUNT_1_ROLE={set the IAM role ARN of your first account here}
export ACCOUNT_2_ID={set the account id of your second account here}
export ACCOUNT_2_ROLE={set the IAM role ARN of your second account here}
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
