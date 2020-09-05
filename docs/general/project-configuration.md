---
id: project-configuration
title: Project Configuration
description: General project configuration for Takomo
keywords:
  - Takomo
  - project
  - configuration
---
General project configuration is defined in the `takomo.yml` file located in the project directory. It is optional and currently there is only one supported property: `requiredVersion`, which is used to specify the version of Takomo required by the project.

Takomo uses [npm-semver](https://docs.npmjs.com/misc/semver) to verify the current Takomo version against the required version.

#### Examples

Require Takomo version 2.1.0 or above:

```yaml
requiredVersion: ">=2.1.0"
```
