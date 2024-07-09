using Vk.Data.Domain;
using Vk.Data.Repository;

namespace Vk.Data.Uow;

public interface IUnitOfWork
{
    void Complete();
    void CompleteTransaction();

    IGenericRepository<User> UserRepository { get; }
    IGenericRepository<Product> ProductRepository { get; }

}