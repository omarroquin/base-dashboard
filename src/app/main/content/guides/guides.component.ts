import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { GraphqlService } from '../services/graphql/graphql.service';
import { DialogAddGuideComponent } from './dialogs/addGuide/addGuide.component';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import gql from 'graphql-tag';

const queries = {
  getGuides: gql`
    query getGuides($stageId: ID!) {
      guides(stageId: $stageId) {
        _id name order purpose utility area
      }
    }
  `,
};

const mutations = {
  guideAdd: gql`
    mutation guideAdd($guide: NewGuide!) {
      guideAdd(guide: $guide) {
        _id name order purpose utility area
      }
    }
  `,
  guideRemove: gql`
    mutation guideRemove($id: ID!) {
      guideRemove(id: $id) {
        _id name order purpose utility area
      }
    }
  `,
};

@Component({
    selector   : 'guides',
    templateUrl: './guides.component.html',
    styleUrls  : ['./guides.component.scss']
})
export class GuidesComponent implements OnInit, OnDestroy
{
    rows: any[] = [];
    loadingIndicator = true;
    reorderable = true;
    stageId: string;
    subs: any;

    constructor(
      private route: ActivatedRoute,
      private authorizationService: AuthorizationService,
      private graphqlService: GraphqlService,
      public dialog: MdDialog
    )
    {

    }

    async ngOnInit()
    {
      await this.authorizationService.isLogged();
      this.subs = this.route.params.subscribe(async params => {
         this.stageId = params['id'];
         this.rows = this.mapGuides((await this.graphqlService.query(queries.getGuides, { stageId: this.stageId }))['data'].guides);
         this.loadingIndicator = false;
      });
    }

    ngOnDestroy()
    {
      this.subs.unsubscribe();
    }

    private mapGuides (stages)
    {
      return stages.map(stage => {
        let { _id, name, order, purpose, utility, area } = stage;
        return { _id, name, order, purpose, utility, area };
      });
    }

    public addGuide()
    {
      let dialogRef = this.dialog.open(DialogAddGuideComponent, {
        width: '500px',
        data: {
          order: this.rows.length + 1,
          stageId: this.stageId
        }
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          let isValid = true
          for (let key in result) {
            if (!result[key])
              isValid = false;
          }
          if (isValid) {
            let variables = { guide: result };
            try {
              let { _id, name, order, purpose, utility, area } = (await this.graphqlService.mutation(
                mutations.guideAdd,
                variables
              ))['data'].guideAdd;
              this.rows.push({ _id, name, order, purpose, utility, area });
            } catch(error) {
              console.error(error);
            }
          }
        };
      });
    }

    async removeGuide(guide)
    {
      try {
        let removedUser = await this.graphqlService.mutation(
          mutations.guideRemove,
          { id: guide._id }
        );
        let rows = [...this.rows];
        rows.splice(guide.$$index, 1);
        this.rows = [...rows];
      } catch(err) {
        console.error(err);
      }
    }
}
