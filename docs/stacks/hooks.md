---
id: hooks
title: Hooks
description: Hooks are used to perform actions in different stages of stack operations
keywords:
  - Takomo
  - hooks
---

Hooks are used to perform actions in different stages of stack operations. You can use them for example to compile and package lambda functions or notify whenever a deployment completes.

There can be different types of hooks. When configuring a hook you give it a name and specify which hook type it is.

## Hook Execution

Hooks are executed in the order they are defined. If one hook fails, the whole stack operation with any remaining hooks is aborted and deemed as failure. Hook configuration is used to determine when the hook should be executed. For example. you can configure the hook to be executed only before an existing stack is updated.   

## Hook Configuration

You configure hooks in stack configuration using following properties.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| name | yes | string | Name of the hook. |
| type | yes | string | Type of the hook. |
| operation | no | string or string[] | Stack operations during which the hook is executed. Supported values are:<br/><br/><ul><li>create - The hook is executed when a new stack is created</li><li>update - The hook is executed when an existing stack is updated</li><li>delete - The hook is executed when an existing stack is deleted</li></ul> By default, the hook is executed in every stack operation. |
| stage | no | string or string[] | Stack operation stages during which the hook is executed.<br/><br/><ul><li>before - The hook is executed before the stack operation</li><li>after - The hook is executed after the stack operation</li></ul> By default, the hook is executed in every stage. |
| status | no | string or string[] | Stack operation results during which the hook is executed.<br/><br/><ul><li>success - The hook is executed when the stack operation succeeded</li><li>failed - The hook is executed when the stack operation failed</li><li>skipped - The hook is executed when the stack operation was skipped</li><li>cancelled - The hook is executed when the stack operation was cancelled</li></ul> By default, the hook is executed in every status. Status is available only when stage is after. |

In addition to the aforementioned properties, different hook types can have properties of their own.

## Sharing Data Between Hooks

Hooks can expose values to other hooks by returning a [detailed hook output object](#hook-output). The returned value is stored with a hook's name in a mutable variables object that is then passed to the subsequent hooks. The mutable variables object is discarded after the current stack operation is completed. The exposed data is not visible to hooks executed in other stacks.

## Built-in Hooks

There is one built-in hook:

- [Command Hook](#command-hook)

### Command Hook

Executes a shell command given in `command` property. Exposes the following environment variables to the shell command:

| Name | Description |
| ---- | ----------- |
| TKM_COMMAND_STAGE     | The current stack operation stage. |  
| TKM_COMMAND_OPERATION | The current stack operation. |
| TKM_COMMAND_STATUS    | The current stack operation status, not present in before stage |

Any output the hook prints to the stdout is captured and exposed for other hooks.

#### Properties

Here are the properties available for Command hook:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| type    | yes | string | Type of the hook, this must be **cmd**. |
| name    | yes | string | Name of the hook. |
| command | yes | string | Shell command to execute. |
| cwd     | yes | string | The working directory from where the shell command is executed. |

## Implementing Custom Hooks

You can provide your own custom hooks by placing plain JavaScript files, with `.js` file extension, into `hooks` directory. Each file must export a [hook provider](#hook-provider) object that is used to initialize the actual hook. You can use all language features available in Node 14.4.0.

### Hook Provider

Hook provider has the following properties:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| type | yes | string   | Type of the hook |
| init | yes | function | A function that initializes the hook with properties given in a stack group or stack configuration file. The function can be either synchronous or asynchronous, and must return an instantiated [hook object](#hook) |

### Hook

Hook has the following properties:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| execute | yes | function | A function that is invoked with an [hook input object](#hook-input) when the hook is executed. The function can be synchronous or asynchronous and must return a [hook output](#hook-output). |

### Hook Input

Hook input has the following properties:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| stage     | yes | string | Current stack operation stage. Possible values are:<br/><br/><ul><li>before - The hook is being executed before the stack operation</li><li>after - The hook is being executed after the stack operation</li></ul> |
| operation | yes | string | Current stack operation. Possible values are:<br/><br/><ul><li>create - The hook is being executed when a new stack is being created</li><li>update - The hook is being executed when an existing stack is being updated</li><li>delete - The hook is being executed when an existing stack is being deleted</li></ul> |
| status    | yes | string | Current stack operation status. Possible values are:<br/><br/><ul><li>success - The hook is being executed after a successful stack operation</li><li>failure - The hook is being executed after a failed stack operation</li><li>skipped - The hook is being executed after a skipped stack operation</li><li>cancelled - The hook is being executed after a cancelled stack operation</li></ul>This is defined only when the stage is `after`.  |
| variables | yes | string | Mutable variables object containing command line and environment variables. The hook can modify existing variables and add new ones. After the hook is completed, the same variables object is passed to the subsequent hooks which can then access its contents. If the stack's template is `.hbs` file, the same variables are also usable there. |
| ctx       | yes | string | Command context object |
 
### Hook Output

Hook output is used to determine if the hook execution was successful and to share data between hooks. It can be either a `boolean`, an `Error` which is always considered as failure, or a detailed object with the following properties:

 | Key | Required | Type | Description |
 | --- | -------- | ---- | ----------- |
 | success | yes | boolean | A boolean determining if the hook execution was successful. |
 | message | no | string | An informative message about the hook execution outcome. |
 | value   | no | any | A value to be exposed to other hooks. |
 
### Example

This example hook prints some debug information to console.

Our file structure looks like this:

```
.
├─ stacks
|  └- my-stack.yml
├- hooks
|  └- debug.js
└- templates
   └- my-stack.yml
```

The hook provider defined in `hooks/debug.js` looks like this:

```javascript title="hooks/debug.js"
module.exports = {
  type: "debug",
  init: (props) => {
    console.log("Initialize debug hook");
    return {
      execute: (input) => {
        console.log("Execute debug hook!");
        console.log(`Stage:     ${input.stage}`);
        console.log(`Operation: ${input.operation}`);
        console.log(`Status:    ${input.status}`);
        console.log(JSON.stringify(props, null, 2));
        
        return {
          message: "OK",
          success: true,
          value: "Did some debugging"
        };
      }
    }
  }
};
```

Our custom hook is used in the stack configuration like so:

```yaml title="stacks/my-stack.yml"
hooks:
  - name: my-hook
    type: debug
```

When executed, the hook exposes string **"Did some debugging"** in the mutable variables object.

## See Also

- [hooks property in config reference](/docs/config-reference/stacks#hooks)
