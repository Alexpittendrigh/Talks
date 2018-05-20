using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NLog;

namespace Examples {
  class Program {

    static void Main (string[] args) {
      using (var context = new ExampleContext()) {
        var source = context.Account.FirstOrDefault(acc => acc.accountId == 1);
        var destination = context.Account.FirstOrDefault(acc => acc.accountId == 2);
        // TranserMoney(source, destination, 500, context);
        TranserMoneyAtomic(source, destination, 500, context);
      }
    }

    private static void TranserMoney(Account source, Account destination, decimal amount, ExampleContext context) {
      destination.balance += amount;
      context.SaveChanges();

      source.balance -= amount;
      context.SaveChanges();
    }
    private static void TranserMoneyAtomic(Account source, Account destination, decimal amount, ExampleContext context) {
      source.balance -= amount;
      destination.balance += amount;
      context.SaveChanges();
    }
  }
}