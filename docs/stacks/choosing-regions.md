---
id: choosing-regions
title: Choosing Regions
description: Choosing regions where to deploy stacks
keywords:
  - Takomo
  - stacks
  - regions
  - deploy
---

A stack can be deployed to one or more regions. You specify the stack region with `regions` property. It accepts a single region or a list of regions.

#### Examples: Specifying the Region

Specify a single region:

```yaml
regions: eu-west-1
```

Specify multiple regions:

```yaml
regions:
  - eu-central-1
  - eu-north-1
  - us-east-1
```

## Stack Regions are Immutable

Like the stack name, you can’t change the stack region once the stack is created. If the region of an existing stack is changed in the local configuration, Takomo will look for the stack from the new region while the existing stack, that was created with the old region, remains in the old region and won’t be managed by Takomo anymore.

Because a stack can have more than one region, you can always add new regions to stack’s configuration file, and new stacks will be created to the new regions when the stack is deployed.

If you want to remove regions, you must first undeploy the stack from the regions you no longer need, and then remove the regions from the stack’s configuration file.

## See Also

- [regions property in config reference](/docs/config-reference/stacks#regions)