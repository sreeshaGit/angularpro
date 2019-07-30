/**
 * @fileoverview contains all logic for title formation.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleFormation'
})
export class TitleFormationPipe implements PipeTransform {
    isSport = false;
    isCountry = false;
    title = '';
    transform(value: any, args?: any): any {
        if (value.translatedSportName !== '' && value.translatedSportName !== null) {
            this.title = value.translatedSportName;
            this.isSport = true;
        }
        if (value.Country !== '' && value.Country !== null) {
            if (this.isSport) {
                this.title += ' / ' + value.Country;
            } else {
                this.title = value.Country;
            }
            this.isCountry = true;
        }
        if (value.LeagueName !== '' && value.LeagueName !== null) {
            if (this.isSport || this.isCountry) {
                this.title += ' / ' + value.LeagueName;
            } else {
                this.title = value.LeagueName;
            }
        }
        return this.title;
    }
}
