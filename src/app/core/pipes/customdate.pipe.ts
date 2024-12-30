import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {
  transform(date: string, format: 'date' | 'time' = 'date', sep: string = '/'): string {
    if (!date) return '';
    const d = new Date(date);
    
    // const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // ${dayOfWeek}
    
    // const dayOfWeek = daysOfWeek[d.getDay()];  
    const month = months[d.getMonth()]; 
    if (format === 'date') {
      return `${d.getDate()}  ${month} `;
    } else {
      return `${(d.getHours() % 12 || 12).toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
    }
  }
}
