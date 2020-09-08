---
id: configuring-stacks
title: Configuring Stacks
description: Configuring stacks
keywords:
  - Takomo
  - configuration
  - stacks
---

You create a configuration file in the **stacks** directory for each stack you want to manage with Takomo. Configuration files are in **YAML** format and should contain the configuration needed to deploy the corresponding stacks.

:::important
Takomo uses **.yml** file extension with YAML files.
:::

## Use Stack Groups to Define Common Configuration 

You can create more directories under the **stacks** directory to group stacks by environment, region, or another criterion. These directories are treated as stack groups and can provide common configurations for stacks that belong to them by placing a config.yml file into the directory. Individual stacks can override some or all of the configuration they inherit from their stack group.

:::note
There are some stack properties, like stack name and template, that can't be defined at the stack group level. Where each property can be defined is documented in [the configuration reference](/docs/config-reference/stacks).
:::

You can also nest stack groups to create a tree-like hierarchy where child stack groups inherit configuration from their parent. Like the stacks, they can override the configuration they inherit. 

The **stacks** directory itself is the root stack group and configuration defined in its **config.yml** file is therefore inherited by every stack and stack group.

#### Example: Project Structure 

Here is an example of how a Takomo project could look like. In the **stacks** directory, we have a **config.yml** file that contains configurations shared between all stack groups and stacks.

Then, we have two stack groups for application environments: **dev** and **prod**. Both the environments contain two stacks, which are defined in **application.yml** and **vpc.yml** files. The dev environment also has its **config.yml** file for configurations shared only with its stacks.

CloudFormation templates for the stacks are found from the **templates** directory - we'll get to that later.

```
.
├─ stacks
|  ├─ config.yml
|  ├─ dev
|  |  ├─ config.yml
|  |  ├─ application.yml
|  |  └─ vpc.yml
|  └- prod
|     ├─ application.yml
|     └─ vpc.yml
└─ templates
   ├─ application-template.yml
   └─ vpc-template.yml
```

## Identifying Stacks and Stack Groups

Stack groups and stacks are identified and can be referenced by their path. The paths are like file paths in *nix filesystem where the stacks directory is the filesystem root. The root stack group's path is **/**, and for any other stack group, it is the absolute file path to the stack group directory from the stacks directory.

The stack paths follow this same logic with one important difference. A stack's path is the absolute file path to its configuration file from the stacks directory, appended with a region specifier, that is a forward slash followed by the stack's region. The region specifier can be omitted if the stack has only one region.

:::info Stack regions
A stack can have one or more regions. The regions are defined in the stack's configuration file, which means more than one CloudFormation stack can be created from a single stack configuration file.
:::

## Command Path

A common name for both stack and stack group paths is the **command path**. The command path is used in many places in Takomo's configuration files and is accepted as input arguments by many CLI commands. Wherever a command path is required, you can always use either a stack or stack group path.

#### Example: Stack and Stack Group Paths

Let's continue from the previous example and say that the root stack configuration file **stacks/config.yml** specifies that all stacks should belong to **eu-west-1** region. Furthermore, let's say that the **dev** environment's **stacks/dev/config.yml** overrides the region to be **us-east-1**. With this configuration, stack and stack group paths would look like this:

```
.
├─ stacks                         # root stack group path: /
|  ├─ config.yml                  
|  ├─ dev                         # dev stack group path: /dev
|  |  ├─ config.yml               
|  |  ├─ application.yml          # dev application stack path: /dev/application.yml/us-east-1
|  |  └─ vpc.yml                  # dev vpc stack path: /dev/vpc.yml/us-east-1
|  └─ prod                        # prod stack group path: /prod
|     ├─ application.yml          # prod application stack path: /prod/application.yml/eu-west-1
|     └─ vpc.yml                  # prod vpc stack path: /prod/vpc.yml/eu-west-1
└─ templates
   ├─ application-template.yml
   └─ vpc-template.yml
```

## Available Properties

All properties available in stack configuration are documented in [stacks config file reference](/docs/config-reference/stacks).