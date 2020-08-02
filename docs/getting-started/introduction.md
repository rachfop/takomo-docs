---
id: introduction
title: Introduction
---

Takomo makes it easy to organize, parameterize and deploy your CloudFormation stacks across multiple regions and accounts. In addition to stacks, you can also manage accounts, organizational units and service control policies that belong to your AWS organization.

Takomo was inspired by Cloudreach’s excellent [Sceptre](https://sceptre.cloudreach.com/), a CloudFormation wrapper tool built with Python, and [Terraform](https://www.terraform.io/) built by Hashicorp.

## Motivation

[AWS CloudFormation](https://aws.amazon.com/cloudformation/) is a great tool to manage AWS infrastructure but as a low-level tool it's not sufficient alone to manage deployments spanning multiple regions and accounts. There exists many tools that do a good job generating and deploying CloudFormation templates but lack crucial features needed to handle large-scale deployments.

[AWS organizations](https://aws.amazon.com/organizations/) is the way to go when building something bigger where multiple accounts are needed. Of course, managing the organization requires its own tooling, and for this AWS provides [AWS Control Tower](https://aws.amazon.com/controltower/) and [AWS Landing Zone](https://aws.amazon.com/solutions/aws-landing-zone/). The former is a managed service that works well when not much customization is needed, and the latter is an AWS solution that allows greater level of customization but requires extensive knowledge of internal workings of the solution itself.

Takomo was created to overcome challenges that arise when one needs to manage a complex AWS infrastructure with inter-stack dependencies spanning across multiple accounts and regions.