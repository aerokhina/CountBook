using CountBookBackend.Authentication;
using CountBookBackend.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NodaTime;
using NodaTime.Serialization.SystemTextJson;

namespace CountBookBackend
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb));
      
      services.AddEntityFrameworkNpgsql();
      services.AddDbContext<ApplicationContext>(
        options =>
          options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"),
            npgsqOptions => { npgsqOptions.UseNodaTime();}));
      
      services.AddIdentity<ApplicationUser, IdentityRole>(
          options => { options.User.RequireUniqueEmail = true; })
        .AddEntityFrameworkStores<ApplicationContext>();

      services.AddCors(
        options =>
        {
          options.AddPolicy(
            "default",
            builder =>
            {
              builder.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
            });
        });

      services.AddSingleton<IClock>(SystemClock.Instance);

      services.AddSingleton<AuthenticationTokenService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors("default");

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }
  }
}
