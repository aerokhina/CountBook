using System.Linq;
using System.Security.Claims;

namespace CountBookBackend.Authentication
{
    public static class AuthenticationExtensions
    {
        public static string GetEmail(this ClaimsPrincipal user)
        {
            return user.Claims.FirstOrDefault(x => x.Type == ClaimsIdentity.DefaultNameClaimType)?.Value;
        }
    }
}
