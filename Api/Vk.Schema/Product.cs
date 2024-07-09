public class ProductRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string PictureUrl { get; set; }
    public string ProductType { get; set; }
    public string ProductBrand { get; set; }
    public string Color { get; set; }

    public int Popularity { get; set; }
}

public class ProductResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string PictureUrl { get; set; }
    public string ProductType { get; set; }
    public string ProductBrand { get; set; }
    public string Color { get; set; }
    public int Popularity { get; set; }
}

public class ProductQueryParameters
{
    public string? Name { get; set; }
    public string? ProductType { get; set; }
    public string? ProductBrand { get; set; }
    public string? Color { get; set; }
    public string? SortBy { get; set; }
}
