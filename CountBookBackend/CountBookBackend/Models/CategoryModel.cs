namespace CountBookBackend.Models
{
  public class CategoryInputModel
  {
    public string Name { get; set; }
  }
  
  public class CategoryOutputModel
  {
    public int Id { get; set; }
    
    public string Name { get; set; }
  }

  public class CategorySumModel
  {
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public decimal Sum { get; set; }
  }
}
