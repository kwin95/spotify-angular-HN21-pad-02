import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
export interface Option {
  name: string;
  value: number | string;
}
@Component({
  selector: "app-dropdown-menu",
  templateUrl: "./dropdown-menu.component.html",
  styleUrls: ["./dropdown-menu.component.scss"],
})
export class DropdownMenuComponent implements OnInit {
  show = false;
  @Input("options") options: Option[] = [];
  @Input("title") title = "";
  @Output("select") select = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  onSelect(value) {
    this.select.emit(value);
  }
}
