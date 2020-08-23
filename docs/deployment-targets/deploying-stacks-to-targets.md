---
id: deploying-stacks-to-targets
title: Deploying Stacks to Targets
description: Deploying stacks to deployment targets
keywords:
  - Takomo
---

Stacks to deploy to deployment targets are defined with config sets. Config sets build on top of Takomo’s standard stack configuration and deployment features.

## Configuring Stacks

You configure the stacks to be deployed to your deployment targets the same way you would normally configure stacks with Takomo, i.e. you create stack groups, stack configurations and templates. If you are unfamiliar with how to do this, you might want to consult [the documentation](/docs/stacks/introduction) before moving on.

## Config Sets

Once you have your stacks configuration ready, you use config sets to specify which of the stacks should be deployed together. You can have multiple config sets and each config set can have one or more command paths that specify which stacks to deploy.

You define config sets with `configSets` property. It's an object where keys are config set names and values objects containing configuration for the corresponding config set. Each config set must have a `name` that is used to refer to it from other parts of the organization configuration, and a `description` to document its purpose. The command paths are specified with `commandPaths` key.

### Example: Defining config sets

Let's see how to use config sets to specify which stacks should be deployed together. 

We have the following directory structure:

```
.
├─ stacks
|  ├─ networking
|  |  └- vpc.yml
|  └- application
|     └- beanstalk-app.yml
└- deployment
   └- targets.yml
```

For brevity, only the essential files are listed above. The stacks are grouped by their role - there are stacks for networking and logging.
 
Next, we defined some config sets in `targets.yml` file:
 
```yaml title="targets.yml"
configSets:
  networking:
    description: Base networking
    commandPaths:
      - /networking
  application:
    description: Our web application
    commandPaths:
      - /application
```

There is one config set for networking and another for application. The former includes **/networking/vpc.yml** stack and the latter **/application/beanstalk-app.yml**.

## Attaching Config Sets to Deployment Groups and Targets

Once you have the config sets thought out and configured, you need to determine to which deployment targets you want to deploy them. You do this by attaching config sets to deployment groups and targts. When you attach a config set to a deployment target, it becomes attached to all deployment targets that belong to the deployment group, and is also inherited by all child deployment groups. 

### Example: Attaching config sets

Let's continue from the example above. We attach the config sets as follows:

```yaml title="targets.yml"
deploymentGroups:
  SharedService:
    configSets:
      - networking
    targets:
      - name: shared-services-account
  Environments:
    configSets:
      - networking
      - application
    targets:
      - name: dev
      - name: test
      - name: prod
```

We attached **networking** config set to **SharedService** and **Environments** deployment groups from where it's inherited by the deployment targets of the both deployment groups. Then, we attached **application** config set only to **Environments** deployment group.

## Setting Deployment Role

By default, the config sets are deployed to deployment targets using AWS credentials in the current terminal session. You can specify a separate deployment role that Takomo will assume and use to deploy config sets to the deployment targets.

You specify the deployment role either in deployment targets or in deployment groups using `deploymentRole` key. The deployment role given in a deployment group is inherited by its children and deployment targets that belong to it.

It's important to notice that the deployment role must be a full IAM role ARN.

### Example: Setting the deployment role

Here's how you set the deployment role.

```yaml title="targets.yml"

deploymentGroups:
  SharedService:
    targets:
      - name: shared-services-account
        deploymentRole: arn:aws:iam::123456789012:role/Administrator
  Environments:
    deploymentRole: arn:aws:iam::123456789012:role/ApplicationDeployer
    targets:
      - name: dev
      - name: test
      - name: prod
```

## Using Variables

You can define variables that will be passed to stacks when config sets are deployed. Variables can be defined at the top-level of the deployment configuration, and under deployment groups units and targets.

Deployment groups units inherit and can override variables from the top-level, and deplyment targets, in turn, inherit and can override variables from the deployment group they belong to.

### Example: Defining Variables

Here's an example how to defined variables.

```yaml title="targets.yml"
vars:
  settings:
    debug: true
    logLevel: info
  region: eu-west-1

deploymentGroups:
  SharedService:
    vars:
      settings:
        debug: false
    targets:
      - name: shared-services-account
        vars:
          foo: bar
          vpcCidr: 10.0.0.0/22
```

Variables for deployment target **shared-services-account** look like this:

```
vars:
  settings:
    debug: false
    logLevel: info
  region: eu-west-1
  foo: bar  
  vpcCidr: 10.0.0.0/22
```

These variables are then available in stack configuration files and could be used like so:

```yaml
regions: {{ var.region }}
parameters:
  EnabledDebug: {{ var.settings.debug }}
  LogLevel: {{ var.settings.logLevel }}
  Cidr: {{ var.vpcCidr }}
data:
  foo: {{ var.foo }}
```

## Controlling Deployment Order

When the config sets are deployed, the deployment groups hierarchy is traversed recursively starting from the root deployment groups. By default, the child deployment groups are sorted by their name. For each deployment group, the deployment targets that belong to it are processed one at a time, in the order they are defined, and stacks specified by the config sets attached to the account are deployed. 

You can use `priority` property to control the order deployment groups' children are processed. It accepts a number that is used to sort the children to ascending order. Deployment groups without `priority` are sorted by their name and processed after the ones with `priority` set.

### Example: Setting deployment group priority

Because **Website** has its priority set, the deployment groups are processed in this order: Website, Application. Otherwise the order would be Application, Website.

```yaml title="targets.yml"
deploymentGroups:
  Application: {}
  Website:
    priority: 1
```

## Excluding Deployment Targets from Deployment

Sometimes you might want to exclude some deployment targets from deployment. You can exclude a deployment targets from deployment by setting its `status` to `disabled`. You can also exclude a whole deployment group and all its children by setting the deployment group `status` to `disabled`. 

### Example: Excluding deployment targets

In this example, we have disabled deployment group **All/Environments/Dev** which prevents deployment to its targets **foo** and **bar**. We have also disabled deployment target **baz**.

```yaml title="organization.yml"
organizationalUnits:
  All:
    targets:
      - name: acme
  All/Environments/Dev:
    status: disabled
    targets:
      - name: foo
      - name: bar
  All/Environments/Prod:
    targets:
      - name: fuz
      - name: baz
        status: disabled
```

## Command Line Usage

The config sets are deployed to deployment targets [deploy targets](/docs/command-line-usage/deployment-targets#deploy-targets) command.

```
tkm targets deploy
```

The config sets are undeployed, i.e. the stacks defined in the config sets are removed, with [undeploy targets](/docs/command-line-usage/deployment-targets#undeploy-targets) command.

```
tkm targets undeploy
```

Both commands lets you review the deployment plan and decide whether you want to proceed with the deployment.

## See Also

- [Command line usage > Deploy targets](/docs/command-line-usage/deployment-targets#deploy-targets)
- [Command line usage > Undeploy targets](/docs/command-line-usage/deployment-targets#undeploy-targets)
