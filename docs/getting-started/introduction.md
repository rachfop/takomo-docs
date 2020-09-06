---
id: introduction
title: Introduction
slug: '/'
description: Takomo makes it easy to organize, parameterize and deploy your CloudFormation stacks across multiple regions and accounts
keywords:
  - Takomo
  - AWS
  - CloudFormation
  - Organizations
---

Takomo makes it easy to organize, parameterize and deploy your CloudFormation stacks across multiple regions and accounts. In addition to stacks, you can also manage accounts, organizational units and service control policies that belong to your AWS organization.

Takomo was inspired by Cloudreach’s excellent [Sceptre](https://sceptre.cloudreach.com/), a CloudFormation wrapper tool built with Python, and [Terraform](https://www.terraform.io/) created by Hashicorp.

## Motivation

[AWS CloudFormation](https://aws.amazon.com/cloudformation/) is a great tool to manage AWS infrastructure, but as a low-level tool, it's not sufficient alone to manage deployments spanning multiple regions and accounts. Many tools do a good job generating and deploying CloudFormation templates but lack crucial features to handle large-scale deployments.

[AWS Organizations](https://aws.amazon.com/organizations/) is the way to go when building something where multiple accounts are needed. Of course, managing the organization requires its own tooling, and for this AWS provides [AWS Control Tower](https://aws.amazon.com/controltower/) and [AWS Landing Zone](https://aws.amazon.com/solutions/aws-landing-zone/). The former is a managed service that works well when not much customization is needed. The latter is an AWS solution that allows a greater level of customization but requires extensive knowledge of its internal workings

Takomo was created to overcome challenges that arise when managing a complex AWS infrastructure with inter-stack dependencies across multiple accounts and regions.

## Features

Here are some of Takomo's key features.

#### CloudFormation Stack Configuration

Provide configuration to your CloudFormation stacks including, input parameters, tags, region, timeouts and more. Use outputs from other stacks as input parameters to your stacks, even if the source stacks reside in different accounts or regions.

#### CloudFormation Stack Deployment

Deploy your CloudFormation stacks across multiple regions and accounts.

#### Dynamic Templates

Take advantage of dynamic templating and avoid repetitive configuration and
copy-pasting in CloudFormation templates.

#### AWS Organizations Management

Manage organizational units, service control and tag policies. Quickly create new AWS accounts and deploy infrastructure to them.

#### Safe

Avoid mistakes by reviewing changes to the configuration before deployment. Take advantage of safety features that prevent deployments to the wrong environments
and accounts.

#### Secrets Management

Store your secrets, such as passwords and API keys, in AWS Parameter Store, and use them as input parameters for your CloudFormation stacks.

#### Extensible

Plug in your own JavaScript code to extend the core features.

#### Continuous Integration

Easily integrate Takomo to your CI pipeline.
