using Microsoft.AspNetCore.Mvc;
using PawpalBackend.Models;
using PawpalBackend.Services;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    private readonly UserService _userService;

    public DataController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("users")]
    public async Task<IActionResult> CreateUser([FromBody] User newUser)
    {
        await _userService.CreateAsync(newUser);
        return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
    }

    [HttpGet("users/{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        var user = await _userService.GetAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }
}
