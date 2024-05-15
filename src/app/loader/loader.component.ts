import { Component, Input } from '@angular/core';
import { LoaderService } from './loader.service';
import { Loader } from './loader.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() public id: string = 'global';
  public show: boolean | undefined;

  constructor(private loaderService: LoaderService) {
  }

  public ngOnInit(): void {
      this.loaderService.loaderStatus$.subscribe((response: Loader) => {
          this.show = this.id === response.id && response.status;
      });
  }
}
