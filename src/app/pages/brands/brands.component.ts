import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brandsService = inject(BrandsService);
  brandData!: IBrand[];
  spacifibrandData!: IBrand;
  ngOnInit(): void {
    this.showAllBrands();
  }
  showAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandData = res.data;
      },
    });
  }
  isShow() {
    this.show = !this.show;
  }

  
  show:boolean = false; // متغير التحكم في إظهار القسم الأول

  

  hideSection() {
    this.show = false; // إخفاء القسم الأول عند النقر في أي مكان
  }


  showDeatils(id: string): void {
    this.brandsService.getSpacifiBrand(id).subscribe({
      next: (res) => {
        this.show = true;

        console.log(res.data);
        this.spacifibrandData = res.data;
      },
    });
  }
}
