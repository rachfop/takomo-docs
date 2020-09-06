---
id: organizational-units
title: Organizational Units
description: Configuring organizational units
keywords:
  - Takomo
  - organization
---
Organizational units are configured using [organizationalUnits](/docs/config-reference/organization#organizationalunits) property. The configuration is an object where keys are organizational unit paths and values are configuration for the corresponding organizational unit.

## Hierarchy of Organizational Units

In an AWS organization, the organizational units form a tree-like hierarchy, but to keep things simple and manageable, they are presented at the same level in the configuration, and the hierarchy structure can be read from paths of the organizational units.

A path for an organizational unit is formed by traversing the hierarchy from the Root to the organizational unit in question and collecting organizational unit names between them. The names are then joined together with a forward slash.

The Root organizational unit is always required, and the maximum depth of the hierarchy is 5.

### Example: Defining an empty Root organizational unit:

In YAML, you use `{}` to specify an empty object.

```yaml title="organization.yml"
organizationalUnits:
  Root: {}
```

### Example: A root organizational unit with some child organizational units under it:

A more complex hierarchy might look like this:

```yaml title="organization.yml"
organizationalUnits:
  Root/Sandbox: {}
  Root/Environments/Dev: {}
  Root/Environments/Test: {}
  Root/Environments/Prod: {}
  "Root/Customer Accounts": {}
```

We can also present this hierarchy as follows: 

```
Root
├- Sandbox
├- Environments
|  ├- Dev
|  ├- Test
|  └- Prod
└- Customer Accounts
```

As seen in this example, you don't have to provide configuration for all organizational units explicitly. The organizational unit **Root/Environments** has three children but doesn't have other configuration of its own. It's also worth noting that the path needs to be quoted if some organizational unit name has spaces.

## See also

- [Config reference > organizationalUnits property](/docs/config-reference/organization#organizationalUnits)