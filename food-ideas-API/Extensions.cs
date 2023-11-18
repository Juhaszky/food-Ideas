using food_ideas_API.Dtos;
using food_ideas_API.Entities;

namespace food_ideas_API
{
    public static class Extensions {
        public static FoodDto AsDto(this Food food) {
            return new FoodDto { Id = food.Id, Name = food.Name, Day = food.Day };
        }
    }
}