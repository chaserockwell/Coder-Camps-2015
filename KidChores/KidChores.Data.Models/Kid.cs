using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KidChores.Data.Models
{
    public class Kid
    {
        [Key]
        public int KidId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
