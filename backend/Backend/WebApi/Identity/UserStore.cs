using Microsoft.AspNetCore.Identity;

namespace WebApi1.Identity
{
    /// <inheritdoc />
    internal sealed class UserStore : IUserStore<User>, IUserPasswordStore<User>
    {
        private static readonly Task<User> _emptyUser = Task.FromResult<User>(null);
        private static readonly Task<string> _emptyHash = Task.FromResult<string>(null);
        private static readonly Task<bool> _true = Task.FromResult(true);

        private readonly Guid _id = Guid.NewGuid();
        private readonly string _userName;
        private readonly Task<User> _user;
        private readonly Task<string> _hash;
        private bool disposedValue;

        public UserStore(IServiceProvider services)
        {
            _userName = "admin";
            var user = new User(_id, _userName, "Admin");
            _hash = Task.FromResult(services.GetRequiredService<IPasswordHasher<User>>().HashPassword(user, "adminpassword"));
            _user = Task.FromResult(user);
        }
        public Task<string> GetUserIdAsync(User user, CancellationToken cancellationToken) => Task.FromResult(user.Id.ToString());
        public Task<string> GetUserNameAsync(User user, CancellationToken cancellationToken) => Task.FromResult(user.UserName);
        public Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken) => Guid.TryParse(userId, out var id) && _id == id ? _user : _emptyUser;
        public Task<User> FindByNameAsync(string userName, CancellationToken cancellationToken) => _userName.Equals(userName, StringComparison.InvariantCultureIgnoreCase) ? _user : _emptyUser;
        public Task<string> GetPasswordHashAsync(User user, CancellationToken cancellationToken) => _id == user?.Id ? _hash : _emptyHash;
        public Task<bool> HasPasswordAsync(User user, CancellationToken cancellationToken) => _true;
        public Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken) => throw new NotSupportedException();
        public Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken) => throw new NotSupportedException();
        public Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken) => throw new NotSupportedException();
        public Task SetUserNameAsync(User user, string userName, CancellationToken cancellationToken) => throw new NotSupportedException();
        public Task<string> GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken) => throw new NotSupportedException();
        public Task SetNormalizedUserNameAsync(User user, string normalizedName, CancellationToken cancellationToken) => throw new NotSupportedException();
        public Task SetPasswordHashAsync(User user, string passwordHash, CancellationToken cancellationToken) => throw new NotSupportedException();

        private void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects)
                }

                // TODO: free unmanaged resources (unmanaged objects) and override finalizer
                // TODO: set large fields to null
                disposedValue = true;
            }
        }

        // // TODO: override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
        // ~UserStore()
        // {
        //     // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
        //     Dispose(disposing: false);
        // }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
