import { TestBed, inject } from '@angular/core/testing';
import { DateFormatPipe } from './date-format.pipe';
import { DateFormatService } from '../shared/date-format.service';

describe('DateFormatPipe', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
              DateFormatService
            ]
        });
    });

    it('create an instance', inject([DateFormatService], (dateFormatter: DateFormatService) => {
        const pipe = new DateFormatPipe(dateFormatter);
        expect(pipe).toBeTruthy();
    }));
});
