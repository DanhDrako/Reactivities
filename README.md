# Here is BE for Reactivities solution

```bash
# cd .\API\
dotnet tool install --global dotnet-ef --version 9.0.2
dotnet ef
------------------------------------------------------
# cd .\Reactivities\(main folder)
switchCase(migration):
(not existing):
 -> dotnet ef migrations add InitialCreate -p Persistence -s API
 -> dotnet ef database update -p Persistence -s API
(existing):
# run solution: cd .\API\
dotnet watch --no-hot-reload
------------------------------------------------------
want add new migration ?
cd main: dotnet ef migration add IdentityAdded -p Persistence -s API
cd API: dotnet watch
```
