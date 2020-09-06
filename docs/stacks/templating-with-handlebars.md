---
id: templating-with-handlebars
title: Templating with Handlebars
description: Templating with Handlebars
keywords:
  - Takomo
  - handlebars
  - templating
---

Sometimes static configuration files and templates are not enough to solve the real-life problems we might face. To help overcome those trickier challenges and avoid tedious and error-prone repeating of configuration, Takomo supports dynamic templating with [Handlebars](https://handlebarsjs.com/). All standard Handlebars features are available, which means you can use loops, if-conditions, partial includes, helpers, variables to streamline your configuration.

Stack and stack group configuration files are always processed as dynamic Handlebars templates. By default, stack template files in the **templates** directory are not treated as dynamic Handlebars templates, but you can enable it by using **.hbs** file extension.

## Partials

Each file in the **partials** directory or its subdirectories can be used as a Handlebars partial.

#### Example

If the **partials** directory contains a file named **my-partial.hbs**, you can include it as a partial in a configuration file like so:

```yaml
{{> my-partial.hbs }}
```

## Helpers

Custom Handlebars helpers can be registered by adding **.js** files to the **helpers** directory. These files must be valid JavaScript files and export two properties: **name** and **fn**. The former is the name for the helper, and the latter is the actual helper function.

#### Example

If the **helpers** directory contains a file named **to-upper-case.js** with following contents:

```javascript title="helpers/to-upper-case.js"
module.exports = {
  name: "to-upper-case",
  fn: (str) => str.toUpperCase(),
};
```

Then, it could be used in a template file like so:

```yaml
Resources:
  User:
    Type: AWS::IAM::User
    Properties:
      UserName: {{ to-upper-case 'Roger Moore' }}
```

And the final template would look like this:

```yaml
Resources:
  User:
    Type: AWS::IAM::User
    Properties:
      UserName: ROGER MOORE
```

## Variables from Command Line

You can pass variables from command line using `--var` and `--var-file` options. Both options can be used multiple times. Variables are exposed via **var** variable.

### Simple Named Variables

Use `--var` option to pass a single named variable from the command line.
 
#### Example: Named Variable

Provide a single variable named **myVariable** with value **hello**:

```
--var myVariable=hello
```

This variable can be used in configuration like so:

```yaml
Resources:
  LogGroup:
    Type: AWS::Logs::LogGroup
    LogGroupName: {{ var.myVariable }}
``` 

### Variables from Files

Use `--var-file` option to load variables from a file. If the file extension is **.json** or **.yml**, the file is first parsed into an object which is then stored to a variable. If the file extension is something else, the contents are just read into a variable.

The variable name can be omitted for **.yml** and **.json** files as long as the file contents can be deserialized to an object. The deserialized object is then stored to the top-level of variables.

#### Example: Read File Contents to a Variable  

If the project directory contains a file named **commit.txt**, we can read its contents into a variable named **commitHash** like so:

```bash
--var-file commitHash=commit.txt
```

#### Example: Deserialize File Contents to a Variable

Say, we have a file **/home/variables.yml** with valid YAML contents:

```yaml title="/home/variables.yml"
name: James
age: 55
permissions:
  - create
  - delete
  - update
```

We can deserialize its contents to a variable named **myVariable** like so:

```
--var-file person=/home/variables.yml
```

And then use the variable in the configuration like so:

```yaml
parameters:
  UserName: {{ var.person.name }}
  UserAge: {{ var.person.age }}
``` 

#### Example: Deserialize File Contents to a Top-Level of Variables

Say, we have a file **properties.json** with valid JSON contents:

```yaml title="properties.json"
{
  "color: "red",
  "foo": {
    "bar": true
  }
}
```

We can deserialize its contents to top-level of variables:

```
--var-file person=/home/variables.yml
```

And then use the variables in the configuration like so:

```yaml
parameters:
  Color: {{ var.color }}
  FooBarEnabled: {{ var.foo.bar }}
``` 

### Loading Order and Merging of Variables

Variables from files are loaded first in the order they are defined, and then the named variables also in the definition order. Variables defined later will override previously loaded variables with the same name. Complex variables are merged recursively.

#### Example: Overriding Variables

Say, we have a JSON file that defines some basic settings:

```json title="base.json"
{
  "color": "blue",
  "width": 100,
  "settings": {
    "debug": true
  }
}
```

We also have another file that contains environment-specific settings:

```json title="prod.json"
{
  "settings": {
    "debug": false
  }
}
``` 

We can load both settings files and also override and extend the loaded configuration using named variables:

```
--var-file base.json --var-file prod.json --var color=yellow --var height=200
```

The final variables object would look like this:

```
{
  "color": "yellow",
  "width": 100,
  "height": 200,
  "settings": {
    "debug": false
  }
}
```

## Environment Variables

All system environment variables are exposed via the **env** variable.

#### Example

Printing the **HOME** environment variable somewhere in the configuration:

```yaml
Home dir is {{ env.HOME }}
```

## Variables Available in Files

Different files have their own available variables. 

### Stack Group Configuration

The following variables are available in stack group configuration files.

| Key | Type | Description |
| --- | ---- | ----------- |
| var | object | Variables from the command line. |
| env | object |Environment variables. |
| context | object | An object containing context variables. |
| context.projectDir | string | Current project directory. |
| stackGroup | object | An object representing the current stack group. |
| stackGroup.path | string | Path of the stack group. |
| stackGroup.pathSegments | string[] | Path of the stack group split into an array using **/** as a separator. |
| stackGroup.name | string | Name of the stack group. |

### Stack Configuration

The following variables are available in stack configuration files.

| Key | Type | Description |
| --- | ---- | ----------- |
| var | object | Variables from the command line. |
| env | object | Environment variables. |
| context | object |  An object containing context variables. |
| context.projectDir | string | Current project directory. |
| stackGroup | object | An object representing the stack group where the stack belongs to. |
| stackGroup.path | string | Path of the stack group. |
| stackGroup.pathSegments | string[] | Path of the stack group split into an array using **/** as a separator. |
| stackGroup.name | string | Name of the stack group. |
| stackGroup.project | string | Project of the stack group. |
| stackGroup.regions | string | Regions of the stack group. |
| stackGroup.commandRole | string | Command role of the stack group. |
| stackGroup.capabilities | string[] | Capabilities of the stack group. |
| stackGroup.isRoot | boolean | Is the stack group the root. |
| stackGroup.templateBucket | object | Template bucket configuration of the stack group. |
| stackGroup.templateBucket.name | string | Name of the template bucket. |
| stackGroup.templateBucket.keyPrefix | string | Key prefix of the template bucket. |
| stackGroup.timeout | object | Timeout configuration of the stack group. |
| stackGroup.timeout.create | number | Create timeout in seconds. |
| stackGroup.timeout.update | number | Update timeout in seconds. |
| stackGroup.data | object | Data object of the stack group. |
| stackGroup.tags | object | Stack tags of the stack group. |
| stackGroup.accountIds | string[] | Account ids of the stack group. |
| stack | object | An object representing the stack. |
| stack.path | string | Path of the stack without the region specified. |
| stack.pathSegments | string[] | Path of the stack without the region specified split into an array using **/** as a separator.  |
| stack.configFile | object | An object representing configuration file of the stack. |
| stack.configFile.name | string | Name of the stack configuration file without the file extension. |
| stack.configFile.basename | string | Name of the stack configuration file including the file extension |
| stack.configFile.filePath | string | File path of the stack configuration file relative to stack directory. |
| stack.configFile.dirPath | string | File path to the directory containing the stack configuration file relative to stack directory. |

### CloudFormation Template

The following variables are available in CloudFormation template files with **.hbs** file extension.

| Key | Type | Description |
| --- | ---- | ----------- |
| var | object | Variables from the command line. |
| env | object | Environment variables. |
| context | object |  An object containing context variables. |
| context.projectDir | string | Current project directory. |
| hooks | object | An object containing values returned by hooks |
| stack | object | An object representing the current stack |
| stack.path | string | Path of the stack. |
| stack.pathSegments | string[] | Path of the stack split into an array using **/** as a separator. |
| stack.project | string | Project of the stack. |
| stack.name | string | Name of the stack. |
| stack.region | string | Region of the stack. |
| stack.commandRole | string | Command role of the stack. |
| stack.template | string | Template of the stack. |
| stack.templateBucket | object | Template bucket configuration of the stack. |
| stack.templateBucket.name | string | Name of the template bucket. |
| stack.templateBucket.keyPrefix | string | Key prefix of the template bucket. |
| stack.timeout | object | Timeout configuration of the stack. |
| stack.timeout.create | number | Create timeout in seconds. |
| stack.timeout.update | number | Update timeout in seconds. |
| stack.data | object | Data object of the stack. |
| stack.tags | object | Stack tags of the stack. |
| stack.accountIds | string[] | Account ids of the stack. |
| stack.depends | string[] | Dependencies of the stack. |
| stack.configFile | object | An object representing configuration file of the stack. |
| stack.configFile.name | string | Name of the stack configuration file without the file extension. |
| stack.configFile.basename | string | Name of the stack configuration file including the file extension |
| stack.configFile.filePath | string | File path of the stack configuration file relative to stack directory. |
| stack.configFile.dirPath | string | File path to the directory containing the stack configuration file relative to stack directory. |

