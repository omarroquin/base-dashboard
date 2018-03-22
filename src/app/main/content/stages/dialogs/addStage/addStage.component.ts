import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialog-add-stage',
  templateUrl: 'dialog-add-stage.html',
})
export class DialogAddStageComponent {
  name: string;
  order: number;
  constructor(
    public dialogRef: MdDialogRef<DialogAddStageComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  )
  {
    this.order = data.order;
  }

  private onSubmit(): void
  {
    let { name, order } = this;
    this.dialogRef.close({ name, order });
  }
}
