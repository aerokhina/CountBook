using System;
using System.ComponentModel.DataAnnotations;
using NodaTime;

namespace CountBookBackend.Data
{
  public class Record : IUserEntity
  {
    public int Id { get; set; }
    public RecordType Type { get; set; }

    public string Name { get; set; }

    public decimal Amount { get; set; }
    
    public int CategoryId { get; set; }
    
    public Category Category { get; set; }

    public LocalDate Date { get; set; }
    
    [Required]
    public string ApplicationUserId { get; set; }
    
    public ApplicationUser ApplicationUser { get; set; }
  }
}
