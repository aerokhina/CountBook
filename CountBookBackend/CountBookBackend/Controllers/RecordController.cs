using System;
using System.Linq;
using System.Threading.Tasks;
using CountBookBackend.Data;
using CountBookBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CountBookBackend.Controllers
{
  [Authorize]
  [Route("[controller]")]
  public class RecordController : Controller
  {
    private readonly ApplicationContext _context;

    public RecordController(ApplicationContext context)
    {
      _context = context;
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Create([FromBody] RecordInputModel model)
    {
      var record = new Record
      {
        Type = model.Type,
        Name = model.Name,
        Amount = model.Amount,
        CategoryId = model.CategoryId,
        Date = model.Date
      };
      _context.Add(record);
      await _context.SaveChangesAsync();
      return Ok(
        new RecordOutputModel
        {
          Type = record.Type,
          Name = record.Name,
          Amount = record.Amount,
          Id = record.Id,
          CategoryId = record.CategoryId,
          Date = record.Date
        }
      );
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> GetList([FromBody] RecordFilterModer model)
    {
      IQueryable<Record> recordQuery = _context.Record;

      if (model.CategoryId != null)
      {
        recordQuery = recordQuery.Where(x => x.CategoryId == model.CategoryId);
      }

      if (model.StartDate != null)
      {
        recordQuery = recordQuery.Where(x => x.Date >= model.StartDate);
      }

      if (model.EndDate != null)
      {
        recordQuery = recordQuery.Where(x => x.Date <= model.EndDate);
      }

      if (model.Type != null)
      {
        recordQuery = recordQuery.Where(x => x.Type == model.Type);
      }

      var records = await recordQuery.ToListAsync();

      var result = records
        .Select(
          x => new RecordOutputModel
          {
            Name = x.Name,
            Id = x.Id,
            Type = x.Type,
            Amount = x.Amount,
            CategoryId = x.CategoryId,
            Date = x.Date
          }
        );
      return Ok(result);
    }

    [HttpPost]
    [Route("[action]/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var record = await _context.Record.SingleOrDefaultAsync(x => x.Id == id);
      if (record == null)
      {
        throw new ArgumentException("Record not found");
      }

      _context.Remove(record);
      _context.SaveChanges();
      return Ok();
    }

    [HttpPost]
    [Route("[action]/{id}")]
    public async Task<IActionResult> Edit(int id, [FromBody] RecordInputModel model)
    {
      var record = await _context.Record.SingleOrDefaultAsync(x => x.Id == id);
      if (record == null)
      {
        throw new ArgumentException("Record not found");
      }

      record.Name = model.Name;
      record.Amount = model.Amount;
      record.Type = model.Type;
      record.Date = model.Date;
      _context.Update(record);
      _context.SaveChanges();
      return Ok();
    }

    [HttpGet]
    [Route("[action]/{id}")]
    public async Task<IActionResult> Get(int id)
    {
      var record = await _context.Record
        .Select(
          x => new RecordOutputModel
          {
            Name = x.Name,
            Id = x.Id,
            Type = x.Type,
            Amount = x.Amount,
            CategoryId = x.CategoryId,
            Date = x.Date
          }
        )
        .SingleOrDefaultAsync(x => x.Id == id);
      if (record == null)
      {
        throw new ArgumentException("Record not found");
      }

      return Ok(record);
    }
  }
}
