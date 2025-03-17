import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private pensamentoService: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.formulario = this.formBuilder.group({
      id:[id],
      conteudo: ['', Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
      autoria: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      modelo: ['', [Validators.required]]
    })

    this.pensamentoService.buscarPorId((id!)).subscribe((pensamento) => {
      this.formulario.get('conteudo')?.setValue(pensamento.conteudo)
      this.formulario.get('autoria')?.setValue(pensamento.autoria)
      this.formulario.get('modelo')?.setValue(pensamento.modelo)
    })

  }

  editarPensamento(){
    this.pensamentoService.editar(this.formulario.value).subscribe(() =>{
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelarPensamento(){
    this.router.navigate(['/listarPensamento'])
  }

}
