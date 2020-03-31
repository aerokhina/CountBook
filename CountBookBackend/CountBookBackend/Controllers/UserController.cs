using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CountBookBackend.Authentication;
using CountBookBackend.Data;
using CountBookBackend.Models;

namespace CountBookBackend.Controllers
{
  [Route("[controller]")]
  public class UserController : Controller
  {
    private readonly UserManager<ApplicationUser> _userManager;

    private readonly AuthenticationTokenService _authenticationTokenService;

    public UserController(
      UserManager<ApplicationUser> userManager,
      AuthenticationTokenService authenticationTokenService
    )
    {
      _userManager = userManager;
      _authenticationTokenService = authenticationTokenService;
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
    {
      var result = await _userManager.CreateAsync(
        new ApplicationUser()
        {
          Email = model.Email,
          UserName = model.Name,
        },
        model.Password
      );

      if (result.Succeeded)
        return Ok();

      return StatusCode(500, result.Errors);
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Login([FromBody] UserLoginModel model)
    {
      var user = await _userManager.Users.Where(x => x.Email == model.Email).FirstOrDefaultAsync();
      if (user == null)
      {
        return BadLoginPassword();
      }

      var passwordMatches = await _userManager.CheckPasswordAsync(user, model.Password);

      if (!passwordMatches)
      {
        return BadLoginPassword();
      }

      var authenticationToken = _authenticationTokenService.GetToken(user.Id);


      return Ok(new {authenticationToken});
    }

    [HttpGet]
    [Authorize]
    [Route("[action]")]
    public async Task<IActionResult> GetProfile()
    {
      var id = User.GetId();
      var user = await _userManager.Users.Where(x => x.Id == id).FirstOrDefaultAsync();

      return Ok(new EditProfileModel
      {
        Name = user.UserName,
        Email = user.Email
      });
    }

    [HttpPost]
    [Authorize]
    [Route("[action]")]
    public async Task<IActionResult> EditProfile([FromBody] EditProfileModel model)
    {
      var id = User.GetId();
      var user = await _userManager.Users.Where(x => x.Id == id).FirstAsync();

      user.UserName = model.Name;
      user.Email = model.Email;

      await _userManager.UpdateAsync(user);

      return Ok();
    }

    private IActionResult BadLoginPassword()
    {
      return BadRequest(
        new ProblemDetails()
        {
          Type = "BadLoginPassword"
        }
      );
    }
  }
}
