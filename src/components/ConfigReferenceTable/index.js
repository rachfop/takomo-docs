import React from 'react';

const getOverriding = (value) => {
    switch (value) {
        case 'replace':
            return 'replace - the value completely replaces the inherited value';
        case 'merge':
            return 'merge - the value is merged with the inherited value';
        case 'unsupported':
            return "unsupported - the inherited value can't be overridden";
        case 'not applicable':
            return "not applicable - the value is not inherited from the parent stack";
        default:
            throw new Error(`Unsupported overriding value: ${value}`)
    }
}

const getInherited = (value) => {
    return value
        ? 'yes - the value is inherited from the parent stack group'
        : 'no - the value is not inherited from the parent stack group'
}

const getDefineIn = (value) => {
    switch (value) {
        case 'stack':
            return 'Can be defined only in stack configurations'
        case 'stack group':
            return 'Can be defined only in stack group configurations'
        case 'both':
            return 'Can be defined both in stack and stack group configurations'
        default:
            throw new Error(`Unsupported defined in value: ${value}`)
    }
}

export default ({ children, required, types, defaultValue, inherited, overriding, since, requirements, defineIn }) => (
    <table>
        <tr>
            <th>Since</th>
            <td>{ since ? since : 'v1.0.0' }</td>
        </tr>
        <tr>
            <th>Type</th>
            <td>
                { types.map(type => (<div>{type}</div>)) }
            </td>
        </tr>
        <tr>
            <th>Required</th>
            <td>{ required ? 'yes' : 'no' }</td>
        </tr>
        <tr>
            <th>Default</th>
            <td>{ defaultValue }</td>
        </tr>
        <tr>
            <th>Where to define</th>
            <td>
                { getDefineIn(defineIn) }
            </td>
        </tr>
        <tr>
            <th>Inherited</th>
            <td>{ getInherited(inherited) }</td>
        </tr>
        <tr>
            <th>Overriding</th>
            <td>{ getOverriding(overriding) }</td>
        </tr>
        <tr>
            <th>Requirements</th>
            <td>
            { requirements.length > 0
                ? <ul>{ requirements.map(requirement => <li>{ requirement }</li>) }</ul>
                : <div>none</div>
            }
            </td>
        </tr>
    </table>
);
