/**
 * @fileoverview contains all shared files imports.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LoaderComponent } from './loader/loader.component';
import { TitleFormationPipe } from './title-formation.pipe';
import { SharedMethodsService } from './shared-methods.service';
import { CurrencyFormatPipe } from './currency-format.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { OddsFormatPipe } from './odds-format.pipe';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
    ],

    declarations: [
        LoaderComponent,
        TitleFormationPipe,
        CurrencyFormatPipe,
        DateFormatPipe,
        OddsFormatPipe
    ],

    exports: [
        CurrencyFormatPipe,
        LoaderComponent,
        TitleFormationPipe,
        DateFormatPipe,
        OddsFormatPipe
    ],

    providers: [SharedMethodsService],

})
export class SharedModule {
}
