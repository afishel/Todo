using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;

namespace TodoApi.Controllers
{
  [Route("api/Trashed/Todo")]
  [ApiController]
  public class TrashedTodoController : ControllerBase
  {
    private readonly TrashedTodoContext _context;

    public TrashedTodoController(TrashedTodoContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
      return await _context.TodoItems.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
    {
      var todoItem = await _context.TodoItems.FindAsync(id);

      if (todoItem == null)
        return NotFound();

      return todoItem;
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchTodoItem(long id, TodoItem item)
    {
      if (id != item.Id)
        return BadRequest();

      item.DeletedAt = null;

      _context.Entry(item).State = EntityState.Modified;
      await _context.SaveChangesAsync();

      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
      var todoItem = await _context.TodoItems.FindAsync(id);

      if (todoItem == null)
        return NotFound();

      _context.TodoItems.Remove(todoItem);
      await _context.SaveChangesAsync();

      return NoContent();
    }
  }
}
