---
id: deployment-targets
title: Deployment Targets
---

Commands to manage deployment targets:

- [Deploy targets](#deploy-targets)
- [Undeploy targets](#undeploy-targets)

## Deploy Targets

Deploy infrastructure configured with config sets to the specified deployment targets.

### Usage

By default, this command loads configuration from `deployment/targets.yml` file and deploys all deployment targets that have config sets associated with them. Use `--config-file` option to specify alternative configuration file in the `deployment` directory.

You can pass one or more deployment group paths to deploy only the deployment targets located under the given deployment groups. Alternatively, you can choose to deploy only specific deployment target using the `--target` option.

```bash
tkm targets deploy [deployment_group_path...] \
  [--config-file <config file name>] \
  [--target <target>]...
```

### Collecting Deployment Targets for Deploy

In order to create a list of deployment targets for the deployment, the hierarchy of deployment groups is traversed recursively and deployment targets from each visited deployment group are added to the list in the order in which they are defined in the group's `targets` list.

Deployment group siblings, that is deployment groups at the root level of the hierarchy or with the same parent, are sorted primarily by their `priority`, then by their `name`. Deployment groups not selected for deployment or with `disabled` status are skipped. Also, the deployment targets not selected for deployment, with `disabled` status or without any config sets are skipped.

### Deployment Process

Once the list of deployment targets is ready, the deployment begins. During the deployment, the deployment targets are iterated one by one, and their config sets are deployed sequentially in the order in which they are defined.

When a config set is deployed, its command paths are deployed sequentially in the order in which they are defined. The command paths are deployed using the [deploy stacks command](stacks.md#deploy-stacks). All variables defined for the deployment target are passed along with the command.

The deployment continues until all deployment targets are deployed successfully or an error occurs. On error, all remaining deployment targets are cancelled.

### Examples

Deploy all deployment targets:

```bash
tkm targets deploy
```

Use alternative configuration file that is located in the `deployment` directory:

```bash
tkm targets deploy --config-file my-targets.yml
```

Deploy only targets that belong to a deployment group `MyGroup` or to any other deployment group under it:

```bash
tkm targets deploy MyGroup
```

Deploy only the deployment target named `my-target`:

```bash
tkm targets deploy --target my-target
```

## Undeploy Targets

Undeploy infrastructure configured with config sets from the specified deployment targets.

### Usage

By default, this command undeploys all deployment targets that have config sets associated with them. You can pass one or more deployment group paths to undeploy only the deployment targets located under the given deployment groups. Alternatively, you can choose to undeploy only specific deployment target using the `--target` option.

```bash
tkm targets undeploy [deployment_group_path...] \
  [--config-file <config file name>] \
  [--target <target>]...
```

### Collecting Deployment Targets for Undeploy

The process to collect the deployment targets for undeploy is identical to the process used to collect them for deployment.

### Undeployment Process

The process to undeploy deployment targets is identical to the process used to deploy them except that instead of deploying the command paths, they are undeployed using the [undeploy stacks command](stacks.md#undeploy-stacks).

### Examples

Undeploy all deployment targets:

```bash
tkm targets undeploy
```

Undeploy only targets that belong to a deployment group `MyGroup` or to any other deployment group under it:

```bash
tkm targets undeploy MyGroup
```

Undeploy only the deployment target named `my-target`:

```bash
tkm targets undeploy --target my-target
```
