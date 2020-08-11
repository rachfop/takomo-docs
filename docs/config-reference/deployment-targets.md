---
id: deployment-targets
title: Deployment Targets
---

This page describes properties available in deployment targets configuration file.

### Available Properties

Here are the available properties: 

- [configSets](#configsets)
- [deploymentGroups](#deploymentgroups)
- [vars](#vars)

### Property Documentation

Following information is documented for each property:

#### Type

Allowed type or types for the property value. Possible values: `string`, `number`, `boolean`, `object` or array of the aforementioned, e.g. `string[]`, or `any` which can be any other type except an array.

#### Required

Is the property required. Possible values: `yes`, `no` or `conditional`.

#### Default value

If no value is given for the property, this value will be used. If this is set as `computed`, then detailed information on how the default value is computed is found under the property's description.

#### Requirements

What requirements the property value must satisfy.

#### Since

In which Takomo version the property was introduced. If omitted, then the property was introduced in Takomo 1.0.0.

## configSets

- Type: `object`
- Required: `no`
- Default value: `undefined`

Configuration for config sets.

Config sets configuration is an object where keys are names for the config sets and values are configuration objects for the corresponding config set.

#### configSets.&lt;name&gt;

- Type: `string`
- Required: `yes`
- Default value: `undefined`
- Requirements:
  - minimun length is 1
  - maximum length is 60
  - must match pattern `/^[a-zA-Z_]+[a-zA-Z0-9-_]*$/`
  - must be unique among config sets

Name of the config set. Used to refer to the config set from deployment groups and targets. 

#### configSets.&lt;name&gt;.description

- Type: `string`
- Required: `yes`
- Default value: `undefined`

Mandatory description for the config set.

#### configSets.&lt;name&gt;.projectDir

- Type: `string`
- Required: `no`
- Default value: `computed`
- Since: `v2.1.0` 

Optional file path to a directory containing Takomo configuration. Default value is the current project directory.

#### configSets.&lt;name&gt;.commandPaths

- Type: `string[]`
- Required: `yes`
- Default value: `undefined`
- Requirements:
  - List values must be valid command paths

A list of command paths that are executed when the config set is deployed or undeployed.

### Examples

Two config sets named `basic` and `cloudtrail`:

```yaml
configSets:
  basic:
    description: Basic configuration
    commandPaths:
      - /basic
  cloudtrail:
    description: CloudTrail configuration
    commandPaths:
      - /audit/cloudtrail.yml/eu-west-1
      - /audit/cloudtrail.yml/eu-central-1
```

A config set with custom `projectDir`.

```yaml
configSets:
  myConfigSet:
    description: This config set is located in custom location
    projectDir: /home/ec2-user/takomo-configs
    commandPaths:
      - /
```

## deploymentGroups

- Type: `object`
- Required: `yes`
- Default: `undefined`

Deployment groups.

Configuration is an object where keys are paths for the deployment groups and values are configuration objects for the corresponding deployment groups.

#### deploymentGroups.&lt;path&gt;

- Type: `string`
- Required: `yes`
- Default value: `undefined`
- Requirements:
  - Must match regex `/^[_a-zA-Z0-9][a-zA-Z0-9-_/ ]+$/`
  - Max depth for deployment groups hierarchy is 10

Deployment group path.

#### deploymentGroups.&lt;path&gt;.deploymentRole

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Requirements:
  - Must be a valid IAM role ARN

IAM role used to deploy targets under the deployment group.

#### deploymentGroups.&lt;path&gt;.priority

- Type: `number`
- Required: `no`
- Default value: `undefined`

Number used to define the deployment order of the deployment group directly under the same parent 

#### deploymentGroups.&lt;path&gt;.configSets

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of config sets to run when the deployment grpup is deployed or undeployed.

#### deploymentGroups.&lt;path&gt;.status

- Type: `string`
- Required: `no`
- Default value: `active`
- Requirements:
  - Allowed values:
    - `active` - The target group is included to deploy and undeploy operations
    - `disabled` - The target group is excluded from deploy and undeploy operations

Deployment group status. Used to define if the target group and all its targets should be included in deploy and undeploy operations.

#### deploymentGroups.&lt;path&gt;.vars

- Type: `object`
- Required: `no`
- Default value: `undefined`

Variables object.

#### deploymentGroups.&lt;path&gt;.targets

- Type: `object[]`
- Required: `no`
- Default value: `undefined`

List of deployment targets that belong to the deployment group.

#### deploymentGroups.&lt;path&gt;.targets.accountId

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Since: `v2.3.0` 
- Requirements:
  - Must be a valid account id

Account id that specifies the target account of the deployment target. An error is thrown if an attempt to deploy the target to any other account is made.

#### deploymentGroups.&lt;path&gt;.targets.deploymentRole

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Requirements:
  - Must be a valid IAM role ARN

IAM role used to the deploy target.

#### deploymentGroups.&lt;path&gt;.targets.description

- Type: `string`
- Required: `no`
- Default value: `undefined`

Description of the deployment target.

#### deploymentGroups.&lt;path&gt;.targets.name

- Type: `string`
- Required: `no`
- Default value: `undefined`

Name of the deployment target.

#### deploymentGroups.&lt;path&gt;.targets.configSets

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of config sets to run when the target is deployed or undeployed.

#### deploymentGroups.&lt;path&gt;.targets.status

- Type: `string`
- Required: `no`
- Default value: `active`
- Requirements:
  - Allowed values:
    - `active` - The target is included to deploy and undeploy operations
    - `disabled` - The target is excluded from deploy and undeploy operations

Deployment target status. Used to define if the target should be included in deploy and undeploy operations.

#### deploymentGroups.&lt;path&gt;.targets.vars

- Type: `object`
- Required: `no`
- Default value: `undefined`

Variables object.

### Examples

Some deployment groups with targets.

```yaml

deploymentGroups:

  Environments/Dev: {}
  Environments/Test:
    configSets: logs
    priority: 1
    vars:
      baz: bar
    status: active
    targets:
      - name: eka
        vars:
          accountId: "123456789012"
      - name: toka
        vars:
          accountId: "333333333333"
      - name: kolmas
        vars:
          accountId: "222222222222"
      - name: neljäs
        vars:
          accountId: "012301230123"
      - name: viides
        vars:
          accountId: "888888888888"

configSets:
  logs:
    description: Logging configs
    commandPaths:
      - /logs.yml
```

## vars

- Type: `object`
- Required: `no`
- Default value: `undefined`

Variables available in the deployment groups and targets.

### Examples

Different kinds of variables:

```yaml
vars:
  cost-center: 12345
  environment:
    name: Production
    code: prod
  codes:
    - foo
    - bar
    - baz
```