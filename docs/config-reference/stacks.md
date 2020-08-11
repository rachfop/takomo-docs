---
id: stacks
title: Stacks
---

This page describes properties available in stack configuration files.

### Available Properties

Here are the available properties: 

- [accountIds](#accountids)
- [capabilities](#capabilities)
- [commandRole](#commandrole)
- [data](#data)
- [depends](#depends)
- [hooks](#hooks)
- [ignore](#ignore)
- [name](#name)
- [parameters](#parameters)
- [project](#project)
- [regions](#regions)
- [secrets](#secrets)
- [tags](#tags)
- [template](#template)
- [templateBucket](#templatebucket)
- [timeout](#timeout)

### Property Documentation

Following information is documented for each property:

#### Type

Allowed type or types for the property value. Possible values: `string`, `number`, `boolean`, `object` or array of the aforementioned, e.g. `string[]`.

#### Required

Is the property required. Possible values: `yes`, `no`.

#### Default value

If no value is given for the property, this value will be used. If this is set as `computed`, then detailed information on how the default value is computed is found under the property's description.

#### Since

In which Takomo version the property was introduced. If omitted, then the property was introduced in Takomo 1.0.0.

#### Where to define

In which files the property can be defined.

Possible values:

- `stack group` - The property can be defined in a stack group configuration file
- `stack` - The property can be defined in a stack configuration file

#### Inherited

Is the value inherited from the parent stack group. Possible values: `yes`, `no`.

#### Overriding

If the value is inherited from the parent, how it can be overriden.

Possible values:

- `replace` - The value completely replaces the inherited value.
- `merge` - The value is merged with the inherited value.
- `no` - The inherited value can't be overridden.

#### Requirements

What requirements the property value must satisfy.

## accountIds

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`
- Where to define: `stack group`, `stack`
- Inherited: `yes`
- Overriding: `replace`
- Requirements:
  - Must be valid AWS account ids

List of allowed AWS accounts where a stack can be deployed.

### Examples

A single AWS account id:

```yaml
accountIds: "123456789012"
```

A list of AWS account ids:

```yaml
accountIds:
  - "876272828282"
  - "763273627326"
```

## capabilities

- Type: `string`, `string[]`
- Required: `no`
- Default value: `[CAPABILITY_IAM, CAPABILITY_NAMED_IAM, CAPABILITY_AUTO_EXPAND]`
- Where to define: `stack group`, `stack`
- Inherited: `yes`
- Overriding: `complete`
- Requirements:
  - Allowed values: `CAPABILITY_IAM`, `CAPABILITY_NAMED_IAM`, `CAPABILITY_AUTO_EXPAND`

Capabilities for the stack.

### Examples

A single capability:

```yaml
capabilities: CAPABILITY_IAM
```

A list of capabilities:

```yaml
capabilities:
  - CAPABILITY_IAM
  - CAPABILITY_NAMED_IAM
```

Disable all capabilities:

```yaml
capabilities: []
```

## commandRole

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Where to define: `stack group`, `stack`
- Inherited: `yes`
- Overriding: `replace`
- Requirements:
  - Must be a valid IAM role ARN

An IAM role used to execute commands for the stack. Determines the target AWS account.

### See also

- [Configuring AWS credentials](../guide/general/credentials.md)

### Examples

```yaml
commandRole: arn:aws:iam::123456789012:role/deployer-role
```

## data

- Type: `object`
- Required: `no`
- Default value: `undefined`
- Where to define: `stack group`, `stack`
- Inherited: `yes`
- Overriding: `merge`
- Requirements:
  - The value object keys must be of type `string`

Arbitrary data that can be referred in `.hbs` CloudFormation template files.

### See also

- [Templating](../guide/stacks/variables-and-templating.md)

### Examples

Say, we have the following custom data in a stack config:

```yaml
data:
  subnets:
    - subnet-ccbbb18ac981dc554e
    - subnet-969b3de3fa0a275d9b
    - subnet-7609598000b229fcb3
  environment:
    name: dev
    code: 123
```

Then, in an `.hbs` CloudFormation template file, we can refer to variables it defines like so:

```yaml
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      Tags:
        - Key: Environment
          Value: {{ stack.data.environment.name }}
        - Key: Code
          Value: {{ stack.data.environment.code }}
```

## depends

- Type: `string`, `string[]`
- Required: `no`
- Default value: `[]`
- Where to define: `stack`
- Inherited: `no`
- Overriding: `replace`
- Requirements:
  - Must be a valid `stack path`

A single `stack path` or a list of `stack paths` to stacks within the same Takomo project that the current stack depends on.

### Examples

A single dependency:

```yaml
depends: /dev/vpc.yml
```

A single dependency with region:

```yaml
depends: /dev/vpc.yml/eu-west-1
```

Multiple dependencies:

```yaml
depends:
  - /dev/vpc.yml
  - /dev/security-groups.yml
```

## hooks

- Type: `object[]`
- Required: `no`
- Default value: `[]`
- Inherited: `yes`
- Overriding: `merge`
- Where to define: `stack group`, `stack`

A list of hooks to be executed at different stages of deploy and undeploy commands. Configuration for each hook is given as an object with properties described below.

Hooks are executed in the order they are defined. If a hook fails, the stack operation is cancelled and deemed as failure.

Any hooks defined in a stack configuration are appended to the list of hooks inherited from the stack group configuration.

### Hook Configuration Object

Properties available in hook configuration. In addition to these standard properties, different hook types can have properties of their own.

#### hooks.name

- Type: `string`
- Required: `yes`

Name of the hook

#### hooks.type

- Type: `string`
- Required: `yes`

Type of the hook

#### hooks.operation

- Type: `string`, `string[]`
- Required: `no`

Stack operations during which the hook is executed. Accepts a single value or a list of values. If no `operation` is defined, the hook is executed on all operations.

Allowed values:

- `create` - A new stack is created
- `update` - An existing stack is updated
- `delete` - An existing stack is deleted

#### hooks.stage

- Type: `string`, `string[]`
- Required: `no`

Stack operation stages during which the hook is executed. Accepts a single value or a list of values. If no `stage` is defined, the hook is executed on all stages.

Allowed values:

- `before` - Hook is executed before the stack operation 
- `after` - Hook is executed after the stack operation

#### hooks.status

- Type: `string`, `string[]`
- Required: `no`

Stack operation statuses during which the hook is executed. Accepts a single value or a list of values. If no `status` is defined, the hook is executed on all statuses. `status` is available only when `stage`is `after`.

Allowed values:

- `success` - Stack operation was successful
- `failed` - Stack operation failed
- `cancelled` - Stack operation was cancelled
- `skipped` -  Stack operation was skipped

### See also

- [Hooks](../guide/stacks/hooks.md)
- [Implementing custom hooks](../guide/stacks/custom-hooks.md)

### Examples

A cmd hook that is executed after a successful stack creation:

```yaml
hooks:
  - name: executed-after-successful-create
    type: cmd
    operation: create
    stage: after
    status: success
    command: echo 'success'
```

A cmd hook that is executed after all create and update operations:

```yaml
hooks:
  - name: my-hook
    type: cmd
    operation:
      - create
      - update
    stage: after
    command: echo 'hello'
```

## ignore

- Type: `boolean`
- Required: `no`
- Default value: `false`
- Inherited: `yes`
- Overriding: `no`
- Where to define: `stack group`, `stack`

Ignore stack group or stack. If a stack group is ignored, all its stacks and children are also ignored. If a stack is ignored, its configuration is not loaded, effectively making it non-existing. Ignored stacks can't be deployed or referenced elsewhere in configuration, e.g. ignored stack can't be a dependency for other stacks.

### Examples

```yaml
ignore: true
```

## name

- Type: `string`
- Required: `no`
- Default value: `computed`
- Where to define: `stack`
- Inherited: `no`
- Overriding: `replace`
- Requirements:
  - Must match regex `^[a-zA-Z0-9][-a-zA-Z0-9]*$`
  - Minimum length 1
  - Maximum length 128

Name of the stack.

### Default value

If the `name` is not given, it is generated from the `stack path` and the `project` as follows:

1. Remove the starting slash
2. Remove the .yml file extension and everything after it
3. Replace remaining slashes with hyphens
4. If the `project` is defined, prepend it with a hyphen

For example, if the stack's `project` is `example` and `stack path` is
`/dev/vpc.yml/eu-west-1`, then the generated `name` is `example-dev-vpc`.

::: warning Changing the stack name
Changing the name will cause Takomo to look for the stack with the new name. As Takomo does not store the state anywhere, it can't know that the stack still exists with the old name.

If you need to change the name of an existing stack, you should first decide if you need to remove the old stack before or after changing the name in stack configuration file. Then use [stacks undeploy](../command-line-usage/stacks.md#undeploy-stacks) command to remove the old stack.
:::

### Examples

```yaml
name: rds-database
```

## parameters

- Type: `object`
- Required: `no`
- Default value: `undefined`
- Where to define: `stack`
- Inherited: `no`
- Overriding: `replace`
- Requirements:
  - Parameter name must be of type `string`
  - Parameter name must match regex `^[a-zA-Z0-9]*$`

Input parameters for the stack.

Parameters configuration is an object where keys are names for the parameters and values are configuration for the corresponding parameters. A parameter value can be a `string`, `number`, `boolean`, `object` or an array of the aforementioned types.

An `object` is used when the parameter value is resolved using a [parameter resolver](../guide/stacks/parameter-resolvers.md).

An array should be used when the template parameter is of type `CommaDelimitedList` or `List<>`.

### Parameter Configuration Object

Properties available when an `object` is used to configure a parameter. In addition to the standard properties described below, different parameter resolvers can have properties of their own.

#### parameters.&lt;name&gt;.resolver

- Type: `string`
- Required: `yes`

Name of parameter resolver used to resolve the value for the parameter.

#### parameters.&lt;name&gt;.confidential

- Type: `string`
- Required: `no`
- Default value: `false`

Boolean defining if the parameter value should be concealed from the logs.

### See also

- [Parameter resolvers](../guide/stacks/parameter-resolvers.md)
- [Implementing custom parameter resolvers](../guide/stacks/custom-parameter-resolvers.md)

### Examples

A simple parameter:

```yaml
parameters:
  VpcId: vpc-06e4ab6c6c
```

A list parameter:

```yaml
parameters:
  CidrBlocs:
    - 10.0.0.0/26
    - 10.0.0.64/26
```

A parameter whose value is resolved from a stack output of a stack within the same Takomo project using the [output resolver](../guide/stacks/parameter-resolvers.md#stack-output):

```yaml
parameters:
  VpcId:
    resolver: stack-output
    stack: /vpc.yml
    output: vpcId
```

A parameter whose value is resolved from a stack output of a stack outside the Takomo project using the [external output resolver](../guide/stacks/parameter-resolvers.md#external-stack-output):

```yaml
parameters:
  VpcId:
    resolver: external-stack-output
    stack: vpc-stack
    output: vpcId
    region: eu-west-1
    commandRole: arn:aws:iam::123456789012:role/deployer
```

A parameter whose value is resolved from a stack secret of a stack within the same Takomo project using the [secret resolver](../guide/stacks/parameter-resolvers.md#secret):

```yaml
parameters:
  DatabasePassword:
    resolver: secret
    stack: /rds.yml
    secret: password
```

## project

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Inherited: `yes`
- Overriding: `replace`
- Where to define: `stack group`, `stack`
- Requirements:
  - Must match regex `^[a-zA-Z][a-zA-Z0-9-]*$`

Name of the Takomo project. If a stack has no explicitly defined `name`, then the `project` is included in the stack `name` generated by Takomo.

::: warning Changing the project
If a stack does not have explicitly defined `name`, changing the `project` will also change its `name`. If the `name` of an existing stack changes, Takomo will not be able to find it anymore and assumes that the stack does not exist.
:::

### Examples

```yaml
project: my-takomo-project
```

## regions

- Type: `string`, `string[]`  
- Required: `yes`  
- Default value: `undefined`  
- Where to define: `stack group`, `stack`  
- Inherited: `yes`  
- Overriding: `replace`  
- Requirements:  
  - Must be a valid AWS region  

Regions where the stack is created. Accepts a single region or a list of regions.

Regions defined in a stack or a stack group configuration completely override the regions inherited from the parent stack group.

::: warning Changing the regions
Adding new regions to an existing stack does not require any special actions.

If an existing stack has only one region and that region is changed, then Takomo will start looking for the stack from the new region and forget that it still exists in the old region.

If one or more regions need to be removed from a stack, use [stacks undeploy](../command-line-usage/stacks.md#undeploy-stacks) command to remove the stack from the regions in question, and then update corresponding stack or stack group configuration files.
:::

### Examples

A single region:

```yaml
regions: eu-west-1
```

Multiple regions:

```yaml
regions:
  - eu-central-1
  - eu-north-1
  - us-east-1
```

## secrets

- Type: `object`
- Required: `no`
- Default value: `undefined`
- Where to define: `stack`
- Inherited: `no`
- Overriding: `replace`
- Requirements:
  - Secret name must match regex `^[a-zA-Z0-9][-a-zA-Z0-9]*$`
  - Secret name minimum length 1
  - Secret name maximum length 30
  - Secret description maximum length 1024

Confidential information, such as passwords and access tokens, that canbe used in the stack parameters.

Secrets configuration is an object where keys are names for the secrets and values are configuration for the corresponding secrets. Each secret has a mandatory description stating its purpose.

### Secret Configuration Object

Properties of a secret configuration object.

#### secrets.&lt;name&gt;.description

- Type: `string`
- Required: `yes`

Description for the secret.

### See also

- [Secret parameter resolver](../guide/stacks/parameter-resolvers.md#secret)
- [Secrets CLI commands](../command-line-usage/stack-secrets.md)

### Examples

A single secret named 'password':

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

## tags

- Type: `object`  
- Required: `no`  
- Default value: `undefined`  
- Where to define: `stack group`, `stack`  
- Inherited: `yes`  
- Overriding: `merge`  
- Requirements:  
  - Tag key must be a valid tag key  
  - Tag value must be a valid tag value  

Tags to be associated with the stack and its resources that support tagging.

Tags configuration is an object where keys are names for the tags and values are values for the corresponding tags.

Tags defined in the stack configuration are merged with the tags inherited from the stack group, i.e. tags with the same name are overridden but other tags are retained as is.

### Examples

Multiple tags:

```yaml
tags:
  Name: MySQL database
  Environment: dev
  CostCenter: 123
```

## template

- Type: `string`  
- Required: `no`  
- Default value: `computed`  
- Where to define: `stack`  
- Inherited: `no`  
- Overriding: `replace`  
- Requirements:  
  - File extensions must be `.json`, `.yml` or `.hbs`  

Path to a CloudFormation template file used to create or update the stack, located in `templates` dir

### Default value

By default, the stack configuration file path relative to the `stacks` directory is used. For example, if the stack configuration file is `networks/vpc.yml` and the `template` is not explicitly defined, then the `template` gets value `networks/vpc.yml`.

### Examples

Use template rds.yml:

```yaml
template: rds.yml
```

Use template from networking subdir:

```yaml
template: networking/vpc.yml
```

## templateBucket

- Type: `object`
- Required: `no`
- Default value: `undefined`
- Where to define: `stack group`, `stack`
- Inherited: `yes`
- Overriding: `replace`
- Requirements:
  - Name must be a valid S3 bucket name
  - Key prefix must be a valid S3 object key prefix

An S3 bucket where the stack's CloudFormation template is uploaded prior the launch. Using a template bucket allows bigger CloudFormation template files (max size of 460,800 bytes instead of the default of 51,200 bytes).

Template bucket configuration is an object with following keys:

- `name` - Name of the S3 bucket
- `keyPrefix` - Key prefix where templates are uploaded

Only the `name` property is required. You can tell Takomo to upload template files to a certain path by specifying the `keyPrefix`.

The template bucket is managed and accessed using the same credentials as the present for the current stack.

### Examples

Provide only the bucket name:

```yaml
templateBucket:
  name: my-template-files
```

With key prefix:

```yaml
templateBucket:
  name: my-template-files
  keyPrefix: my-templates/project-x/
```

## timeout

- Type: `number`, `object`
- Required: `no`
- Default value: `undefined`
- Where to define: `stack group`, `stack`
- Inherited: `yes`
- Overriding: `replace`
- Requirements:
  - Timeout must be an integer greater or equal to 0

Time in seconds the stack create or update operation can take before it is considered as failure and rolled back.

Timeout configuration can be given also in an object with following keys:

- `create` - Timeout for create operations
- `update` - Timeout for update operations

Use object configuration to provide separate timeouts for stack create and update operations. You can provide the timeout for the both, or just one of the operations.

Use 0 to disable timeout.

Delete operations do not support timeout.

### Examples

Timeout of 180 minutes for both create and update:

```yaml
timeout: 180
```

Timeout of 5 minutes for create and no timeout for update:

```yaml
timeout:
  create: 300
```

Separate timeouts for create and update:

```yaml
timeout:
  create: 300
  update: 120
```
