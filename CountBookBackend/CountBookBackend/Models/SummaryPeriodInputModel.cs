using CountBookBackend.Data;
using NodaTime;

namespace CountBookBackend.Models
{
  public class SummaryPeriodInputModel
  {
    public LocalDate? StartDate { get; set; }

    public LocalDate? EndDate { get; set; }

    public RecordType RecordType { get; set; }
  }
}
