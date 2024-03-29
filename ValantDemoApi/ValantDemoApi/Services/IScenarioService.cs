using System.Collections;
using System.Collections.Generic;

namespace ValantDemoApi.Services
{
  public interface IScenarioService
  {
    IEnumerable<IEnumerable<string>> GetAll();

    IEnumerable<IEnumerable<string>> Save(string[] data);
  }
}
