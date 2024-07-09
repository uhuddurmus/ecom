namespace Vk.Schema;

public class UserRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FullName { get; set; }
    public string Role { get; set; }
}
public class UserResponse
{
    public int Id { get; set; }
    public string Email { get; set; }
    //public string Password { get; set; } password dönmez !!!
    public string FullName { get; set; }
    public string Role { get; set; }

}