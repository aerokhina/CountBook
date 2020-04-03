using Microsoft.AspNetCore.Identity;

namespace CountBookBackend.Data
{
  public class ApplicationUser : IdentityUser
  {
    public int? UserGroupId { get; set; }
    
    public UserGroup UserGroup { get; set; }
    
    public string Name { get; set; }
  }
}
