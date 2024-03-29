using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ScenarioController : ControllerBase
  {
    private readonly ILogger<ScenarioController> _logger;
    private List<List<string>> _scenarios = new List<List<string>>();

    public ScenarioController(ILogger<ScenarioController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<IEnumerable<string>> GetAvailableScenarios()
    {
        _scenarios.Add(new List<string> { "SOXXXXXXXX", "OOOXXXXXXX", "OXOOOXOOOO", "XXXXOXOXXO", "OOOOOOOXXO", "OXXOXXXXXO", "OOOOXXXXXE" });
          

      return _scenarios;
    }

    [HttpPost]
    public IEnumerable<IEnumerable<string>> Post(string[] model)
    {
      _scenarios.Add(model.ToList());

      return _scenarios;
    }
  }
}

public class ScenarioModel
{
  public IEnumerable<string> Schema { get; set; }
}
