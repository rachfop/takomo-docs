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

CloudFormation stacks that Takomo should manage are defined using configuration files located in `stacks` directory. When a Takomo command targeting the stacks is run, Takomo first loads the configuration files to build local state, then queries target accounts to find out which stacks are already deployed and uses this information to build remote state, and finally, compares these two states to create an execution plan that contains operations needed to bring the local state to match with the remote.

For example, when deploy stacks command is run, Takomo updates stacks that are found from both the local and remote states. It then creates new stacks for the ones that are found only in the local state but not in the target accounts.

## There Is No State

It’s important to understand that Takomo doesn't store the infrastructure’s state or operations it has executed anywhere. It relies solely on information found from the configuration files to match locally defined stacks with the ones found in the target accounts.