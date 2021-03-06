---
id: quick-start
title: Quick Start
description: How to create a simple CloudFormation stack with Takomo
keywords:
  - Takomo
---

Before diving deeper into the documentation, let's first see how to create a simple CloudFormation stack using Takomo.

## Installation

Initialize a new NPM project and add Takomo as a development dependency:

```bash
npm init -y
npm install -D takomo 
```

## Credentials

You need to have valid AWS credentials configured. Create a profile named **takomo-example** in your **~/.aws/credentials** file:

```bash
[takomo-example]
aws_access_key_id = XXXXXXXXXXXXXXXXXXXX
aws_secret_access_key = YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```

You can also provide credentials using some other method described [here](/docs/general/credentials), but rest of this quick start guide assumes that you are using the **takomo-example** profile.

:::tip Initializing a new Takomo project using CLI

The rest of this quick start guide describes how to create all the needed directories and files manually. If you just want to try out how to deploy infrastructure with Takomo, you can initialize a new project and create the files using the following command:

```bash
npx tkm init --create-samples
```

:::

## Stack Configuration

Our stack contains a VPC whose CIDR range can be parameterized. First, we need to create the **stacks** directory that will host all stack configurations. Create the directory and add a file named **vpc.yml** with the following contents:

```yaml title="stacks/vpc.yml"
regions: eu-west-1
parameters:
  CidrBlock: 10.0.0.0/24
```

## Stack Template

Next, we need to provide a CloudFormation template for our stack. Create the **templates** directory next to the stacks directory, and add a file named **vpc.yml** with the following contents:

```yaml title="templates/vpc.yml"
Description: My VPC
Parameters:
  CidrBlock:
    Type: String
    Description: VPC CIDR block
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: !Ref CidrBlock
```

## Directory Structure

Now, you should have the following files in place:

```bash
.
├─ stacks
│  └─ vpc.yml
└─ templates
   └─ vpc.yml
```

## Stack Deployment

Alright, we are ready to deploy our stack. Change to the project root directory and run:

```bash
npx tkm stacks deploy --profile takomo-example
```

Review the changes and continue to deploy the stack.

## Clean Up

You can delete the stack with this command:

```bash
npx tkm stacks undeploy --profile takomo-example
```

## Next steps

Continue to [the next section](/docs/general/directory-structure) to learn the basics of how Takomo works. 