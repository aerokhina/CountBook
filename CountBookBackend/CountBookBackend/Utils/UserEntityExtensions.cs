using System.Linq;
using CountBookBackend.Data;

namespace CountBookBackend.Utils
{
  public static class UserEntityExtensions
  {
    public static IQueryable<T> FilterByUserOrGroup<T>(this IQueryable<T> query, string userId)
      where T : IUserEntity
    {
      return query.Where(
        x => x.ApplicationUser.Id == userId
             || x.ApplicationUser.UserGroup.ApplicationUsers.Any(user => user.Id == userId)
      );
    }
  }
}
