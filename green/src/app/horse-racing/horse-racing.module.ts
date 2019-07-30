import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCheckboxModule, MdSliderModule, MdSelectModule } from '@angular/material';
import 'hammerjs';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdCheckboxModule,
        MdSliderModule,
        MdSelectModule,
        SharedModule
    ],
    declarations: []
})
export class HorseRacingModule { }
