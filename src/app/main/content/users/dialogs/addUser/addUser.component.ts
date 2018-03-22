import { Component, Inject } from '@angular/core';
import { GraphqlService } from '../../../services/graphql/graphql.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
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

@Component({
  selector: 'dialog-add-user',
  templateUrl: 'dialog-add-user.html',
  styleUrls  : ['./dialog-add-user.scss']
})
export class DialogAddUserComponet {
  name: string;
  email: string;
  password: string;
  type: string;
  clientId: string;
  clients: any[];
  constructor(
    private graphqlService: GraphqlService,
    public dialogRef: MdDialogRef<DialogAddUserComponet>,
    @Inject(MD_DIALOG_DATA) public data: any
  )
  {
    this.getClients();
  }

  public async getClients()
  {
    this.clients = (await this.graphqlService.query(queries.getClients))['data'].clients;
  }

  private onSubmit(): void
  {
    let { name, email, password, type, clientId } = this;
    this.dialogRef.close({ name, email, password, type: parseInt(type), clientId });
  }
}
