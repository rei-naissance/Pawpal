using Microsoft.AspNetCore.Mvc;
using PawpalBackend.Models;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    [HttpGet("test")]
    public IActionResult GetTest()
    {
        return Ok(new { message = "Hello from ASP.NET!" });
    }

    [HttpPost("data")]
    public IActionResult PostData([FromBody] YourDataModel data)
    {
        // Process the incoming data
        return Ok(data);
    }
}
