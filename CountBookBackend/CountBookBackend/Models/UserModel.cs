namespace CountBookBackend.Models
{
    public class UserLoginModel
    {
      public string Email { get; set; }

      public string Password { get; set; }
    }
    
    public class UserRegisterModel
    {
      public string Email { get; set; }
    
      public string Name { get; set; }

      public string Password { get; set; }
    }
    
    public class EditProfileModel
    {
      public string Name { get; set; }
      
      public string Email { get; set; }
    }

    public class ChangePasswordModel
    {
      public string OldPassword { get; set; }
      
      public string NewPassword { get; set; }
    }
}
