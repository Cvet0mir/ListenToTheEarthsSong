FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore "ListenToTheEarthsSong.Server/ListenToTheEarthsSong.Server.csproj" -p:RenderBuild=true
RUN dotnet publish "ListenToTheEarthsSong.Server/ListenToTheEarthsSong.Server.csproj" \
    --configuration Release \
    --output /app/publish \
    --no-restore \
    -p:RenderBuild=true

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_HTTP_PORTS=10000
EXPOSE 10000

ENTRYPOINT ["sh", "-c", "dotnet ListenToTheEarthsSong.Server.dll --urls http://0.0.0.0:${PORT:-10000}"]
