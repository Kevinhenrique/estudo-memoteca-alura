import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { ReturnStatement } from '@angular/compiler';
import { Pensamento } from './pensamento';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos';
  constructor(private http: HttpClient) { }

  listar(pagina: number,itensPorPagina: number, filtro: string) {

    let params = new HttpParams().set("_page", pagina).set("_limit", itensPorPagina)

    if (filtro.trim().length > 2){
      params = params.set("autoria", filtro)
    }

    return this.http.get<Pensamento[]>(this.API, { params });
  }

  cadastrar(pensamento: Pensamento) {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  excluir(id: string) {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  buscarPorId(id: string) {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  editar(pensamento: Pensamento) {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

}
