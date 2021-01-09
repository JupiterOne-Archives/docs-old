# Mapping Person Entities to a Team

Under the Assets section of the application, click the + button in the upper right corner.

![bulk-upload](../assets/bulk-upload.png)

Upload a JSON/YAML file. Use the following JSON as an example:

```
{
 "entities": [
   {
     "_key": "my_team:1",
     "_type": "my_team",
     "_class": "Team",
     "displayName": "Team One",
     "name": "Marketing Team",
     "description": "One person team",
     "email": "james@jupiterone.com",
     "members": [
       "james@jupiterone.com"
     ]
   },
   {
     "_key": "my_team:2",
     "_type": "my_team",
     "_class": "Team",
     "displayName": "Team Two",
     "name": "Solutions Team",
     "description": "Customer facing team",
     "email": "solutions@jupiterone.com",
     "lead": "cindy@jupiterone.com",
     "members": [
       "cindy@jupiterone.com",
       "james@jupiterone.com",
       "mark@jupiterone.com"
     ]
   }
 ]
}
```

### Some key things to note:

- The _key must be unique for each team
- “members” is an array of email addresses that correspond to users/Persons that have already been integrated through an IdP. If the Person entity has not been created, they cannot be mapped to the Team.
- The properties “lead”, “manager”, and “supervisor” can be used to define roles for different members of the Team entity. 
- Currently JSON/YAML are the only supported formats to define custom entities/Teams. [^1]

[^1]: CSV support will be available soon to allow users to modify a spreadsheet instead.
