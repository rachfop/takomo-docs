---
id: introduction
title: Introduction to Deployment Targets
description: Deployment targets offer a scalable and flexible way to deploy and remove Takomo configurations across multiple accounts and regions
keywords:
  - Takomo
---

Deployment targets offer a scalable and flexible way to deploy and remove Takomo configurations across multiple accounts and regions.

## Deployment Targets

A deployment target represents a target where to deploy Takomo configuration. There can be any number of deployment targets in the deployment configuration that can be located in different AWS accounts and regions.

## Deployment Groups

Deployment groups are used to group deployment targets that share similar configurations, which can be parameterized using variables. Deployment groups can be nested to create tree-like hierarchies where child groups inherit configuration from their parents. Also, deployment targets inherit configuration from the deployment group they belong to. Both the child deployment groups and deployment targets can also override all or parts of the configuration they inherit.
