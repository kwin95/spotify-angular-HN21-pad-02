import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "summary",
})
export class SummaryPipe implements PipeTransform {
  transform(value: string, limit: number): any {
    limit = limit ? limit : 40;
    if (value.length > limit) {
      return value.substring(0, limit) + " ...";
    } else {
      return value;
    }
  }
}
