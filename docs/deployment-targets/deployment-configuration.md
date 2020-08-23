---
id: deployment-configuration
title: Deployment Configuration
---

## Directory Structure

The deployment configuration is defined in the `targets.yml` file that is located in the `deployment` directory, right next to the other Takomo directories.

```
.
└- deployment
   └- targets.yml
```

## Deployment Groups

Deployment groups form a tree-like hierarchies, and are configured in `deploymentGroups` object where keys are deployment group paths and values are configuration for the corresponding deployment group. Deployment groups inherit configuration from their parents.

### Examples: Defining Deployment Groups

An empty deployment group.

```yaml title="targets.yml"
deploymentGroups:
  MyGroup: {}
```

Nested deployment groups:

```yaml title="targets.yml"
deploymentGroups:
  MyGroup/Sandbox: {}
  SomeOther/Environments/Dev: {}
  SomeOther/Environments/Test: {}
  SomeOther/Environments/Prod: {}
  "Another/Customer Accounts": {}
```

As seen in this example, you don't need to explicitly define parent deployment groups if it's empty and has children. The path needs to be quoted if some deployment group name in it has spaces.

## Deployment Targets

Each deployment group can have zero or more deployment targets, and each target can belong to exactly one deployment group. Deployment targets have one required property `name` which is used to identify them.

## Adding Deployment Targets to Groups

To add deployment targets to a deployment group, add the targets into the `targets` list of the deployment group.

### Example: Adding deployment targets

Add two deployment targets to a deployment group.

```yaml title="targets.yml"
deploymentGroups:
  MyGroup:
    targets:
      - name: MyFirstTarget
      - name: AnotherTarget
```