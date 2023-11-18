using System;

namespace food_ideas_API.Entities
{
    public class Food
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Day { get; set; }
        public Food(Guid Id, string Name, DateTime Day)
        {
            this.Id = Id;
            this.Name = Name;
            this.Day = Day;
        }
    }
}