---
id: project
title: Project
---
Project configuration file `takomo.yml` is placed in the project root directory and contains general configuration for the project.

## requiredVersion

- Type: `string`  
- Required: `no`  
- Default: `undefined`  
- Requirements:  
  - Must be a valid semantic version range
  
Required Takomo version range.

#### Examples

Require at least version `2.2.0`:

```yaml
requiredVersion: ">=2.2.0"
```