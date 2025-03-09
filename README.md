Here is BE for Reactivities solution

cd API
-- dotnet tool install --global dotnet-ef --version 9.0.2
-- dotnet ef

cd Reactivities(main)
-- if not existing migration:
	-> -- dotnet ef migrations add InitialCreate -p Persistence -s API
	-> -- dotnet ef database update -p Persistence -s API
-- if existing migration:
-- build: cd API -> dotnet watch --no-hot-reload