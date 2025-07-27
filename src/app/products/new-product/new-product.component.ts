import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../products.service';
import { Item } from '../product/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  imports: [FormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  @Input({ required: true }) products: Item[] | undefined = [];
  response: any;
  error: any;
  product = {
    productId: '',
    productName: '',
    productDescription: '',
    productPrice: 0,
  };

  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // check MIME type...
    const allowedTypes = ['image/jpeg', 'image/png'];
    // const maxSizeInBytes = 2 * 1024 * 1024;

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG and PNG files are allowed.');
      this.clearFileInput(event); // reset file input
      return;
    }

    // if (file.size > maxSizeInBytes) {
    //   alert('File size should not exceed 2 MB.');
    //   this.clearFileInput(event);
    //   return;
    // }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
    return this.imagePreview;
  }

  clearFileInput(event: any) {
    this.selectedFile = null as any;
    this.imagePreview = null;
    event.target.value = ''; // Reset input
  }

  onAddProduct() {
    const formData = new FormData();
    formData.append('productName', this.product.productName);
    formData.append('productDescription', this.product.productDescription);
    formData.append('productPrice', this.product.productPrice.toString());
    formData.append('imageFile', this.selectedFile);

    this.productService.addProducts(formData).subscribe({
      next: (response: any) => {
        alert(response.message);
        this.products?.unshift(response.product);
        // console.log(response);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }

  onCloseAddProduct() {
    this.router.navigateByUrl('/');
  }
}
