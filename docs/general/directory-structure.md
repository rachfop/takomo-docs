---
id: directory-structure
title: Directory Structure
description: Directory structure for Takomo configuration files
keywords:
  - Takomo
  - configuration
  - files
---
Takomo configuration files are placed in a **project directory**. The following is an example of a project directory:

```
.
├─ stacks
├─ templates
├─ helpers
├─ partials
├─ resolvers
├─ hooks
├─ deployment
└─ organization
```

The project directory should contain at least two subdirectories:
* **stacks** - the directory where configuration files for CloudFormation stacks go.
* **templates** - the directory where files for the stacks are located. 

Takomo supports using [Handlebars](https://handlebarsjs.com/) templating with configuration and CloudFormation template files. You can provide custom Handlebars helper functions and partial files by placing JavaScript files in the **helpers** and **partials** directories.

Parameter values for CloudFormation stacks can be resolved at deployment using parameter resolvers. Custom parameter resolvers can be provided by placing JavaScript files into the **resolvers** subdirectory.
 
It is possible to instruct Takomo to execute certain actions before and after deployments. These actions are called hooks, and just like with the parameter resolvers, custom hooks can be provided by placing JavaScript files into the **hooks** directory.

**deployment** and **organization** - directories meant to provide configuration for larger deployments and AWS organizations.
