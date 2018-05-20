using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Examples
{
    public class ExampleContext : DbContext
    {
        public DbSet<Account> Account { get; set; }
        public DbSet<AccountOwner> AccountOwner { get; set; }
        private ServerConfiguration devConfig = new ServerConfiguration {
            username = "sa",
            password = "8Characters!",
            port = 32768,
            server = "localhost",
            databaseName = "DotNetForum"
        };

        private static bool runAgainstLive = true;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = devConfig.AsConnectionString();

            Console.WriteLine("##**## connectionString " + connectionString);
            optionsBuilder.UseSqlServer(connectionString);
        }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<Space>()
        //         .Ignore(s => s.restricted_date);
        //     modelBuilder.Entity<Space>()
        //         .Ignore(s => s.banner_height);
        //     modelBuilder.Entity<Space>()
        //         .Ignore(s => s.banner_link);
        // }
    }
}
