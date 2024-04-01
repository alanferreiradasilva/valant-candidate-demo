using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ValantDemoApi.Tests
{
  [TestFixture]
  public class ScenarioControllerTest
  {
    private HttpClient client;

    [OneTimeSetUp]
    public void Setup()
    {
      var factory = new APIWebApplicationFactory();
      this.client = factory.CreateClient();
    }

    [Test, Order(1)]
    public async Task ShouldReturnMainMemoryCachedScenario()
    {
      var result = await this.client.GetAsync("/Scenario");
      result.EnsureSuccessStatusCode();
      var content = JsonConvert.DeserializeObject<IEnumerable<IEnumerable<string>>>(await result.Content.ReadAsStringAsync());

      content.Count().Should().Be(1);
      JsonConvert.SerializeObject(content).Should().Be("[[\"SOXXXXXXXX\",\"OOOXXXXXXX\",\"OXOOOXOOOO\",\"XXXXOXOXXO\",\"OOOOOOOXXO\",\"OXXOXXXXXO\",\"OOOOXXXXXE\"]]");
    }

    [Test]
    public async Task ShouldCreateScenarioAndReturnAllScenarios()
    {
      string requestBody = "[\"XXXX\",\"SOOX\",\"XXOE\"]";
      var stringContent = new StringContent(requestBody, Encoding.UTF8, "application/json");

      var result = await this.client.PostAsync("/Scenario", stringContent);
      result.EnsureSuccessStatusCode();
      var content = JsonConvert.DeserializeObject<IEnumerable<IEnumerable<string>>>(await result.Content.ReadAsStringAsync());

      content.Count().Should().Be(2);

      string expected = "[[\"SOXXXXXXXX\",\"OOOXXXXXXX\",\"OXOOOXOOOO\",\"XXXXOXOXXO\",\"OOOOOOOXXO\",\"OXXOXXXXXO\",\"OOOOXXXXXE\"],[\"XXXX\",\"SOOX\",\"XXOE\"]]";
      JsonConvert.SerializeObject(content).Should().Be(expected);
    }
  }
}
