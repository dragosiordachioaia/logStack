# API docs:

### Groups:

`POST` `/groups/merge` - Merges two or more groups. The resulting group will contain the messages of all the input groups.

`DELETE` `/groups` - Deletes one or more groups.

`DELETE` `/groups/ignore` - Ignores one or more groups

`GET` `/groups/<group_id>` - Returns detailed information about a single group

`GET` `/projects/<project_id>/groups` - Returns the list of groups that are part of a specified project

-----------

### Issues:

`POST` `/projects/<project_id>/issues` - Creates a new issue in the specified project and returns its ID

`GET` `/issues/<issue_id>` - Returns detailed information about the specified issue

`GET` `/issues/<issue_id>/next` - Returns the next issue from the same group as the specified issue, in chronological order

`GET` `/issues/<issue_id>/previous` - Returns the previous issue from the same group as the specified issue, in chronological order

`GET` `/issues` - Returns a list of all the issues

-------------

### Projects:

`POST` `/projects` - Creates a new project and its ID

`GET` `/projects/<project_id>` - Returns detailed information about the specified project

`GET` `/projects` - Returns a list of all the projects for the currently-logged-in user

---------------

### Project types:

`GET` `/project_types` - Returns a list of all the project types

---------------

### Users:

`POST` `/users` - Creates a new user and returns its ID

`GET` `/users/me` - Returns information about the currently-logged-in user, or a `404` if no user is logged in

`GET` `/users/<user_id>` - Returns information about the specified user

`POST` `/login` - Logs the specified user in. This stores the session on the server and sets a cookie on the user's browser. Only works if the server is on the same domain as the client. If the user is already logged in, it will return a `400`

`POST` `/logout` - Logs the specified user out. If no user is logged in, it returns a `400`

