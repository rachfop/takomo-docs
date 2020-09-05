---
id: introduction
title: Introduction to Stacks
description: Introduction to stacks
keywords:
  - Takomo
  - stacks
  - introduction 
---
Stack management provides commands to deploy, undeploy and list stacks. Takomo's other two core features - [Organizations](/docs/organizations/introduction) and [Deployment Targets](/docs/deployment-targets/introduction) - are built on top of it.

## How It Works?

CloudFormation stacks that Takomo should manage are defined using configuration files located in the **stacks** directory. When you run a Takomo command, the following steps are taken:

1. The configuration files are loaded and used to build a local state.
2. Stacks currently deployed to the target accounts are queried to construct a remote state.
3. The states are then compared to create an execution plan containing operations needed to bring the local state to match with the remote. 

For example, when you run the deploy stacks command, Takomo updates stacks found from both the local and remote states. It then creates new stacks for the ones found only in the local state but not in the remote.

## There Is No State

It's important to understand that Takomo doesn't store the infrastructure's state or operations it has executed anywhere. It relies solely on the configuration files' information to match locally defined stacks with the ones found in the target accounts.