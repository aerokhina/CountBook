namespace CountBookBackend.Data
{
  public class ShoppingItem
  {
    public int Id { get; set; }

    public string Name { get; set; }
    
    public string ApplicationUserId { get; set; }
    
    public ApplicationUser ApplicationUser { get; set; }
  }
}
