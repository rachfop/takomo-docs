---
id: from-0-to-1
title: From 0.x to 1.x
description: Upgrading Takomo from version 0.x to 1.x
keywords:
  - upgrading
  - Takomo
---

This page describes breaking changes introduced in version 1.0.0 and how to migrate from version 0.x.

## Breaking Changes to CLI Commands

Organization deployment command `tkm org launch` was renamed to `tkm org deploy` while keeping the underlying functionality unchanged.

## Breaking Changes to Configuration Files

The following changes to configuration files were added.

- Stack create and update timeout is now given in seconds instead of minutes in stack/stack group configuration
- Command hook `register` property was removed

## Breaking Changes to Custom Parameter Resolvers

Custom parameter resolvers were previously configured like so:

```javascript
module.exports = {
  name: "MyResolverName",
  init: (props) => {
    return {
      isConfidential: () => true,
      getDependencies: () => [],
      getIamRoleArns: () => [],
      resolve: (input) => {
        return "Some value"
      }
    }
  }
}
```

The resolver object that is returned from `init` function must now implement only `resolve` function. Other properties were renamed like so:

- `isConfidential` was renamed to `confidential`
- `getDependencies` was renamed to `dependencies`
- `getIamRoleArns` was renamed to `iamRoleArns`

The three properties above are now optional and can now be either primitive values or functions. Here's an example:

```javascript
module.exports = {
  name: "MyResolverName",
  init: (props) => {
    return {
      confidential: true,
      dependencies: () => ["/dev/vpc.yml"],
      resolve: (input) => {
        return "Some value"
      }
    }
  }
}
```