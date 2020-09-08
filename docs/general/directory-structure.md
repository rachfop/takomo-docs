---
id: directory-structure
title: Directory Structure
description: Directory structure for Takomo configuration files
keywords:
  - Takomo
  - configuration
  - files
---
The directory where Takomo configuration files are placed is called **project directory** and looks like this:

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

At a minimum, the project directory needs to contain two subdirectories: **stacks** where configuration files for CloudFormation stacks go, and **templates**, where template files for the stacks are located.

Takomo supports using [Handlebars](https://handlebarsjs.com/) templating with configuration and CloudFormation template files. You can provide custom Handlebars helper functions and partial files by placing JavaScript files in the **helpers** and **partials** directories.

Parameter values for CloudFormation stacks can be resolved at deployment using parameter resolvers. Custom parameter resolvers can be provided by placing JavaScript files into the **resolvers** subdirectory.

It is possible to instruct Takomo to execute certain actions before and after deployments. These actions are called hooks, and just like with the parameter resolvers, custom hooks can be provided by placing JavaScript files into the **hooks** directory.

Finally, the two remaining directories, **deployment** and **organization**, are meant to provide configuration for larger deployments and AWS organizations.