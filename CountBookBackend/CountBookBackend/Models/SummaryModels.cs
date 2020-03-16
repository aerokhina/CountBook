namespace CountBookBackend.Models
{
  public class SummaryModel
  {
    public decimal Today { get; set; }
    
    public decimal Month { get; set; }
    
    public decimal Year { get; set; }
  }

  public class DashboardModel
  {
    public SummaryModel Income{ get; set; }
    
    public SummaryModel Expense{ get; set; }
    
    public SummaryModel Balance{ get; set; }
  }
}
