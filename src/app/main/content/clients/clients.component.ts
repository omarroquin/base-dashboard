import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { GraphqlService } from '../services/graphql/graphql.service';
import { DialogAddClientComponet } from './dialogs/addClient/DialogAddClient.component';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import gql from 'graphql-tag';

const queries = {
  getClients: gql`
    query {
      clients {
        _id name
      }
    }
  `,
};

const mutations = {
  clientAdd: gql`
    mutation clientAdd($client: NewClient!) {
      clientAdd(client: $client) {
        _id name
      }
    }
  `,
  clientRemove: gql`
    mutation clientRemove($id: ID!) {
      userRemove(id: $id) {
        _id name
      }
    }
  `,
};

@Component({
    selector   : 'clients',
    templateUrl: './clients.component.html',
    styleUrls  : ['./clients.component.scss']
})
export class ClientComponent implements OnInit
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
      this.getClients();
    }

    private async getClients()
    {
      this.loadingIndicator = true;
      try {
        this.rows = this.mapClients((await this.graphqlService.query(queries.getClients))['data'].clients);
        this.loadingIndicator = false;
      } catch(error) {
        console.error(error);
      }
    }

    private mapClients (stages)
    {
      return stages.map(stage => {
        let { _id, name } = stage;
        return { _id, name };
      });
    }

    public addClient()
    {
      let dialogRef = this.dialog.open(DialogAddClientComponet, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          let variables = { client: result };
          try {
            let { _id, name } = (await this.graphqlService.mutation(
              mutations.clientAdd,
              variables
            ))['data'].clientAdd;
            this.rows.push({ _id, name });
          } catch(error) {
            console.error(error);
          }
        };
      });
    }

    public async removeClient(client)
    {
      try {
        let removedClient = await this.graphqlService.mutation(
          mutations.clientRemove,
          { id: client._id }
        );
        let rows = [...this.rows];
        rows.splice(client.$$index, 1);
        this.rows = [...rows];
      } catch(err) {
        console.error(err);
      }
    }
}
