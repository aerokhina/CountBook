using System;
using System.Linq;
using System.Threading.Tasks;
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
  public class ShoppingItemController : Controller
  {
    private readonly ApplicationContext _context;

    public ShoppingItemController(ApplicationContext context)
    {
      _context = context;
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Create([FromBody] ShoppingItemInputModel model)
    {
      var userId = User.GetId();
      var item = new ShoppingItem
      {
        Name = model.Name,
        ApplicationUserId = userId
      };
      _context.Add(item);
      await _context.SaveChangesAsync();
      return Ok(new ShoppingItemOutputModel
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
      var result = await _context.ShoppingItem
        .Where(x => x.ApplicationUserId == userId || x.ApplicationUser.UserGroup.ApplicationUsers.Any(user => user.Id == userId))
        .Select(x => new ShoppingItemOutputModel
        {
          Name =  x.Name,
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
      var record = await _context.ShoppingItem
        .Where(x => x.ApplicationUserId == userId || x.ApplicationUser.UserGroup.ApplicationUsers.Any(user => user.Id == userId))
        .SingleOrDefaultAsync(x => x.Id == id);
      if (record == null)
      {
        throw new ArgumentException("Record not found");
      }

      _context.Remove(record);
      _context.SaveChanges();
      return Ok();
    }
  }
}
