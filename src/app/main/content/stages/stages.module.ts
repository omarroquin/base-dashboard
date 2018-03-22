import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { StagesComponent } from './stages.component';
import { DialogAddStageComponent } from './dialogs/addStage/addStage.component';

const routes = [
    {
        path     : 'stages',
        component: StagesComponent
    },
    {
        path     : 'stages/dialogs/addStage',
        component: DialogAddStageComponent
    }
];

@NgModule({
    declarations: [
        StagesComponent,
        DialogAddStageComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        StagesComponent,
        DialogAddStageComponent
    ]
})

export class StagesModule
{
}
