# Render deployment patch

This patch is intended for the repository root (the directory that contains `ListenToTheEarthsSong.Server`, `ListenToTheEarthsSong.Core`, `ListenToTheEarthsSong`, and `listentotheearthssong.client`). Copy the included files to the matching paths, replacing existing files where paths match.

## Before deploying

1. Rotate any database password that was present in the old `appsettings.json` or Git history. Do not reuse it.
2. Add your local development connection string using .NET User Secrets rather than committing it:

   ```powershell
   dotnet user-secrets init --project ListenToTheEarthsSong.Server/ListenToTheEarthsSong.Server.csproj
   dotnet user-secrets set "ConnectionStrings:DefaultConnection" "YOUR_LOCAL_OR_NEON_CONNECTION_STRING" --project ListenToTheEarthsSong.Server/ListenToTheEarthsSong.Server.csproj
   ```

3. Commit and push these changes to the Git branch connected to Render.

## Render backend service

Create **New → Web Service**, connect the repository, choose **Docker** as runtime, and leave Root Directory blank. The Dockerfile is at the repository root.

Set these environment variables in the backend service:

- `ASPNETCORE_ENVIRONMENT` = `Production`
- `ConnectionStrings__DefaultConnection` = the Neon pooled Npgsql connection string (keep it secret)
- `FrontendUrl` = the exact deployed frontend origin, e.g. `https://your-frontend.onrender.com` (no trailing slash)

The backend exposes `/health` for a health check. Set the Render health check path to `/health` if the dashboard offers that setting.

## Render frontend Static Site

Create **New → Static Site**, connect the same repository, and set:

- Root Directory: `listentotheearthssong.client`
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Environment variable `NODE_VERSION` = `22.12.0`
- Environment variable `VITE_API_BASE_URL` = `https://your-backend.onrender.com`

Add a rewrite rule:

- Source: `/*`
- Destination: `/index.html`
- Action: `Rewrite`

After both services deploy, set `FrontendUrl` on the backend to the actual Static Site URL and redeploy the backend. Set `VITE_API_BASE_URL` on the frontend to the actual backend URL and redeploy the frontend.

## Notes

- The frontend helper keeps local development working through the existing Vite proxy when `VITE_API_BASE_URL` is unset.
- Cookie authentication and antiforgery are configured for secure credentialed requests from the separate Render frontend origin. The backend CORS policy only allows the exact `FrontendUrl` configured in the environment.
- The current photo upload implementation writes files into `wwwroot/uploads/photos`. Render Free web services have ephemeral filesystems, so user-uploaded photos can disappear after a restart, spin-down, or redeploy. Move uploads to object storage before relying on permanent gallery uploads; a free Render service cannot attach a persistent disk.
- Your existing Neon database and EF Core migration files are not changed by this patch. Do not run `database update 0` as part of deployment.
- Swagger remains enabled only in Development. `/health` is available in Production.
