import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICar } from 'src/app/models/ICar';
import { CarsService } from 'src/app/services/cars.service';
import { FormAddCarComponent } from '../form-add-car/form-add-car.component';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.scss'],
})
export class ListCarsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'model',
    'number',
    'color',
    'year',
    'type',
    'isNew',
    'vEngine',
    'actions',
    'edit',
  ];

  dataSource!: MatTableDataSource<ICar>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _carService: CarsService, private _window: MatDialog) {}

  ngOnInit(): void {
    this.getAllCars();
    this._carService.subject.subscribe({
      next: () => {
        this.getAllCars();
      },
    });
  }

  getAllCars(): void {
    this._carService.getAllCars().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.log(err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCar(id: number): void {
    this._carService.deleteCarById(id).subscribe({
      next: () => {
        alert('Success');
        this._carService.subject.next(id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCar(data: any): void {
    this._window.open(FormAddCarComponent, { data });
  }
}
