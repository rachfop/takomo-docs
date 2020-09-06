---
id: common-options
title: Common Options
description: Common options for Takomo command line
keywords:
  - Takomo
  - CLI
---

These options are supported by all CLI commands unless stated otherwise.

## Assume Yes

Pass `--yes` or `-y` option to answer yes to all questions.

## AWS Profile

Use `--profile <profile>` option to choose which AWS profile to use.

## Display Help

Pass `--help` option to display help. Command specific helps include also the minimum IAM permissions needed to run the command.

## Display Takomo Version

Pass `--version` option to print version information.

## Environment Variables

Use `--env-file <path-to-environment-variables-file>` to load environment variables from a file. The loaded variables override existing variables with the same name. This option can be used multiple times.

The environment variables must be defined in a format accepted by [dotenv](https://www.npmjs.com/package/dotenv), like so:

```properties
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

## Load AWS SDK Config

Use --load-aws-sdk-config to prefer loading credentials from configuration file over the credentials file. Passing this option will enable loading the profile from **~/.aws/config** file.

## Log Confidential Information

By default, environment variables and confidential parameter values are concealed from logs. Override this default by passing `--log-confidential-info`.

## Logging Level

Use `--log <level>` option to choose the logging level.

Supported values are:

- trace
- debug
- info (default)
- warn
- error

## Project Dir

Use `--dir <directory>` or `-d <directory>` option to define the directory from where Takomo loads configuration.

## Statistics

Use `--stats` option to print statistics information of the executed command.

## Variables

Pass `--var` option to provide variables that can be used in Handlebars templates. This option can be used multiple times.

Pass a single variable and store it to a variable with the given name.

```bash
--var <variable-name>=<variable-value>
```

Variables can be read from files and assigned to a variable. Contents of .yml and .json files are deserialized, and contents for other types of files are read to a string as is.

```bash
--var-file <variable-name>=<path-to-variable-file>
```

Example:

```bash
--var-file myVariables=/home/variables.yml
```

The variable name can be omitted for .yml and .json files as long as the file content can be deserialized to an object. The deserialized object is then stored to the top-level of variables.

```bash
--var-file <path-to-variable-file>
```

Example:

```bash
--var-file my-config.json
```

Variables are merged recursively.

Variable from files are loaded first in the order they are defined, and then other variables also in the definition order.
