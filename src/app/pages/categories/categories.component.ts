import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { SubcategoriesService } from '../../core/services/subcategories/subcategories.service';
import { SubCat } from '../../shared/interfaces/sub-cat';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  subcategoriesService = inject(SubcategoriesService);
  categories: WritableSignal<ICategories[]> = signal([]);
  SubCategories: WritableSignal<SubCat[]> = signal([]);
  nameCat: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
        console.log(this.categories());
      },
    });
  }

  getSubCat(id: string, name: string): void {
    this.subcategoriesService.showAllSubOnCat(id).subscribe({
      next: (res) => {
        this.SubCategories.set(res.data);
        this.nameCat.set(name + '  Subcategories');
      },
    });
  }
}
