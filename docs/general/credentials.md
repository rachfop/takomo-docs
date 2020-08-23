---
id: credentials
title: Credentials
description: Configuring AWS credentials
keywords:
  - credentials
  - Takomo
---
To do anything with Takomo, you need to have valid AWS credentials configured. Under the hood Takomo uses AWS JavaScript SDK to acquire the credentials. Take a look at [the SDK’s documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) to learn the ways you can configure credentials.

The easiest way to provide credentials when running Takomo on your local computer is to configure a profile in `~/aws/.credentials` file and then either export the profile name in `AWS_PROFILE` environment variable or pass it with `--profile` command line option.

You can also configure the profile in `~/.aws/config` file but then you also need to export `AWS_SDK_LOAD_CONFIG` environment variable or pass `--load-aws-sdk-config` command line option.

#### Examples

Provide the profile in an environment variable:

```bash
AWS_PROFILE=my-profile-name tkm stacks deploy
```

Provide the profile using `--profile` command line option:

```bash
tkm stacks deploy --profile my-profile-name
```

Load credentials from `~/.aws/config` with environment variables:

```bash
AWS_SDK_LOAD_CONFIG=1 AWS_PROFILE=my-profile-name tkm stacks deploy
```

Load credentials from `~/.aws/config` with command line options `--profile` and `--load-aws-sdk-config`:

```bash
tkm stacks deploy --profile my-profile-name --load-aws-sdk-config
```