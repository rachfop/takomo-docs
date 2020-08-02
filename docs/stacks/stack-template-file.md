---
id: stack-template-file
title: Stack Template File
---

CloudFormation template files for stacks are located in `templates` directory or its subdirectories. 

You specify the template file for a stack with `template` property. It accepts a relative file path to the template file in `templates` directory. If no `template` is given, the relative path to the stack configuration file in `stacks` directory is used.

Both the standard CloudFormation template file formats. i.e. **JSON** and **YAML**, are supported, but the file extension must be `.yml`, `.json` or `.hbs`. The last one is used to tell Takomo to treat the template file as a dynamic Handlebars template.

#### Example: Defining the Template File

Say, our project's file structure looks like this:

```
.
├─ stacks
|  └- application.yml
└- templates
   └- application-template.yml
```

In `application.yml` stack configuration file we define the `template` property like so:

```yaml title="stacks/application.yml"
template: application-template.yml
```

## Larger Template Files

By default, the maximum size for a CloudFormation template file is **51,200 bytes**. Using larger template files, up to **460,800 bytes**, requires that they are uploaded to an S3 bucket before deployment. This S3 bucket, where the template files should be uploaded, is configured with the `templateBucket` property which is an object with two properties: `name` and `keyPrefix`. The former is required and used to specify the name of the bucket, and the latter is optional and specifies the object key prefix under which the templates should be uploaded.

#### Examples: Defining the Template Bucket

Setting only the template bucket name:

```yaml
templateBucket:
  name: my-template-files
```

Setting the template bucket name and keyPrefix:

```yaml
templateBucket:
  name: my-template-files
  keyPrefix: my-templates/project-x/
```

## See Also

- [template property in config reference](docs/config-reference/stacks#template)
- [templateBucket property in config reference](docs/config-reference/stacks#templatebucket)