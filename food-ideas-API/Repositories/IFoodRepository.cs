using food_ideas_API.Entities;

namespace food_ideas_API.Repositories

{
    public interface IInMemFoodRepository
    {
        Food GetFood(Guid id);
        IEnumerable<Food> GetFoods(DateTime day);
    }
}