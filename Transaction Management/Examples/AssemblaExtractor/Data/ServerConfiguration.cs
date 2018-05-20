using System;

namespace Examples {
  public class ServerConfiguration {
    public string type { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public int? port { get; set; }
    public string server { get; set; }
    public string databaseName { get; set; }

    public string AsConnectionString () {
      string dataSource = port != null ? String.Format ("{0},{1}", server, port) : server;
      return String.Format (
          @"Data Source={0};Initial Catalog={1};User Id={2};Password={3}",
          dataSource, databaseName, username, password
        );
    }
  }
}