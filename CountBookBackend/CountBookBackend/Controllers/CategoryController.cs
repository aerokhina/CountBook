using System;
using System.Threading.Tasks;
using System.Linq;
using CountBookBackend.Authentication;
using CountBookBackend.Data;
using CountBookBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CountBookBackend.Controllers
{
  [Authorize]
  [Route("[controller]")]
  public class CategoryController : Controller
  {
    private readonly ApplicationContext _context;

    public CategoryController(ApplicationContext context)
    {
      _context = context;
    }
    
    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Create([FromBody] CategoryInputModel model)
    {
      var userId = User.GetId();
      var item = new Category
      {
        Name = model.Name,
        ApplicationUserId = userId
      };
      _context.Add(item);
      await _context.SaveChangesAsync();
      return Ok(new CategoryOutputModel
      {
        Name = item.Name,
        Id = item.Id,
      });
    }
    
    [HttpGet]
    [Route("[action]")]
    public async Task<IActionResult> GetList()
    {
      var userId = User.GetId();
      var result = await _context.Category
        .Where(x => x.ApplicationUserId == userId)
        .Select(
          x => new CategoryOutputModel
          {
            Name = x.Name,
            Id = x.Id,
          })
        .ToListAsync();
      return Ok(result);
    }
    
    [HttpPost]
    [Route("[action]/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var userId = User.GetId();
      var record = await _context.Category
        .Where(x => x.ApplicationUserId == userId)
        .SingleOrDefaultAsync(x => x.Id == id);
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
    public async Task<IActionResult> Edit(int id, [FromBody] CategoryInputModel model)
    {
      var userId = User.GetId();
      var item = await _context.Category
        .Where(x => x.ApplicationUserId == userId)
        .SingleOrDefaultAsync(x => x.Id == id);
      if (item == null)
      {
        throw new ArgumentException("Record not found");
      }

      item.Name = model.Name;
      _context.Update(item);
      _context.SaveChanges();
      return Ok();
    }

    [HttpGet]
    [Route("[action]/{id}")]
    public async Task<IActionResult> Get(int id)
    {
      var userId = User.GetId();
      var item= await _context.Category
        .Where(x => x.ApplicationUserId == userId)
        .Select(
          x => new CategoryOutputModel
          {
            Name = x.Name,
            Id = x.Id
          })
        .SingleOrDefaultAsync(x => x.Id == id);
      if (item == null)
      {
        throw new ArgumentException("Record not found");
      }

      return Ok(item);
    }
    
  }
}
