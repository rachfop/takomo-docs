---
id: project
title: Project
description: CLI commands to manage Takomo project
keywords:
  - Takomo
  - CLI
---

## Initialize a New Project

Initialize a new Takomo project. Creates standard Takomo project structure and minimal configuration files.

### Usage

```
tkm init [--create-samples] [--project] [--regions]
```

### Choosing Project Name and Regions

Optionally, you can use `--project` to specify the project name, and `--regions` to specify the regions. This information will be prompted if not given from the command line.

### Creating Sample Stacks

Pass `--create-samples` option to create sample stacks used also in Quick Start.


### Examples

Initialize a new project to the current directory:

```
tkm init 
```

Initialize a new project to the current directory and create sample stacks:

```
tkm init --create-samples
```

Initialize a new project to `/var/projects` directory:

```
tkm init -d /var/projects
```
