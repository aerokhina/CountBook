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
  public class UserGroupController : Controller
  {
    private readonly ApplicationContext _context;

    public UserGroupController(ApplicationContext context)
    {
      _context = context;
    }
    
    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Create([FromBody] UserGroupInputModel model)
    {
      var userId = User.GetId();
      var item = new UserGroup()
      {
        Name = model.Name,
      };
      _context.Add(item);
      await _context.SaveChangesAsync();
      return Ok(new UserGroupOutputModel
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

      var result = await _context.UserGroup
        .Select(
          x => new UserGroupOutputModel
          {
            Name = x.Name,
            Id = x.Id,
          })
        .ToListAsync();
      
      return Ok(result);
    }
  }
}
