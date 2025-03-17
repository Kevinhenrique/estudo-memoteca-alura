import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listarPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = ''
  itensPorPagina: number = 5;
  constructor(private pensamentoService: PensamentoService) { }

  ngOnInit(): void {
    this.listarPensamento();
  }

  listarPensamento() {
    this.pensamentoService.listar(this.paginaAtual, this.itensPorPagina, this.filtro).subscribe(pensamento => {
      this.listarPensamentos = pensamento;
    })
  }

  carregarMaisPensamentos() {
    this.itensPorPagina = this.itensPorPagina + 5
    this.pensamentoService.listar(++this.paginaAtual, this.itensPorPagina, this.filtro).subscribe(listar => {
      this.haMaisPensamentos = this.listarPensamentos.length === listar.length ? false : true;
      this.listarPensamentos = [];
      this.listarPensamentos = listar;
    })
  }

  pesquisarPensamentos() {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.pensamentoService.listar(this.paginaAtual, this.itensPorPagina, this.filtro).subscribe(listaPensamento => {
      this.listarPensamentos = listaPensamento
    })
  }

}
