---
id: simple-custom-resolvers
title: Simple Custom Resolvers
---

This example shows how to implement your own custom resolvers with JavaScript.

When the example is deployed, the custom resolvers are used to resolve values for the stack parameters.

See the complete example at [GitHub](https://github.com/takomo-io/takomo-examples/tree/master/custom-resolvers/simple).

## Files

The example consists of the following files:

```
.
├─ stacks
│  └─ stack.yml
├─ templates
│  └─ stack.yml
└─ resolvers
   ├─ timestamp.js
   └─ uppercase.js
```

## Stacks

There is a single stack whose configuration is given in **stacks/stack.yml** file with
the following contents:

```yaml title="stacks/stack.yml"
parameters:
  Timestamp:
    resolver: timestamp
  Name:
    resolver: uppercase
    name: MyLogGroup
```

The stack has two parameters: **Timestamp** and **Name**. Values for the parameters are resolved
using custom resolvers.

## Custom Resolvers

The two custom resolvers, **timestamp** and **uppercase**, are implemented in their own JavaScript files
located in the **resolvers** dir.

In an implementation file, a provider object must be exported. The provider object has **name** which
is used to refer to the resolver in stack configuration files using **resolver** property, and **init**
function that is used to initialize and return the resolver object. Finally, when the stack is deployed,
the actual parameter value is resolved using **resolve** function of the resolver object. For the other
properties, see [custom resolvers documentation](/docs/stacks/parameter-resolvers#implementing-custom-parameter-resolvers).

### timestamp

The **timestamp** resolver returns the current timestamp.

```javascript
module.exports = {
  name: "timestamp",
  init: (props) => {
    return {
      resolve: (input) => {
        return Date.now();
      },
    };
  },
};
```

### uppercase

The **uppercase** resolver converts the given **name** property value to uppercase.

```javascript
module.exports = {
  name: "uppercase",
  init: (props) => {
    return {
      confidential: true,
      resolve: (input) => {
        return props.name.toUpperCase();
      },
    };
  },
};
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
