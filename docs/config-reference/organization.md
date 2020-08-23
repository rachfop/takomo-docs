---
id: organization
title: Organization
description: Configuration reference for organization
keywords:
  - Takomo
  - configuration
---

This page describes properties available in organization configuration file.

### Available Properties

Here are the available properties: 

- [accountAdminRoleName](#accountadminrolename)
- [accountBootstrapRoleName](#accountbootstraprolename)
- [accountCreation](#accountcreation)
- [configSets](#configsets)
- [masterAccountId](#masteraccountid)
- [organizationAdminRoleName](#organizationadminrolename)
- [organizationalUnits](#organizationalunits)
- [serviceControlPolicies](#servicecontrolpolicies)
- [tagPolicies](#tagpolicies)
- [trustedAwsServices](#trustedawsservices)
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

## accountAdminRoleName

- Type: `string`
- Required: `no`
- Default value: `computed`
- Requirements:
  - Must be a valid role name

The default IAM role name to be used to [deploy](../command-line-usage/organization-accounts.md#deploy-accounts) and [undeploy](../command-line-usage/organization-accounts.md#undeploy-accounts) accounts. Organizational units and individual accounts can override this value.

If no value is given, value from [accountCreation.defaults.roleName](#accountcreation-defaults-rolename) is used, and if that is not defined, `OrganizationAccountAccessRole` is used.

### Examples

Use role name `MyDeployerRole`.

```yaml
accountAdminRoleName: MyDeployerRole
```

## accountBootstrapRoleName

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Requirements:
  - Must be a valid role name

The default IAM role name to be used to [bootstrap](../command-line-usage/organization-accounts.md#bootstrap-accounts) and [tear down](../command-line-usage/organization-accounts.md#tear-down-accounts) accounts. Organizational units and individual accounts can override this value.

If no value is given, value from [accountCreation.defaults.roleName](#accountcreation-defaults-rolename) is used, and if that is not defined, `OrganizationAccountAccessRole` is used.

### Examples

Use role name `MyBootstrapRole`.

```yaml
accountBootstrapRoleName: MyBootstrapRole
```

## accountCreation

- Type: `object`
- Required: `no`
- Default value:
  ```yaml
  defaults:
    iamUserAccessToBilling: true
    roleName: OrganizationAccountAccessRole
  ```

Constraints and default values used with account creation. 
 
#### accountCreation.defaults

- Type: `object`
- Required: `no`
- Default value:  
  ```yaml
  iamUserAccessToBilling: true
  roleName: OrganizationAccountAccessRole
  ```

Default settings for account creation, used when creating new accounts.

#### accountCreation.defaults.iamUserAccessToBilling

- Type: `boolean`
- Required: `no`
- Default value: `true`

Boolean defining if IAM user access account billing information should be enabled.

#### accountCreation.defaults.roleName

- Type: `string`
- Required: `no`
- Default value: `OrganizationAccountAccessRole`

Name of the IAM role used to manage the new accounts.

#### accountCreation.constraints

- Type: `object`
- Required: `no`
- Default value: `undefined`

Account creation constraints used to validate input values given when a new account is being created.

#### accountCreation.constraints.namePattern

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Requirements:
  - Must be a valid regex expression

A regex pattern to validate name of the new account being created.

#### accountCreation.constraints.emailPattern

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Requirements:
  - Must be a valid regex expression

A regex pattern to validate email of the new account being created.

### Examples

Account creation configuration with default values and constraints:

```yaml
accountCreation:
  defaults: 
    iamUserAccessToBilling: false
    roleName: "MyAdminRole"
  constraints:
    namePattern: ^[a-z]+$
    emailPattern: ^.*@acme.com$
```

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

Name of the config set. Used to refer to the config set from organizational units and accounts. 

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

A list of command paths that are executed when the config set is deployed/undeployed or bootstrapped/teared down.

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

## masterAccountId

- Type: `string`
- Required: `yes`
- Default value: `undefined`
- Requirements:
  - Must be a valid AWS account id
  
Organization master account id. Used to ensure that organization management 
operations target the correct AWS organization.
  
### Examples

Master account id `111111111111`.

```yaml
masterAccountId: "111111111111"
```
  
## organizationAdminRoleName

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Requirements:
  - Must be a valid role name
  
Name of the IAM role used to perform organization management operations againts the 
organization. 

If no value is given, the current AWS credentials in terminal session are used.
  
### Examples

Use role name `MyOrganizationAdminRole`.

```yaml
organizationAdminRoleName: MyOrganizationAdminRole
```

## organizationalUnits

- Type: `object`
- Required: `yes`
- Default value: `undefined`
- Requirements: 
  - At least `Root` organizational unit must be defined

Organizational units.

Configuration is an object where keys are paths for the organizational units and values are configuration objects for the corresponding organizational units.

#### organizationalUnits.&lt;path&gt;

- Type: `string`
- Required: `yes`
- Default value: `undefined`
- Requirements:
  - Must match regex `/^Root(\/[a-zA-Z0-9-_/ ]+)?$/`
  - Max depth for organization hierarchy is 5

Path of the organizational unit.

#### organizationalUnits.&lt;path&gt;.accountAdminRoleName

- Type: `string`
- Required: `no`
- Default value: `computed`

The IAM role name to be used to manage accounts belonging to the organizational unit. If no value is given, then value from the top-level [accountAdminRoleName](#accountadminrolename) is used.

#### organizationalUnits.&lt;path&gt;.accountBootstrapRoleName

- Type: `string`
- Required: `no`
- Default value: `computed`

The IAM role name to be used to bootstrap accounts belonging to the organizational unit. If no value is given, then value from the top-level [accountBootstrapRoleName](#accountbootstraprolename) is used.

#### organizationalUnits.&lt;path&gt;.accounts

- Type: `any[]`
- Required: `no`
- Default value: `undefined`

List of accounts that belong to the organizational unit. Values in the list can be either plain account ids or objects.

#### organizationalUnits.&lt;path&gt;.accounts.accountAdminRoleName

- Type: `string`
- Required: `no`
- Default value: `computed`

The IAM role name to be used to manage the account. If no value is given, then value from the parent organizational unit's [accountAdminRoleName](#organizationalunits-path-accountadminrolename) is used.

#### organizationalUnits.&lt;path&gt;.accounts.accountBootstrapRoleName

- Type: `string`
- Required: `no`
- Default value: `computed`

The IAM role name to be used to bootstrap the account. If no value is given, then value from the parent organizational unit's [accountBootstrapRoleName](#organizationalunits-path-accountbootstraprolename) is used.

#### organizationalUnits.&lt;path&gt;.accounts.bootstrapConfigSets

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of config sets to run when the account is bootstrapped.

#### organizationalUnits.&lt;path&gt;.accounts.configSets

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of config sets to run when the account is deployed.

#### organizationalUnits.&lt;path&gt;.accounts.description

- Type: `string`
- Required: `no`
- Default value: `undefined`

Description for the account.

#### organizationalUnits.&lt;path&gt;.accounts.email

- Type: `string`
- Required: `no`
- Default value: `undefined`

Root email of the account.

#### organizationalUnits.&lt;path&gt;.accounts.id

- Type: `string`
- Required: `yes`
- Default value: `undefined`

Id of the account.

#### organizationalUnits.&lt;path&gt;.accounts.name

- Type: `string`
- Required: `no`
- Default value: `undefined`

Name of the account.

#### organizationalUnits.&lt;path&gt;.accounts.serviceControlPolicies

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of service control policies to attach to the account.

#### organizationalUnits.&lt;path&gt;.accounts.status

- Type: `string`
- Required: `no`
- Default value: `active`
- Requirements:
  - Allowed values:
    - `active` - The account is included to organization accounts operations
    - `disabled` - The account is excluded from organization accounts operations
    - `suspended` - The account is suspended and excluded from organization accounts operations 

Account status. Used to define if the account should be included in organization accounts deploy/undeploy and bootstrap/tear down operations.

#### organizationalUnits.&lt;path&gt;.accounts.tagPolicies

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of tag policies to attach to the account.

#### organizationalUnits.&lt;path&gt;.accounts.vars

- Type: `object`
- Required: `no`
- Default value: `undefined`

Variables object.

#### organizationalUnits.&lt;path&gt;.bootstrapConfigSets

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of config sets to run when accounts belonging to the organizational unit are bootstrapped.

#### organizationalUnits.&lt;path&gt;.configSets

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of config sets to run when accounts belonging to the organizational unit are deployed.

#### organizationalUnits.&lt;path&gt;.priority

- Type: `number`
- Required: `no`
- Default value: `undefined`

Number used to define the launch order of organizational unit directly under the same parent.

#### organizationalUnits.&lt;path&gt;.serviceControlPolicies

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of service control policies to attach to the organizational unit.

#### organizationalUnits.&lt;path&gt;.status

- Type: `string`
- Required: `no`
- Default value: `undefined`
- Requirements:
  - Allowed values:
    - `active` - Accounts are included to organization accounts operations
    - `disabled` - Accounts are excluded from organization accounts operations

Organizational unit status. Used to define if the accounts belonging to the organizational unit should be included in organization accounts deploy/undeploy and bootstrap/tear down operations.

#### organizationalUnits.&lt;path&gt;.tagPolicies

- Type: `string`, `string[]`
- Required: `no`
- Default value: `undefined`

List of tag policies to attach to the organizational unit.

#### organizationalUnits.&lt;path&gt;.vars

- Type: `object`
- Required: `no`
- Default value: `undefined`

Variables object.

### Examples

Some organizational units:

```yaml
organizationalUnits:
  Root:
    serviceControlPolicies:
      - MySCP
    accounts:
      - id: "123456789012"
        description: Master account
  Root/test-accounts:
    status: disabled
    tagPolicies: my-tag-policy
    accounts:
      - "111111111111"
      - "222222222222"
      - "333333333333"
  "Root/sandbox accounts/sandbox-1": {}
  "Root/sandbox accounts/sandbox-2":
    vars: 
      company:
        name: Acme Inc.
        id: 1234000
    accounts:
      - id: "444444444444"
```

## serviceControlPolicies

- Type: `object`
- Required: `no`
- Default value: `undefined`

Organization service control policies.

Service control policies configuration is an object where keys are names for the service control policies and values are configuration objects for the corresponding policy.

#### serviceControlPolicies.&lt;name&gt;

- Type: `string`
- Required: `yes`
- Default value: `undefined`
- Requirements:
  - minimum minimum length is 1
  - maximum length is 128
  - must match pattern `/^[a-zA-Z0-9_-]+$/`
  - must be unique among service control policies

Name for the service control policy. Used to refer to the service control policy from organizational units and accounts. The service control policy name is used to find the actual policy file from the `organization/service-control-policies` directory.

#### serviceControlPolicies.&lt;name&gt;.description

- Type: `string`
- Required: `yes`
- Default value: `undefined`

Mandatory description for the policy.

#### serviceControlPolicies.&lt;name&gt;.awsManaged

- Type: `boolean`
- Required: `no`
- Default value: `false`

Optional boolean defining if the policy is managed by AWS.

### Examples

An user managed policy named `mySCP` and another, AWS managed policy, named `FullAWSAccess`.

```yaml
serviceControlPolicies:
  mySCP:
    description: My service control policy 
  FullAWSAccess:
    awsManaged: true
    description: Default AWS managed policy
```

## tagPolicies

- Type: `object`
- Required: `no`
- Default value: `undefined`

Organization tag policies.

Tag policies configuration is an object where keys are names for the tag policies and values are configuration objects for the corresponding policy. The tag policy name is used to find the actual policy file from the `organization/tag-policies` directory.

#### tagPolicies.&lt;name&gt;

- Type: `string`
- Required: `yes`
- Default value: `undefined`
- Requirements:
  - minimum minimum length is 1
  - maximum length is 128
  - must match pattern `/^[a-zA-Z0-9_-]+$/`
  - must be unique among tag policies

Name for the tag policy. Used to refer to the tag policy from organizational units and accounts. 

#### tagPolicies.&lt;name&gt;.description

- Type: `string`
- Required: `yes`
- Default value: `undefined`

Mandatory description for the tag policy.

#### tagPolicies.&lt;name&gt;.awsManaged

- Type: `boolean`
- Required: `no`
- Default value: `false`

Optional boolean defining if the policy is managed by AWS.

### Examples

Two tag policies:

```yaml
tagPolicies:
  myTagPolicy:
    description: My strict tag policy 
  anotherTagPolicy:
    description: Some tag policy
```

## trustedAwsServices

- Type: `string[]`
- Required: `no`
- Default value: A list containing all AWS service principals
- Requirements:
  - Allowed values:
    - aws-artifact-account-sync.amazonaws.com
    - cloudtrail.amazonaws.com
    - compute-optimizer.amazonaws.com
    - config.amazonaws.com
    - ds.amazonaws.com
    - fms.amazonaws.com
    - license-manager.amazonaws.com
    - member.org.stacksets.cloudformation.amazonaws.com
    - ram.amazonaws.com
    - servicecatalog.amazonaws.com
    - ssm.amazonaws.com
    - sso.amazonaws.com
    - tagpolicies.tag.amazonaws.com

List of trusted AWS service principals.

### Examples

Trust some AWS services:

```yaml
trustedAwsServices:
  - config.amazonaws.com
  - ds.amazonaws.com
  - fms.amazonaws.com
```

## vars

- Type: `object`
- Required: `no`
- Default value: `undefined`

Variables available in the accounts.

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
