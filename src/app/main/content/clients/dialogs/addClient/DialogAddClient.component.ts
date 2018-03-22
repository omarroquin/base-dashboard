import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'DialogAddClient',
  templateUrl: './DialogAddClient.component.html',
  styleUrls  : ['./DialogAddClient.component.scss']
})
export class DialogAddClientComponet {
  name: string;
  constructor(
    public dialogRef: MdDialogRef<DialogAddClientComponet>,
    @Inject(MD_DIALOG_DATA) public data: any
  )
  {

  }

  private onSubmit(): void
  {
    let { name } = this;
    this.dialogRef.close({ name });
  }
}
