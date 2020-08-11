---
id: organizational-units
title: Organizational Units
---
Organizational units are configured using `organizationalUnits` property. The configuration is an object where keys are organizational unit paths and values are configuration for the corresponding organizational unit.

## Hierarchy of Organizational Units

Organizational units form a tree-like hierarchy but to keep the configuration simple and manageable all organizational units are presented at the same level and the hierarchy can be read from paths of the organizational units.

An organizational unit path is formed by collecting all parents of the organizational unit starting from the root and then joining them with a forward slash.

The Root organizational unit is always required and the maximum depth of the hierarchy is 5.

#### Example: Defining an empty Root organizational unit:

In YAML, you use `{}` to specify an empty object.

```yaml title="organization.yml"
organizationalUnits:
  Root: {}
```

#### Example: A root organizational unit with some child organizational units under it:

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

As seen in this example, you don't have to explicitly provide configuration for all organizational units. Organizational unit `Root/Environments` has three children but doesn't have other configuration of its own. It's also worth noting that the path needs to be quoted if some organizational unit name in it has spaces.

## See also

- [Config reference > organizationalUnits](docs/config-reference/organization#organizationalUnits)