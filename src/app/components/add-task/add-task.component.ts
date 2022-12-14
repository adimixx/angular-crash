import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/data/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text?: string;
  day?: string;
  reminder: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.text || !this.day) {
      alert('Please Add Text and Day');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
