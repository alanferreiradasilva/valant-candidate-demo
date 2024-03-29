using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using ValantDemoApi.Services;

namespace ValantDemoApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ScenarioController : ControllerBase
  {
    private readonly ILogger<ScenarioController> _logger;
    private readonly IScenarioService _service;
    private List<List<string>> _scenarios = new List<List<string>>();

    public ScenarioController(ILogger<ScenarioController> logger, IScenarioService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet]
    public IEnumerable<IEnumerable<string>> GetAvailableScenarios()
    {
      var result = _service.GetAll();

      return result;
    }

    [HttpPost]
    public IEnumerable<IEnumerable<string>> Post(string[] model)
    {
      var result = _service.Save(model);
      
      return result;
    }
  }
}
