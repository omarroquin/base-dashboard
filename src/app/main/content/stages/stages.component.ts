import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { GraphqlService } from '../services/graphql/graphql.service';
import { DialogAddStageComponent } from './dialogs/addStage/addStage.component';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import gql from 'graphql-tag';

const queries = {
  getStages: gql`
    query {
      stages {
        _id name order
      }
    }
  `,
};

const mutations = {
  stageAdd: gql`
    mutation stageAdd($stage: NewStage!) {
      stageAdd(stage: $stage) {
        _id name order
      }
    }
  `,
  stageRemove: gql`
    mutation stageRemove($id: ID!) {
      stageRemove(id: $id) {
        _id name order
      }
    }
  `,
};

@Component({
    selector   : 'stages',
    templateUrl: './stages.component.html',
    styleUrls  : ['./stages.component.scss']
})
export class StagesComponent implements OnInit
{
    rows: any[] = [];
    loadingIndicator = true;
    reorderable = true;

    constructor(
      private authorizationService: AuthorizationService,
      private graphqlService: GraphqlService,
      public dialog: MdDialog
    )
    {

    }

    ngOnInit()
    {
      this.authorizationService.isLogged();
      this.getStages();
    }

    private async getStages()
    {
      this.loadingIndicator = true;
      try {
        this.rows = this.mapStages((await this.graphqlService.query(queries.getStages))['data'].stages);
        this.loadingIndicator = false;
      } catch(error) {
        this.loadingIndicator = false;
        console.error(error);
      }
    }

    private mapStages (stages)
    {
      return stages.map(stage => {
        let { _id, name, order } = stage;
        return { _id, name, order };
      });
    }

    public addStage()
    {
      let dialogRef = this.dialog.open(DialogAddStageComponent, {
        width: '250px',
        data: { order: this.rows.length + 1 }
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result && result.name && result.order) {
          let variables = { stage: result };
          try {
            let { _id, name, order } = (await this.graphqlService.mutation(
              mutations.stageAdd,
              variables
            ))['data'].stageAdd;
            this.rows.push({ _id, name, order });
          } catch(error) {
            console.error(error);
          }
        };
      });
    }

    public async removeStage(stage)
    {
      try {
        let removedStage = await this.graphqlService.mutation(
          mutations.stageRemove,
          { id: stage._id }
        );
        let rows = [...this.rows];
        rows.splice(stage.$$index, 1);
        this.rows = [...rows];
      } catch(err) {
        console.error(err);
      }
    }
}
