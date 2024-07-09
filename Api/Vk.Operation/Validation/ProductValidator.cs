using FluentValidation;


namespace Vk.Operation.Validation;
public class CreateProductValidator : AbstractValidator<ProductRequest>
{

    public CreateProductValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required.");
        RuleFor(x => x.Name).MinimumLength(2).WithMessage("Name length min value is 2.");
        RuleFor(x => x.Price).NotEmpty().WithMessage("Price is required.");
        RuleFor(x => x.Price).GreaterThan(0).WithMessage("Price must be greater than 0.");

    }
}