using FluentValidation;
using Vk.Schema;

namespace Vk.Operation.Validation;

public class CreateTokenValidator : AbstractValidator<TokenRequest>
{

    public CreateTokenValidator()
    {
        RuleFor(x => x.Email).NotEmpty().WithMessage("Email is required.").EmailAddress()
        .WithMessage("A valid email address is required.");
        RuleFor(x => x.Password).NotEmpty().MinimumLength(5).WithMessage("Password is required.");
    }
}