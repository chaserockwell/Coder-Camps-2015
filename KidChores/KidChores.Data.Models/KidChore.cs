using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KidChores.Data.Models
{
    public class KidChore
    {
        [Key]
        public int KidChoreId { get; set; }

        public int KidId { get; set; }
        [ForeignKey("KidId")]
        public virtual Kid Kid { get; set; }

        public int ChoreId { get; set; }
        [ForeignKey("ChoreId")]
        public virtual Chore Chore { get; set; }
    }
}
