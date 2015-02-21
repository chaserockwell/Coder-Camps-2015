using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KidChores.Data.Models
{
    public class Chore
    {
        [Key]
        public int ChoreId { get; set; }
        public string ChoreName { get; set; }
    }
}
