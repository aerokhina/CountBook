using System;
using CountBookBackend.Data;
using NodaTime;

namespace CountBookBackend.Models
{
  public class RecordInputModel
  {
    public RecordType Type { get; set; }

    public string Name { get; set; }

    public decimal Amount { get; set; }

    public int CategoryId { get; set; }

    public LocalDate Date { get; set; }
  }

  public class RecordOutputModel
  {
    public int Id { get; set; }
    
    public RecordType Type { get; set; }

    public string Name { get; set; }

    public decimal Amount { get; set; }

    public int CategoryId { get; set; }
    
    public LocalDate Date { get; set; }
  }

  public class RecordFilterModer
  {
    public int? CategoryId { get; set; }
    
    public LocalDate? StartDate { get; set; }
    
    public LocalDate? EndDate { get; set; }
    
    public RecordType? Type { get; set; }
    
  }
}
