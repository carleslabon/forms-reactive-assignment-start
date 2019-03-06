import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatus = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  projectData: {
    projectName: '',
    email: '',
    projectStatus: ''
  };

  ngOnInit() {
    this.projectForm = new FormGroup({
        'projectData': new FormGroup({
          'projectName': new FormControl(null, Validators.required, this.invalidProjectName),
          'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'projectStatus': new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  invalidProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'invalidName': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
