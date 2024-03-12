namespace API.Controllers;

using API.DTOs;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/[controller]")]

public class PokemonController : ControllerBase
{
    // GET: api/v1/pokemon/{param} this could be name or n:th number
    [HttpGet("{param}")]
    public async Task<ActionResult> GetPokemon(string param)
    {
        if (string.IsNullOrWhiteSpace(param))
        {
            return BadRequest("Parameter 'param' cannot be empty.");
        }

        var client = new HttpClient();
        var response = await client.GetAsync($"https://pokeapi.co/api/v2/pokemon/{param}");
        if (response.IsSuccessStatusCode)
        {
            var pokemon = await response.Content.ReadFromJsonAsync<PokemonDto>();
            var payload = new
            {
                id = pokemon.Id,
                name = pokemon.Name,
                image = pokemon.Sprites.front_default
            };

            return Ok(payload);
        }
        else
        {
            return NotFound();
        }
    }
}