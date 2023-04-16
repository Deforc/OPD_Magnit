using System;
using Microsoft.AspNetCore.Identity;

namespace WebApi1.Identity
{
    /// <inheritdoc/>
    public class User : IdentityUser<Guid>
    {
        private readonly string _userName;
        /// <inheritdoc/>
        public User(Guid id, string name, string scope)
        {
            Id = id;
            _userName = name;
            Scope = scope;
        }
        /// <inheritdoc/>
        public override string UserName
        {
            get => _userName;
            set => throw new NotSupportedException();
        }
        /// <summary>
        /// Roles
        /// </summary>
        public string Scope { get; init; }
    }
}
