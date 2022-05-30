import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  genders = ['male', 'female'];

  signUpform: FormGroup;

  ngOnInit(): void {
    this.signUpform =new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required, ),
      'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])

    });
  }

  onSubmit(){
    console.log(this.signUpform);
  }

  getControls() {
    return (this.signUpform.get('hobbies') as FormArray).controls;
  }

  onAddHobbie(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpform.get('hobbies')).push(control );
  }

}
