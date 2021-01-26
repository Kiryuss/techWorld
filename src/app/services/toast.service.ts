import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showError(message: string, title: string){
      this.toastr.error(JSON.stringify(message), title)
  }

  success(message: string, title: string){
    this.toastr.success(JSON.stringify(message), title)
  }
}