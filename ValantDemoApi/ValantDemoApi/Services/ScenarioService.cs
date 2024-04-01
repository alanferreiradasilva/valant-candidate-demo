using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace ValantDemoApi.Services
{
  public class ScenarioService : IScenarioService
  {
    private readonly IMemoryCache _memoryCache;

    public ScenarioService(IMemoryCache memoryCache) {
        _memoryCache = memoryCache;
    }

    private string GetFromMemory()
      => _memoryCache.Get<string>("scenarios");

    private void SaveInMemory(object json)
      => _memoryCache.Set<string>("scenarios", JsonConvert.SerializeObject(json));

    public IEnumerable<IEnumerable<string>> GetAll()
    {
      var result = new List<List<string>>();

      var json = GetFromMemory();

      if (string.IsNullOrWhiteSpace(json))
      {
        result.Add(new List<string> {
          "SOXXXXXXXX", "OOOXXXXXXX", "OXOOOXOOOO", "XXXXOXOXXO", "OOOOOOOXXO", "OXXOXXXXXO", "OOOOXXXXXE"
        });

        SaveInMemory(result);
      }
      else
      {
        result = JsonConvert.DeserializeObject<List<List<string>>>(json);
      }

      return result;
    }

    public IEnumerable<IEnumerable<string>> Save(string[] data)
    {
      var result = GetAll().ToList();

      result.Add(data);

      SaveInMemory(result);      

      return GetAll();
    }
  }
}
