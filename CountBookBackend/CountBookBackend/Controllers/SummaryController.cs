using System.Linq;
using System.Threading.Tasks;
using CountBookBackend.Data;
using CountBookBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NodaTime;

namespace CountBookBackend.Controllers
{
  [Route("[controller]")]
  public class SummaryController : Controller
  {
    private readonly IClock _clock;
    private readonly ApplicationContext _context;

    public SummaryController(ApplicationContext context, IClock clock)
    {
      _context = context;
      _clock = clock;
    }

    [HttpGet]
    [Route("[action]")]
    public async Task<IActionResult> Get()
    {
      var today = _clock.GetCurrentInstant().InUtc().Date;
      var expenseSummary = await GetSummaryModel(RecordType.Expense, today);
      var incomeSummary = await GetSummaryModel(RecordType.Income, today);
      var balance = new SummaryModel
      {
        Today = incomeSummary.Today - expenseSummary.Today,
        Month = incomeSummary.Month - expenseSummary.Month,
        Year = incomeSummary.Year - expenseSummary.Year
      };
      return Ok(
        new DashboardModel
        {
          Income = incomeSummary,
          Expense = expenseSummary,
          Balance = balance
        }
      );
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> GetByType([FromBody] SummaryPeriodInputModel model)
    {
      IQueryable<Record> recordQuery = _context.Record
        .Where(x => x.Type == model.RecordType)
        .Include(x => x.Category);

      if (model.StartDate != null) 
      {
        recordQuery = recordQuery.Where(x => x.Date >= model.StartDate);
      }
      
      if(model.EndDate != null)
      {
        recordQuery = recordQuery.Where(x => x.Date <= model.EndDate);
      }

      var records = await recordQuery.ToListAsync();

      var categories = records
        .GroupBy(x => x.Category)
        .Select(
          x => new CategorySumModel
          {
            Id = x.Key.Id,
            Name = x.Key.Name,
            Sum = x.Sum(record => record.Amount)
          }
        )
        .OrderBy(x => x.Name).ToList();
      return Ok(new {Categories = categories, Sum = categories.Sum(x => x.Sum)});
    }

    private async Task<decimal> Sum(RecordType type, LocalDate startDate, LocalDate endDate)
    {
      var result = await _context.Record
        .Where(x => x.Type == type && x.Date >= startDate && x.Date <= endDate)
        .SumAsync(x => x.Amount);
      return result;
    }

    private async Task<SummaryModel> GetSummaryModel(RecordType type, LocalDate today)
    {
      return new SummaryModel
      {
        Today = await Sum(type, today, today),
        Month = await Sum(type, today.PlusMonths(-1).PlusDays(1), today),
        Year = await Sum(type, today.PlusYears(-1).PlusDays(1), today)
      };
    }
  }
}
