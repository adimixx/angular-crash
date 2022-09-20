import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/data/Task';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  showAddTask: boolean = false;

  constructor(private taskService: TaskService, private uiService: UiService) {
    uiService.onToggle().subscribe((x) => (this.showAddTask = x));
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((x) => (this.tasks = x));
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleTask(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.toggleTask(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.createTask(task).subscribe((x) => this.tasks.push(x));
    this.uiService.toggleAddTask();
  }
}
