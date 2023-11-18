using food_ideas_API.Entities;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace food_ideas_API.Repositories
{
  public class MongoDbFoodsRepository : IInMemFoodRepository
  {
    private const string databaseName = "food";
    private const string collectionName = "foods";
    private readonly IMongoCollection<Food> foodsCollection;
    public MongoDbFoodsRepository(IMongoClient mongoClient) {
        IMongoDatabase database = mongoClient.GetDatabase(databaseName);
        foodsCollection = database.GetCollection<Food>(collectionName);
    }
    public void CreateItem(Food food) {
        foodsCollection.InsertOne(food);
    }
    public Food GetFood(Guid id)
    {
      throw new NotImplementedException();
    }

    public IEnumerable<Food> GetFoods(DateTime day)
    {
      day = day.Date;
      var filteredFoods = foodsCollection
        .AsQueryable()
        .Where((food) => food.Day  >= day && food.Day < day.AddDays(1))
        .ToList();
      //return foodsCollection.Find(food => food.Day == day).ToList();
      return filteredFoods;
    }
  }
}
