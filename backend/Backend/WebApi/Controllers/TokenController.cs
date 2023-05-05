using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;

namespace WebApi1.Controllers
{
    /// <summary>
    /// Точка авторизации
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    //[ApiExplorerSettings(IgnoreApi = true)]
    public class TokenController : ControllerBase
    {
        /// <summary/>
        /// <param name="grantType"></param>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="scope"></param>
        /// <param name="clientId"></param>
        /// <param name="clientSecret"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Authorize([FromForm(Name = "grant_type")] string grantType, [FromForm] string username, [FromForm] string password, [FromForm] string? scope = null, [FromForm(Name = "client_id")] string? clientId = default, [FromForm(Name = "client_secret")] string? clientSecret = default)
        {
            if (Request.Headers.TryGetValue("Authorization", out var authorization))
            {
                var authHeader = AuthenticationHeaderValue.Parse(authorization);
                var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
                var parts = Encoding.UTF8.GetString(credentialBytes).Split(new[] { ':' }, 2, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                if (parts.Length < 2)
                    return Unauthorized("Invalid authorization header");

                clientId = parts[0];
                clientSecret = parts[1];
                Console.WriteLine(clientId);
                Console.WriteLine(clientSecret);
            }

            if (Program.ClientId != clientId || Program.ClientSecret != clientSecret)
                return Unauthorized("No authorization header");


            var manager = HttpContext.RequestServices.GetRequiredService<UserManager<IdentityUser>>();
            var user = await manager.FindByNameAsync(username);
            if (
                user == null
                || !await manager.CheckPasswordAsync(user, password)
                )
                return BadRequest(new { errorText = "Invalid username or password." });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(clientSecret)), SecurityAlgorithms.HmacSha256);
            var jwtHeader = new JwtHeader(credentials);
            var claims = new List<Claim>
                        {
                            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                            new(ClaimTypes.Name, username),
                        };
            if (!string.IsNullOrWhiteSpace(scope))
            {
                var scopes = scope.Split(new[] { ' ' }, 2, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                for (int i = 0; i < scopes.Length; i++)
                {
                    var s = scopes[i];
                    if (await manager.IsInRoleAsync(user, s))
                        claims.Add(new(ClaimTypes.Role, s));
                    else
                        return Unauthorized("Invalid scope");

                }
            }
            var token = new JwtSecurityToken(jwtHeader, new JwtPayload(issuer: Program.Issuer,
                                                                       audience: clientId,
                                                                       notBefore: DateTime.UtcNow,
                                                                       expires: DateTime.UtcNow.AddSeconds(3000),
                                                                       claims: claims));

            return new JsonResult(new { access_token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
    }
}
