# JupiterOne Documentation

Guides, docs, and release notes for JupiterOne platform and apps.

The docs are published to Zendesk at <https://support.jupiterone.io/hc/en-us>.

## Tips for doc authors

### Admonitions

The `!!!` syntax is supported to render admonition styling. 

For example:

```markdown
!!! warning
     Text for the warning message
```

![image](https://user-images.githubusercontent.com/28784384/128935295-fcf54992-12a1-42f2-861f-e162abff8475.png)

Supported admonitions include `warning`, `note`, and `reference`.

### Code Styling

Use three back ticks followed by the code language for a code block/snippet.

For example: 

````markdown
```j1ql
FIND User as u that IS Person as p
RETURN u.username, p.firstName, p.lastName, p.email
```
````

This ensures a code lang chip is added to the code block styling. 

![image](https://user-images.githubusercontent.com/28784384/128935815-4ce73691-9d32-490a-8a75-2c0687e36d32.png)

### Line Breaks

Use an empty line between every line of text.

Use line breaks instead of relying on text wrapping.
