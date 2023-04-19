import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-form-add-car',
  templateUrl: './form-add-car.component.html',
  styleUrls: ['./form-add-car.component.scss'],
})
export class FormAddCarComponent implements OnInit {
  carForm!: FormGroup;
  colors: string[] = ['white', 'green', 'blue', 'red', 'yellow'];
  types: string[] = ['hatchback', 'sedan', 'cabriolet'];
  constructor(
    private _fb: FormBuilder,
    private _carService: CarsService,
    private _window: DialogRef<FormAddCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // this.carForm = new FormGroup({
    //   model: new FormControl(''),
    //   year: new FormControl(''),
    //   number: new FormControl(''),
    //   color: new FormControl(''),
    //   type: new FormControl(''),
    //   isNew: new FormControl(''),
    //   vEngine: new FormControl(0),
    // });
    this.carForm = this._fb.group({
      model: '',
      year: 0,
      number: '',
      color: '',
      type: '',
      isNew: 'true',
      vEngine: 0,
    });
    this.carForm.patchValue(this.data);
  }

  addCar(): void {
    if (this.carForm.valid) {
      if (this.data) {
        //update
        this._carService
          .updateCarById(this.data.id, this.carForm.value)
          .subscribe({
            next: () => {
              alert('success');
              this._window.close();
              this._carService.subject.next(this.carForm.value);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        //create
        this._carService.createNewCar(this.carForm.value).subscribe({
          next: () => {
            alert('Success!');
            this._window.close();
            this._carService.subject.next(this.carForm.value);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
