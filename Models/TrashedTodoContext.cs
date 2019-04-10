using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class TrashedTodoContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }

        public TrashedTodoContext(DbContextOptions<TrashedTodoContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TodoItem>()
                .HasQueryFilter(x => EF.Property<DateTime>(x, "DeletedAt") != null);
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSaving();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void OnBeforeSaving()
        {
            var now = DateTime.Now;

            foreach (var entry in ChangeTracker.Entries<TodoItem>())
            {
                switch (entry.State)
                {
                case EntityState.Added:
                    entry.CurrentValues["CreatedAt"] = now;
                    break;

                case EntityState.Modified:
                    entry.CurrentValues["UpdatedAt"] = now;
                    break;
                }
            }
        }
    }
}
