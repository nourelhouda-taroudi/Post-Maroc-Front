import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthsToYears'
})
export class MonthsToYearsPipe implements PipeTransform {

  transform(months: number, ...args: unknown[]): unknown {
    const years = Math.floor(months / 12);
    let yearsDur = years > 0 ? `${years} année` : '';
    yearsDur = years > 1 ? `${yearsDur}s` : yearsDur;

    const restMonths = months - years * 12;
    let monthsDur = restMonths > 0 ? `${restMonths} mois` : '';
    monthsDur = restMonths > 1 ? `${monthsDur}` : monthsDur;

    const and = years > 0 && restMonths > 0 ? ', et ' : '';

    return `${yearsDur}${and}${monthsDur}`;
  }

}
