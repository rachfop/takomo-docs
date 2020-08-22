---
id: deploying-organization
title: Deploying Organization
---

You use [deploy organization](/docs/command-line-usage/organization#deploy-organization) command to deploy the local configuration defined in `organization.yml` file. This includes policies, trusted aws services, organizational units hierarchy and member accounts’ placement in it.

## Command Line Usage

Deploy the organization:

```
tkm org deploy
```

You can review the deployment plan and decide if you want to proceed with the deployment.

Refer to [command line usage guide](/docs/command-line-usage/organization#deploy-organization) for detailed documentation of this command and its supported options.

## What Happens During the Deployment?

The deployment process is divided in the following phases that are executed sequentially.

| Phase | Description |
| ----- | ----------- |
| Load organization state | Load information needed to build the deployment plan. |
| Build deployment plan | Compare the current organization state to the local configuration to build the deployment plan. |
| Enable trusted AWS services | Enable access to the trusted AWS services that are enabled in the local configuration but not in the organization. |
| Enable policy types | Enable policy types that are enabled in the local configuration but not in the organization. |
| Create or update policies | Create policies that are found from the local configuration but not from the organization. Update policies that are found from the organization and modified in the local configuration.  |
| Arrange organizational units and accounts | Add or remove organizational units, and move member accounts to correct organizational units in order to make the organizational units hierarchy to match with the one found from the local configuration. |
| Delete policies | Delete policies found from the organization but not from the local configuration. | 
| Disable policy types | Disable policy types that are enabled in the organization but not in the local configuration. | 
| Disable trusted AWS services | Disable access to trusted AWS services that are enabled in the organization but not in the local configuration. | 

## See Also

- [Command line usage > Deploy organization](/docs/command-line-usage/organization#deploy-organization)