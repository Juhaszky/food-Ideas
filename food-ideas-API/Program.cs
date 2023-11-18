using food_ideas_API.Repositories;
using MongoDB.Driver;
using food_ideas_API.Settings;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddSingleton<IInMemFoodRepository,InMemFoodRepository>();
builder.Services.AddSingleton<MongoDbFoodsRepository>();
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection(nameof(MongoDbSettings)));
builder.Services.AddCors(options => {
    options.AddPolicy(name: "AllowOrigin", builder => {
        builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowAnyOrigin();
    });
});
builder.Configuration.AddJsonFile("./food-ideas-API/appsettings.json");


builder.Services.AddSingleton<IMongoClient>(serviceProvider => {
    
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();
    var settings = new MongoDbSettings();
    configuration.GetSection(nameof(MongoDbSettings)).Bind(settings);
    if (settings == null)
    {
        throw new InvalidOperationException($"Missing or invalid configuration section: {nameof(MongoDbSettings)}");
    }

    // Attempt to bind the settings
    
    try
    {
        configuration.GetSection(nameof(MongoDbSettings)).Bind(settings);
    }
    catch (Exception ex)
    {
        throw new InvalidOperationException($"Error binding configuration for {nameof(MongoDbSettings)}", ex);
    }

    // Check if settings are valid
    if (string.IsNullOrEmpty(settings.ConnectionString))
    {
        throw new InvalidOperationException($"Invalid configuration for {nameof(MongoDbSettings)} - ConnectionString is empty or null.");
    }

    Console.WriteLine($"MongoDB Configuration: Host={settings.Host}, Port={settings.Port}, ConnectionString={settings.ConnectionString}");

    return new MongoClient(settings.ConnectionString);
});
/*builder.Services.AddSingleton<IMongoClient, MongoClient>(_ => {
    var settings = _.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    Console.WriteLine($"beáll: {settings}");
    Console.WriteLine($"Beállitasáok: host={settings.Host}, port={settings.Port}");
});*/
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
