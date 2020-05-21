using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PointOfSale.Startup))]
namespace PointOfSale
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
