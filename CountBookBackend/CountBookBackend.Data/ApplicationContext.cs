using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CountBookBackend.Data
{
  public class ApplicationContext : IdentityDbContext<ApplicationUser>
  {
    public ApplicationContext(DbContextOptions<ApplicationContext> options)
      : base(options)
    {
    }
    
    public DbSet<Record> Record { get; set; }
    
    public DbSet<ShoppingItem> ShoppingItem{ get; set; }
    
    public DbSet<Category> Category { get; set; }

    public DbSet<UserGroup> UserGroup { get; set; }
  }
}
