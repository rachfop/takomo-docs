---
id: stacks
title: Stacks
description: Configuration reference for stacks
keywords:
  - Takomo
  - configuration
---

import ConfigReferenceTable from '@site/src/components/ConfigReferenceTable';

This page describes properties available in stack configuration files.

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
- [terminationProtection](#terminationprotection)
- [timeout](#timeout)

## accountIds

List of allowed AWS accounts where a stack can be deployed.

<ConfigReferenceTable 
    required={true} 
    types={['string','string[]']}
    defaultValue='undefined' 
    inherited={true} 
    overriding='replace' 
    defineIn={'both'}
    requirements={['Must be valid AWS account ids']}
/>

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

Capabilities for the stack.

<ConfigReferenceTable 
    required={false} 
    types={['string','string[]']}
    defaultValue='[CAPABILITY_IAM, CAPABILITY_NAMED_IAM, CAPABILITY_AUTO_EXPAND]' 
    inherited={true} 
    overriding='replace' 
    defineIn={'both'}
    requirements={["Allowed values: CAPABILITY_IAM, CAPABILITY_NAMED_IAM, CAPABILITY_AUTO_EXPAND"]}
/>

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

An IAM role used to execute commands for the stack. Determines the target AWS account.

<ConfigReferenceTable 
    required={false} 
    types={['string']}
    defaultValue='undefined' 
    inherited={true} 
    overriding='replace' 
    defineIn={'both'}
    requirements={['Must be a valid IAM role ARN']}
/>

### Examples

```yaml
commandRole: arn:aws:iam::123456789012:role/deployer-role
```

### See also

- [Configuring AWS credentials](/docs/general/credentials)

## data

Arbitrary data that can be referred in `.hbs` CloudFormation template files.

<ConfigReferenceTable 
    required={false} 
    types={['object']}
    defaultValue='undefined' 
    inherited={true} 
    overriding='merge' 
    defineIn={'both'}
    requirements={['The value of the object keys must be of type string']}
/>

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

### See also

- [Templating](/docs/stacks/templating-with-handlebars)

## depends

A single `stack path` or a list of `stack paths` to stacks within the same Takomo project that the current stack depends on.

<ConfigReferenceTable 
    required={false} 
    types={['string','string[]']}
    defaultValue='undefined' 
    inherited={false} 
    overriding='not applicable' 
    defineIn={'stack'}
    requirements={['Must be a valid stack path']}
/>

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

A list of hooks to be executed at different stages of deploy and undeploy commands. Hooks are executed in the order they are defined. If a hook fails, the stack operation is cancelled and deemed as failure.

<ConfigReferenceTable 
    required={false} 
    types={[<a href='#hook-configuration-object'>Hook Configuration Object[]</a>]}
    defaultValue='undefined' 
    inherited={true} 
    overriding='merge' 
    defineIn={'both'}
    requirements={[]}
/>

Hooks defined in a stack or stack group configuration are appended to the list of hooks inherited from the parent stack group configuration.

### Hook Configuration Object

Configuration for each hook is given as an object with the properties described below. In addition to these standard properties, different hook types can have properties of their own.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| name      | yes | string | Name of the hook |
| type      | yes | string | Type of the hook |
| operation | no  | string<br/>string[] | Stack operations during which the hook is executed. Accepts a single value or a list of values. If no operation is defined, the hook is executed on all operations.<br/><br/>Allowed values:<ul><li>create - A new stack is created</li><li>update - An existing stack is updated</li><li>delete - An existing stack is deleted</li></ul> |
| stage     | no  | string<br/>string[] | Stack operation stages during which the hook is executed. Accepts a single value or a list of values. If no stage is defined, the hook is executed on all stages.<br/><br/>Allowed values:<ul><li>before - Hook is executed before the stack operation</li><li>after - Hook is executed after the stack operation</li></ul> |
| status    | no  | string<br/>string[] | Stack operation statuses during which the hook is executed. Accepts a single value or a list of values. If no status is defined, the hook is executed on all statuses.<br/><br/>Allowed values:<ul><li>success - Stack operation was successful</li><li>failed - Stack operation failed</li><li>cancelled - Stack operation was cancelled</li><li>skipped - Stack operation was skipped</li></ul>Has effect only when the stage is after. |

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

### See also

- [Hooks](/docs/stacks/hooks)

## ignore

Ignore a stack group or a stack. If a stack group is ignored, all its stacks and children are also ignored. If a stack is ignored, its configuration is not loaded, effectively making it non-existing. Ignored stacks can't be deployed or referenced elsewhere in configuration, e.g. ignored stack can't be a dependency for other stacks.

<ConfigReferenceTable 
    required={false} 
    types={['boolean']}
    defaultValue='false' 
    inherited={true} 
    overriding='replace' 
    defineIn={'both'}
    requirements={[]}
/>

If a stack group sets ignore to true, it's stacks or child stack groups won't be parsed and thus can't set ignore to false.

### Examples

```yaml
ignore: true
```

## name

Name of the stack.

<ConfigReferenceTable 
    required={false} 
    types={['string']}
    defaultValue='computed (see below)' 
    inherited={false} 
    overriding='not applicable' 
    defineIn={'stack'}
    requirements={[
        'Must match regex ^[a-zA-Z0-9][-a-zA-Z0-9]*$',
        'Minimum length 1',
        'Maximum length 128'
    ]}
/>

### Default value

If the `name` is not given, it is generated from the `stack path` and the `project` as follows:

1. Remove the starting slash
2. Remove the .yml file extension and everything after it
3. Replace remaining slashes with hyphens
4. If the `project` is defined, prepend it with a hyphen

For example, if the stack's `project` is `example` and `stack path` is
`/dev/vpc.yml/eu-west-1`, then the generated `name` is `example-dev-vpc`.

:::caution Changing the stack name
Changing the name will cause Takomo to look for the stack with the new name. As Takomo does not store the state anywhere, it can't know that the stack still exists with the old name.

If you need to change the name of an existing stack, you should first decide if you need to remove the old stack before or after changing the name in stack configuration file. Then use [stacks undeploy](../command-line-usage/stacks.md#undeploy-stacks) command to remove the old stack.
:::

### Examples

```yaml
name: rds-database
```

## parameters

Stack input parameters.

<ConfigReferenceTable 
    required={false} 
    types={[<a href='#parameters-configuration-object'>Parameters Configuration Object</a>]}
    defaultValue='undefined' 
    inherited={false} 
    overriding='not applicable' 
    defineIn={'stack'}
    requirements={[
        'Parameter name must be of type string',
        'Parameter name must match regex ^[a-zA-Z0-9]*$'
    ]}
/>

### Parameters Configuration Object

Parameters configuration is an object where keys are names for the parameters and values are configuration for the corresponding parameters. A parameter value can be a string, number, boolean, object or an array of the aforementioned types.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {parameter&nbsp;name} | yes | string<br/>number<br/>boolean<br/>[Parameter Configuration Object](#parameter-configuration-object)<br/>any[] | Value of the parameter whose name is given as the key. An array should be used when the template parameter is accepts a list of values. |

### Parameter Configuration Object

Parameter value must be given as object when the parameter value is resolved using a [parameter resolver](/docs/stacks/parameter-resolvers). The configuration object has the properties described below. 

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver     | yes | string  | Name of parameter resolver used to resolve the value for the parameter |
| confidential | no  | boolean | Boolean determining if the parameter value should be concealed from the logs. Defaults to false. |

In addition to the standard properties documented above, different parameter resolvers can have properties of their own.

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

A parameter whose value is resolved from a stack output of a stack within the same Takomo project using the [output resolver](/docs/stacks/parameter-resolvers#stack-output):

```yaml
parameters:
  VpcId:
    resolver: stack-output
    stack: /vpc.yml
    output: vpcId
```

A parameter whose value is resolved from a stack output of a stack outside the Takomo project using the [external output resolver](/docs/stacks/parameter-resolvers#external-stack-output):

```yaml
parameters:
  VpcId:
    resolver: external-stack-output
    stack: vpc-stack
    output: vpcId
    region: eu-west-1
    commandRole: arn:aws:iam::123456789012:role/deployer
```

A parameter whose value is resolved from a stack secret of a stack within the same Takomo project using the [secret resolver](/docs/stacks/parameter-resolvers#secret):

```yaml
parameters:
  DatabasePassword:
    resolver: secret
    stack: /rds.yml
    secret: password
```

### See also

- [Parameter resolvers](/docs/stacks/parameter-resolvers)

## project

Name of the Takomo project. If a stack has no explicitly defined `name`, then the `project` is included in the stack `name` generated by Takomo.

<ConfigReferenceTable 
    required={false} 
    types={['string']}
    defaultValue='undefined' 
    inherited={true} 
    overriding='replace' 
    defineIn={'both'}
    requirements={[
        'Must match regex ^[a-zA-Z][a-zA-Z0-9-]*$'
    ]}
/>


:::caution Changing the project
If a stack does not have explicitly defined `name`, changing the `project` will also change its `name`. If the `name` of an existing stack changes, Takomo will not be able to find it anymore and assumes that the stack does not exist.
:::

### Examples

```yaml
project: my-takomo-project
```

## regions

Regions where the stack is created. Accepts a single region or a list of regions.

Regions defined in a stack or a stack group configuration completely override the regions inherited from the parent stack group.

<ConfigReferenceTable 
    required={true} 
    types={['string','string[]']}
    defaultValue='undefined' 
    inherited={true} 
    overriding='replace' 
    defineIn={'both'}
    requirements={[
        'Must be a valid AWS region '
    ]}
/>

:::caution Changing the regions
Adding new regions to an existing stack does not require any special actions.

If an existing stack has only one region and that region is changed, then Takomo will start looking for the stack from the new region and forget that it still exists in the old region.

If one or more regions need to be removed from a stack, use [stacks undeploy](/docs/command-line-usage/stacks#undeploy-stacks) command to remove the stack from the regions in question, and then update corresponding stack or stack group configuration files.
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

Confidential information, such as passwords and access tokens, that can be used in the stack parameters.

<ConfigReferenceTable 
    required={false} 
    types={[<a href='#secrets-configuration-object'>Secrets Configuration Object</a>]}
    defaultValue='undefined' 
    inherited={false} 
    overriding='not applicable' 
    defineIn={'stack'}
    requirements={[
        'Secret name must match regex ^[a-zA-Z0-9][-a-zA-Z0-9]*$',
        'Secret name minimum length 1',
        'Secret name maximum length 30',
        'Secret description maximum length 1024'
    ]}
/>

### Secrets Configuration Object

Secrets configuration is an object where keys are names for the secrets and values are configuration for the corresponding secrets.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {secret&nbsp;name} | yes | [Secret Configuration Object](#secret-configuration-object) | Value of the secret whose name is given as the key |

### Secret Configuration Object

Properties of a secret configuration object.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| description | yes | string | Description for the secret |

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

### See also

- [Secret parameter resolver](/docs/stacks/parameter-resolvers#secret)
- [Secrets CLI commands](/docs/command-line-usage/stack-secrets)

## tags

Tags to be associated with the stack and its resources that support tagging.

Tags defined in the stack configuration are merged with the tags inherited from the stack group, i.e. tags with the same name are overridden but other tags are retained as is.

<ConfigReferenceTable 
    required={false} 
    types={[<a href='#tags-configuration-object'>Tags Configuration Object</a>]}
    defaultValue='undefined' 
    inherited={true} 
    overriding='merge' 
    defineIn={'both'}
    requirements={[
        'Tag key must be a valid tag key',
        'Tag value must be a valid tag value'
    ]}
/>

### Tags Configuration Object

Tags configuration is an object where keys are names for the tags and values are values for the corresponding tags.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {tag&nbsp;name} | yes | string | Value of the tag whose name is given as the key |

### Examples

Multiple tags:

```yaml
tags:
  Name: MySQL database
  Environment: dev
  CostCenter: 123
```

## template

Path to a CloudFormation template file used to create or update the stack, located in `templates` dir

<ConfigReferenceTable 
    required={false} 
    types={['string']}
    defaultValue='computed (see below)' 
    inherited={false} 
    overriding='not applicable' 
    defineIn={'stack'}
    requirements={[
        'File extensions must be .json, .yml or .hbs'
    ]}
/>

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

An S3 bucket where the stack's CloudFormation template is uploaded prior the deployment. Using a template bucket allows bigger CloudFormation template files (max size of 460,800 bytes instead of the default of 51,200 bytes). The template bucket is managed and accessed using the same credentials as are used for the current stack.

<ConfigReferenceTable 
    required={false} 
    types={[<a href='#template-bucket-configuration-object'>Template Bucket Configuration Object</a>]}
    defaultValue='undefined' 
    inherited={true} 
    overriding='replace' 
    defineIn={'both'}
    requirements={[
        'Name must be a valid S3 bucket name',
        'Key prefix must be a valid S3 object key prefix'
    ]}
/>

### Template Bucket Configuration Object

Template bucket configuration is an object with following keys:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| name      | yes | string | Name of the S3 bucket |
| keyPrefix | no  | string | Key prefix where templates are uploaded inside the bucket |

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

Time in seconds the stack create or update operation can take before it is considered as failure and rolled back. Delete operations do not support timeout.
 Use 0 to disable timeout.
 
<ConfigReferenceTable 
    required={false} 
    types={['number',<a href='#timeout-configuration-object'>Timeout Configuration Object</a>]}
    defaultValue='undefined' 
    inherited={true} 
    overriding='replace' 
    defineIn={'both'}
    requirements={[
        'Timeout must be an integer greater or equal to 0'
    ]}
/>

### Timeout Configuration Object

Use object configuration to provide separate timeouts for stack create and update operations. You can provide the timeout for the both, or just one of the operations.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| create | no | number | Timeout in seconds for create stack operations |
| update | no | number | Timeout in seconds for update stack operations |

### Examples

Timeout of 180 seconds for both create and update:

```yaml
timeout: 180
```

Timeout of 300 seconds for create and no timeout for update:

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

## terminationProtection

Enable stack termination protection.

<ConfigReferenceTable 
    since={'v2.7.0'}
    required={false} 
    types={['boolean']}
    defaultValue={'false'} 
    inherited={true} 
    overriding='replace' 
    defineIn={'both'}
    requirements={[]}
/>

### Examples

Enabled stack termination protection.

```yaml
terminationProtection: true
```

### See Also

- [AWS documentation > Protecting a stack from being deleted](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-protect-stacks.html)