using Microsoft.AspNetCore.Mvc;
using PawpalBackend.Models;
using PawpalBackend.Services;
using System.Threading.Tasks;

[ApiController]
// [Route("api/[controller]")]
// removed for simplicity
[Route("homepage")]
public class HomepageController : ControllerBase
{
    private readonly UserService _userService;

    public HomepageController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User user)
    {
        var userFromDb = await _userService.GetByUsername(user.Username);

        if (userFromDb == null)
        {
            return NotFound();
        }

        // if (userFromDb.Password != user.Password)
        // {
        //     return Unauthorized();
        // }

        if (!userFromDb.VerifyPassword(user.Password))
        {
            return Unauthorized();
        }

        return Ok();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User newUser)
    {
        var userFromDb = await _userService.GetByUsername(newUser.Username);

        if (userFromDb != null)
        {
            return Conflict();
        }

        newUser.SetPassword(newUser.Password);

        await _userService.CreateAsync(newUser);
        return CreatedAtAction(nameof(Login), newUser);
    }

}

// [ApiController]
// [Route("api/[controller]")]
// public class DataController : ControllerBase
// {
//     private readonly UserService _userService;

//     public DataController(UserService userService)
//     {
//         _userService = userService;
//     }

//     [HttpPost("users")]
//     public async Task<IActionResult> CreateUser([FromBody] User newUser)
//     {
//         await _userService.CreateAsync(newUser);
//         return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
//     }

//     [HttpGet("users/{id}")]
//     public async Task<IActionResult> GetUser(string id)
//     {
//         var user = await _userService.GetAsync(id);

//         if (user == null)
//         {
//             return NotFound();
//         }

//         return Ok(user);
//     }
// }
