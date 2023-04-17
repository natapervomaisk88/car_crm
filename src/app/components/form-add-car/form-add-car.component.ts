import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service';
import { ICar } from 'src/app/models/ICar';
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
    private _window: DialogRef<FormAddCarComponent>
  ) {}

  ngOnInit(): void {
    this.carForm = this._fb.group({
      model: '',
      year: 0,
      number: '',
      color: '',
      type: '',
      isNew: 'true',
      vEngine: 0,
    });
  }

  addCar(): void {
    if (this.carForm.valid) {
      this._carService.createNewCar(this.carForm.value).subscribe({
        next: () => {
          alert('Success!');
          this._window.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
