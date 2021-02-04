# Integration with JupiterOne

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration expects a comma separated lists of
domains. For example:

```
google.com,facebook.com
```

## Data Model

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/master/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources | Entity `_type`    | Entity `_class` |
| --------- | ----------------- | --------------- |
| Domain    | `internet_domain` | `Domain`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->