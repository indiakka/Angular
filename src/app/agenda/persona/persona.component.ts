import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Persona } from './../../interfaces/persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  do: string = 'insert';
  position: any = 0;

  perfilForm!: FormGroup;

  contacts: Array<Persona> = [];

  contact: Persona = {
    nombre: '',
    apellidos: '',
    edad: '',
    dni: '',
    cumpleanios: '',
    colorFavorito: '',
    sexo: '',
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(125)]],
      dni: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      cumpleanios: ['', [Validators.required]],
      colorFavorito: ['', [Validators.required, Validators.minLength(3)]],
      sexo: ['', [Validators.required]],
    });
    this.list();
  }

  get nombre() {
    return this.perfilForm.get('nombre')!;
  }
  get apellidos() {
    return this.perfilForm.get('apellidos')!;
  }
  get edad() {
    return this.perfilForm.get('edad')!;
  }
  get dni() {
    return this.perfilForm.get('dni')!;
  }
  get cumpleanios() {
    return this.perfilForm.get('cumpleanios')!;
  }
  get colorFavorito() {
    return this.perfilForm.get('colorFavorito')!;
  }
  get sexo() {
    return this.perfilForm.get('sexo')!;
  }

  add(form: FormGroupDirective) {
    this.contact.cumpleanios = this.perfilForm
      .get('cumpleanios')
      ?.value.format('yyyy-MM-DD');

    const ageNum = parseInt(this.perfilForm.get('edad')?.value);
    if (ageNum < 0 || ageNum > 125) {
      return;
    }
  }

  delete(delPosition: number): void {
    this.httpClient
      .delete(
        `http://localhost:3000/personas/${this.contacts[delPosition]._id}`
      )
      .subscribe((res) => {
        console.log(res);
        this.contacts.splice(delPosition, 1);
      });
  }

  update(upPosition: number): void {
    this.do = 'update';
    //this.contact = this.contacts[upPosition];
    this.position = upPosition;
    this.httpClient;
    /*  .get('http://localhost:3000/personas', this.contact)
      .subscribe((res) => console.log(res));*/
  }

  list() {
    this.httpClient
      .get('http://localhost:3000/personas')
      .subscribe( ( res ) =>
      {
        this.contacts = res as Persona[];
      } );
  }

  onSubmit(form: FormGroupDirective) {
    if (this.perfilForm.valid) this.add(form);

    console.log('enviando contacto', { contact: this.contact });
    this.httpClient
      .post('http://localhost:3000/personas', this.contact)
      .subscribe((res: any) => {
        this.contact = {
          nombre: '',
          apellidos: '',
          edad: '',
          dni: '',
          cumpleanios: new Date(),
          colorFavorito: '',
          sexo: '',
        };

        this.do = 'insert';
        this.perfilForm.reset();
        form.resetForm();

        const personaEnBD = res.ops[0];
        console.log({ personaEnBD });
        if (this.do === 'insert') {
          this.contacts.push(personaEnBD);
        } else {
          this.contacts[this.position] = this.contact;
        }
        this.do = 'insert';
      });
  }
}
