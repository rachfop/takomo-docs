---
id: parameter-resolvers
title: Parameter Resolvers
---

Parameter resolvers are used to get values for stack parameters at deployment time. Each parameter resolver has a name that can be used to refer to it from stack parameters configuration with `resolver` property.

Takomo logs parameter values when lower logging levels are used. When using parameter resolvers, you can prevent this by setting `confidential` property to `true`.

Each parameter resolver can have properties of their own.

## Built-in Parameter Resolvers

There are four built-in parameter resolvers:

- [Stack output](#stack-output)
- [External stack output](#external-stack-output)
- [Command](#command)
- [Secret](#secret)

### Stack Output

Stack output resolver reads the parameter value from a stack output of another stack configured within the same Takomo project. The stack from where the output is read is referred as the source stack, and the stack that is using the resolver is referred as the target stack.

The source stack automatically becomes the target stack's dependency.

The output value is read using credentials associated with the source stack.

If you need to read outputs of stacks that are not configured in the same Takomo project, you can use the [external stack output resolver](#external-stack-output).

#### Properties

Here are the properties available for `stack-output` resolver.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver | yes | string | Resolver name, this must be **stack-output**. |
| stack    | yes | string | Stack path of the source stack. |
| output   | yes | string | Name of the stack output whose value is read. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to `false` |

#### Example

Say, we have two stacks: **vpc.yml** and **security-groups.yml**. The former creates a VPC and exposes its id in the stack outputs with a name **VpcId**, and the latter uses the VPC id to create some security groups.

The directory structure looks like this:

```
.
├─ stacks
│  ├- vpc.yml
│  └─ security-groups.yml
└- templates
   ├- vpc.yml
   └─ security-groups.yml
```

In `security-groups.yml` stack configuration we use the `stack-output` resolver to read the value for the **VpcId** parameter like so:

```yaml title="stacks/security-groups.yml"
parameters:
  VpcId:
    resolver: stack-output
    stack: /vpc.yml
    output: MyVpcId
```

### External stack output

External stack output resolver reads the parameter value from a stack output of a stack. The stack from where the output is read is referred as the source stack, and the stack that is using the resolver is referred as the target stack.

The source stack does not have to be configured within the same Takomo project with the target stack.

#### Properties

Here are the properties available for `external-stack-output` resolver.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver    | yes | string | Resolver name, this must be **external-stack-output**. |
| stack       | yes | string | Name of the source stack. |
| output      | yes | string | Name of the stack output whose value is read. |
| region      | no  | string | Region of the source stack. Region is optional. By default, the region of the target stack is used. |
| commandRole | no  | string | IAM role used to access the stack output. Command role is optional. By default, credentials associated with the target stack are used. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to `false` |

#### Example

Say, we have two accounts: **123456789012** and **888888888888**.

The account **123456789012** has one stack: **src-bucket**. It is located in the **us-east-1** region and exposes name of an application sources bucket in a stack output named **SrcBucketName**. The **123456789012** account also has a read-only role that the **888888888888** account can assume.

The **888888888888** account has two stacks: **assets-bucket** and **build-infra**. The stacks are located in the **us-east-1** and **eu-west-1** regions, respectively. The **assets-bucket** stack exposes name of an assets bucket in a stack output named **AssetsBucket**.

Only the **build-infra** stack is managed in our Takomo project. The two other stacks are configured elsewhere. The **build-infra** stack has two parameters: **SrcBucket** and **AssetsBucket**. To get the values for them, we use the `external-stack-output` resolver to read the outputs from the two other stacks.

The directory structure looks like this:

```
.
├─ stacks
│  └- build-infra.yml
└- templates
   └─ build-infra.yml
```

The configuration of **build-infra** stack looks like this:

```yanl title="stacks/build-infra.yml"
regions: us-east-1
parameters:
  SrcBucket:
    resolver: external-stack-output
    stack: src-bucket
    output: SrcBucketName
    commandRole: arn:aws:iam::123456789012:role/read-only
  AssetsBucket:
    resolver: external-stack-output
    stack: assets-bucket
    output: AssetsBucketName
    region: eu-west-1
```

For the **SrcBucket** parameter, we need to specify the `commandRole` property because the source stack is located in a different account. We don't need to specify the `region` because the both stacks are located in the same region.

For the **AssetsBucket** parameter, we must specify the `region` but not the `commandRole` because the stacks are located in the same account but in different regions.

### Secret

Secret resolver reads value from a stack secret configured within the same Takomo project. The stack that defines the secret is referred as the source stack, and the stack that is using the resolver is referred as the target stack.

The source stack automatically becomes the target stack's dependency.

The secret value is read using credentials associated with the source stack.

#### Properties

Here are the properties available for `secret` resolver.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver | yes | string | Resolver name, this must be **secret**. |
| stack    | yes | string | Stack path of the source stack.  |
| secret   | yes | string | Name of the secret. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to `false` |

### Command

Command resolver reads value from output of a shell command.

#### Properties

Here are the properties available for `command` resolver.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver | yes | string | Resolver name, this must be **cmd**. |
| command  | yes | string | Shell command to execute. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to `false` |

## Implementing Custom Parameter Resolvers

You can provide your own custom parameter resolvers by placing plain JavaScript files, with `.js` file extension, into `resolvers` directory. Each file must export a [parameter resolver provider](#parameter-resolver-provider) object that is used to initialize the actual parameter resolver. You can use all language features available in Node 14.4.0.

### Parameter Resolver Provider

Parameter resolver provider has the following properties:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| name   | yes | string or function | Name of the resolver used to refer to the resolver from stack configuration files. Can be either a string or a function that returns a string. The function must not be asynchronous. |
| init   | yes | function | A function that initializes the resolver with properties given in a stack configuration file. The function can be either normal or async, and must return an instantiated [parameter resolver](#parameter-resolver) object. |
| schema | no  | function | An optional function that returns a [Joi](https://hapi.dev/module/joi/) schema that is used to validate configuration provided for the resolver from stack configuration files.<br/><br/>It takes two arguments: [Joi instance](https://hapi.dev/module/joi/api/?v=17.1.1) and [Joi object schema](https://hapi.dev/module/joi/api/?v=17.1.1#object). The former can be used to create new validation constraints and the latter is a pre-initialized object schema that you can modify to provide the validation schema for your resolver.<br/><br/>You can return the pre-initialized schema from the schema function, or you can use the Joi root instance to create a completely new schema |

### Parameter Resolver

Parameter resolver has the following properties:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolve | yes | function | A function that resolves the actual parameter value. The resolved value can be of any type, and is converted to a string before it is passed to CloudFormation. If the value is an array, it is converted to a string by joining its values with comma.<br/><br/>The resolve function is invoked with a single argument that contains the following properties:<br/><br/><ul><li>ctx - Command context object </li><li>stack - The current stack</li><li>parameterName - The name of the parameter whose value is being resolved</li><li>listParameterIndex - If the parameter is of type `List<>` or `CommaDelimitedList`, this will hold the index of the value in the list</li><li>logger - Logger object for logging</li></ul>|
| confidential | no  | boolean or function  | A boolean or a synchronous function that returns a boolean value determining if the resolved parameter value should be concealed from log messages. Defaults to `false`. The `confidential` property in a stack configuration file takes precedence over this value. |
| dependencies | no  | string[] or function | A list of stack paths or a synchronous function that returns a list of stack paths of the stacks that the resolver depends on. Defaults to an empty list. |
| iamRoleArns | no  | string[] or function | A list of IAM role ARNs or a synchronous function that returns a list of IAM role ARNs needed to resolve the value. Defaults to an empty list. |

### Example

A custom parameter resolver that converts the value given in the parameter resolver configuration to uppercase. The parameter resolver schema requires that in the stack configuration file where the resolver is used, the resolver configuration must contain a value property of type string, and that its value must not have more than 50 characters.

Our file structure looks like this:

```
.
├─ stacks
|  └- my-stack.yml
├- resolvers
|  └- uppercase.js
└- templates
   └- my-stack.yml
```

The parameter resolver provider defined in `resolvers/uppercase.js` looks like this:

```javascript title="resolvers/uppercase.js"
module.exports = {
  name: "uppercase",
  schema: (joi, schema) => {
    return schema.keys({
      value: joi.string().max(50).required()
    })
  },
  init: (props) => {
    return {
      confidential: true,
      dependencies: () => [],
      iamRoleArns: [],
      resolve: (input) => {
        input.logger.debug("Execute uppercase!");
        input.logger.debug(`Resolve value for parameter '${input.parameterName}'`);
        return props.value.toUpperCase();
      }
    }
  }
};
```

Our custom parameter resolver is used in the stack configuration like so:

```yaml title="stacks/my-stack.yml"
parameters:
  MyParameter:
    resolver: uppercase
    value: hello
```

When the stack is deployed, the value for **MyParameter** parameter is resolved using **uppercase** custom parameter resolver. The actual value that is assigned to the parameter is **"HELLO"**.
