using System.ComponentModel.DataAnnotations;
using food_ideas_API.Dtos;
using food_ideas_API.Entities;
using food_ideas_API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace food_ideas_API.Controllers
{
    [ApiController]
    [Route("foods")]
    public class FoodsController : ControllerBase
    {
        private readonly MongoDbFoodsRepository repository;

        public FoodsController(MongoDbFoodsRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IEnumerable<FoodDto> GetFoods([FromQuery, Required]DateTime day)
        {
            var items = repository.GetFoods(day).Select(food => food.AsDto());
            return items;
        }
        [HttpGet("{id}")]
        public ActionResult<FoodDto> GetItem(Guid id)
        {
            var item = repository.GetFood(id);
            if (item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }
    // ... (previous code)

    [HttpPost]
    public async Task<ActionResult<FoodDto>> CreateItem(FoodDto foodInput)
    {
      // Validate the incoming data
      if (foodInput == null)
      {
        return BadRequest();
      }

      // Create a Food entity from the DTO
      var food = new Food(Id: Guid.NewGuid(),
        Name: foodInput.Name,
        Day: DateTime.Now);
      
        
        // ... (other properties)
      

      // Insert the new food item into MongoDB
      repository.CreateItem(food);

      // Return the created item as a DTO
      return CreatedAtAction(nameof(GetItem), new { id = food.Id }, food.AsDto());
    }

  }
}
