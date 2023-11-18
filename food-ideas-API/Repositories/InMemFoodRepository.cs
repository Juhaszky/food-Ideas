using food_ideas_API.Entities;

namespace food_ideas_API.Repositories
{
   
    public class InMemFoodRepository : IInMemFoodRepository
    {
        private readonly List<Food> foods = new() {
            new Food(Id: Guid.NewGuid(), Name: "Babgulyás", Day: DateTime.Now)
        };
        public IEnumerable<Food> GetFoods(DateTime day)
        {
            return foods.Where(food => food.Day == day);
        }
        public Food GetFood(Guid id)
        {
            return foods.Where(item => item.Id == id).SingleOrDefault();
        }
    }
}