using System.Collections.Generic;

namespace CountBookBackend.Data
{
  public class UserGroup
  {
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public List<ApplicationUser> ApplicationUsers { get; set; } = new List<ApplicationUser>();
  }
}
