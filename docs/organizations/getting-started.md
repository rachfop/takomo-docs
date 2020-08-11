---
id: getting-started
title: Getting Started
---

Takomo can be used to manage any existing AWS organization. You can also create a new organization using CLI.

## Getting Started with a New Organization

If you don't have an existing organization, you can create one using [create organization](docs/command-line-usage/organization#create-organization) command:

```
tkm org create
``` 

This command uses the credentials found from the current terminal session to create a new organization and make the AWS account bound to the credentials as the master account of the organization. It will also create `organization` directory and inside it a file named `organization.yml` containing minimum configuration needed to manage the organization.

After running the command, you will have the following file structure:

```
.
└- organization
   └- organization.yml
```

Contents of the generated `organization.yml` file will look like this:

```yaml title="organization.yml"
masterAccountId: "<your aws account id>"
organizationalUnits:
  Root:
    accounts:
      - "<your aws account id>"
```

## Getting Started with an Existing Organization

If you have an existing organization, you will need to create required configuration files manually. You can start by copy-pasting the contents of `organization.yml` file shown above and setting `masterAccountId` with the id of your organization master account.

Next. you will need to make your local configuration to match with the current organization state. This means describing all organizational units, policies and member accounts in `organization.yml` file. Obviously, this can be quite an effort but [deploy organization command](docs/command-line-usage/organization#deploy-organization) will show you differences between your local configuration and the actual organization state. Once there are no changes to be executed, your configuration is completed.

## Organization Feature Set

AWS Organizations allows you to choose what features you want to have enabled. There are two options: `ALL` and `CONSOLIDATED_BILLING`. In most cases, `ALL` should be chosen because it enables many useful features such as authorization and management policies. The feature set is chosen when the organization is created, and can be changed at any time.

:::tip
If you create a new organization using [create organization](docs/command-line-usage/organization#create-organization) command, you can specify which feature set to use. Once the organization is created, you can change the feature set from AWS console or using AWS CLI.
:::

## Master Account Id

The organization master account needs to be defined in the organization configuration. Takomo uses this information to ensure that organization management operations target the correct AWS organization. Use `masterAccountId` property to define the master account.

#### Example: Setting the master account id

```yaml title="organization.yml"
masterAccountId: "123456789012"
```

## Credentials

When managing the AWS organization, you need to have credentials with sufficient permissions to manage the organization itself, and also to assume administrative role to all accounts that belong to the organization.

Basically this means that Takomo's organization management commands need to be run with credentials of an IAM user located in the organization master account.

### Organization Admin Role

By default, Takomo uses the credentials currently available in the terminal session to execute operations that query information from the organization and also alter its state. It is also possible to tell Takomo to use a specific IAM role to execute these organization management operations by setting the `organizationAdminRoleName` property in the organization configuration file.

#### Example: Setting the organization admin role name

```yaml title="organization.yml"
organizationAdminRoleName: "MyOrganizationAdminRole"
```

Please note that `organizationAdminRoleName` accepts a role name and not full role ARN.

## See Also

- [Command line usage > Create organization](docs/command-line-usage/organization#create-organization)
- [Config reference > masterAccountId](docs/config-reference/organization#masteraccountid)
- [Config reference > organizationAdminRoleName](docs/config-reference/organization.md#organizationadminrolename)
- [AWS documentation > Creating and managing an organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org.html)
- [AWS documentation > Enabling all features in your organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html)