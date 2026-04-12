# Migrations

In entity framework, you can perform a migration which takes your classes, and converts them into SQL to update your database. You should never change your database directly because entity framework migration history will drift out of sync.

## Performing Migrations

To perform a migration, run the following commands:

```powershell
dotnet ef migrations add SomeChange
dotnet ef database update
```
