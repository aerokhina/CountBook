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
          UserName = model.Email,
          Name = model.Name
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
      var user = await _userManager.Users
        .Include(x => x.UserGroup)
        .Where(x => x.Id == id)
        .FirstOrDefaultAsync();

      return Ok(
        new ProfileModel
        {
          Name = user.Name,
          Email = user.Email,
          UserGroupId = user.UserGroupId,
          UserGroupName = user.UserGroup?.Name
        }
      );
    }

    [HttpPost]
    [Authorize]
    [Route("[action]")]
    public async Task<IActionResult> EditProfile([FromBody] EditProfileModel model)
    {
      var id = User.GetId();
      var user = await _userManager.Users.Where(x => x.Id == id).FirstAsync();

      user.Name = model.Name;
      user.UserName = model.Email;
      user.Email = model.Email;
      user.UserGroupId = model.UserGroupId;

      await _userManager.UpdateAsync(user);

      return Ok();
    }

    [HttpPost]
    [Authorize]
    [Route("[action]")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
    {
      var id = User.GetId();
      var user = await _userManager.Users.Where(x => x.Id == id).FirstAsync();

      var isNewPasswordSameFromOld = await _userManager.CheckPasswordAsync(user, model.NewPassword);

      if (isNewPasswordSameFromOld)
      {
        return BadRequest(
          new ProblemDetails()
          {
            Type = "NewPasswordIsOld"
          }
        );
      }

      var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

      if (!changePasswordResult.Succeeded)
      {
        return BadRequest(
          new ProblemDetails()
          {
            Type = "BadPassword"
          }
        );
      }

      return Ok();
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> ResetPassword([FromBody] UserLoginModel model)
    {
      var user = await _userManager.Users.Where(x => x.Email == model.Email).FirstAsync();

      await _userManager.RemovePasswordAsync(user);
      var resetPassword = await _userManager.AddPasswordAsync(user, model.Password);

      if (!resetPassword.Succeeded)
      {
        return BadRequest(
          new ProblemDetails()
          {
            Type = "BadPassword"
          }
        );
      }

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
