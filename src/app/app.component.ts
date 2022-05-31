import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  genders = ['male', 'female'];
  forbidenUsernames= ['chibo', 'nino'];

  signUpform: FormGroup;

  ngOnInit(): void {
    this.signUpform =new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbidenNames.bind(this) ]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.fobiddenEmails)
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])

    });
    // this.signUpform.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signUpform.statusChanges.subscribe(
      (value) => console.log(value)
    );
    this.signUpform.setValue({
      'userData': {
        'username': 'Gorda',
        'email': 'eee@eee.com'
      },
      'gender': 'female',
      'hobbies': []
    });
  }

  onSubmit(){
    console.log(this.signUpform);
    this.signUpform.reset();
  }

  getControls() {
    return (this.signUpform.get('hobbies') as FormArray).controls;
  }

  onAddHobbie(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpform.get('hobbies')).push(control );
  }

  forbidenNames(control: FormControl): {[s: string]:boolean}{
    if(this.forbidenUsernames.indexOf(control.value) !==-1){
      return {'nameIsForbidden': true}
    }
    return null;
  }

  fobiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>( (resolve, reject) => {
      setTimeout( () => {
        if(control.value === 'test@Tested.com'){
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null)
        }
      } ,1500);
    });
    return promise;
  }

}
