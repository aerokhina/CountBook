using System.ComponentModel.DataAnnotations;

namespace CountBookBackend.Data
{
  public class Category
  {
    public int Id { get; set; }

    public string Name { get; set; }
    
    [Required]
    public string ApplicationUserId { get; set; }
    
    public ApplicationUser ApplicationUser { get; set; }
  }
}
