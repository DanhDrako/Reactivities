# Here is BE for Reactivities solution

```bash
# cd .\API\
dotnet tool install --global dotnet-ef --version 9.0.2
dotnet ef
------------------------------------------------------
# cd .\Reactivities\(main folder)
switchCase(migrations):
(not existing):
 -> dotnet ef migrations add InitialCreate -p Persistence -s API
 -> dotnet ef database update -p Persistence -s API
(existing):
# run solution: cd .\API\
dotnet watch --no-hot-reload
------------------------------------------------------
want add new migrations ?
cd main: dotnet ef migrations add IdentityAdded -p Persistence -s API
cd API: dotnet watch
------------------------------------------------------
Note:
Add migrations for Entity Framework Relationships
dotnet ef migrations add ActivityAttendeesAdded -p Persistence -s API
------------------------------------------------------
Note: If need delete all database
cd main: dotnet ef database drop -p Persistence -s API
cd API: dotnet watch
```
