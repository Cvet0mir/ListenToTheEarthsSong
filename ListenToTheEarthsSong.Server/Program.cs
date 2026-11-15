using ListenToTheEarthsSong.Core.Interfaces;
using ListenToTheEarthsSong.Core.Services;
using ListenToTheEarthsSong.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.HttpOverrides;
using System.Net;

namespace ListenToTheEarthsSong.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<EarthDbContext>(options =>
                options.UseNpgsql(
                    builder.Configuration.GetConnectionString("DefaultConnection")
                ));

            builder.Services.AddScoped<IPhotosService, PhotoService>();
            builder.Services.AddScoped<IUserService, UserService>();

            // Render hosts the React site and API on different origins.
            var frontendUrl = builder.Configuration["FrontendUrl"];
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Frontend", policy =>
                {
                    if (!string.IsNullOrWhiteSpace(frontendUrl))
                    {
                        policy.WithOrigins(frontendUrl.TrimEnd('/'))
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials();
                    }
                });
            });

            builder.Services.AddAntiforgery(options =>
            {
                options.HeaderName = "RequestVerificationToken";
                options.Cookie.Name = "EcoTishina.Antiforgery";
                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });

            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Cookie.Name = "EcoTishina.Auth";
                    options.Cookie.HttpOnly = true;
                    // Required for credentialed requests from the separate frontend origin.
                    options.Cookie.SameSite = SameSiteMode.None;
                    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

                    options.ExpireTimeSpan = TimeSpan.FromHours(2);
                    options.SlidingExpiration = true;

                    options.Events.OnRedirectToLogin = context =>
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        return Task.CompletedTask;
                    };

                    options.Events.OnRedirectToAccessDenied = context =>
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        return Task.CompletedTask;
                    };
                });

            builder.Services.AddAuthorization();

            builder.Services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor |
                    ForwardedHeaders.XForwardedProto;

                // Replace with your verified Render proxy IPs or networks.
                // options.KnownProxies.Add(IPAddress.Parse("..."));
            });

            var app = builder.Build();

            app.UseForwardedHeaders();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseHttpsRedirection();
            }

            // Keep this for files served from wwwroot (including current photo uploads).
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("Frontend");
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
            app.MapControllers();

            app.Run();
        }
    }
}
