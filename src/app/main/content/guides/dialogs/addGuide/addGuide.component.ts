import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialog-add-guide',
  templateUrl: './dialog-add-guide.html',
  styleUrls  : ['./dialog-add-guide.scss']
})
export class DialogAddGuideComponent {
  guide: any = {
    name: null,
    order: null,
    purpose: null,
    utility: null,
    area: null,
    stageId: null
  };
  constructor(
    public dialogRef: MdDialogRef<DialogAddGuideComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  )
  {
    this.guide.order = data.order;
    this.guide.stageId = data.stageId;
  }

  private onSubmit(): void
  {
    this.dialogRef.close(this.guide);
  }
}
