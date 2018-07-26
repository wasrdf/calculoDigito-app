import { CalculoDigitoService } from "./../calculo-digito.service";
import { Component, OnInit } from "@angular/core";
import { Arquivo } from "../arquivo.model";

@Component({
  selector: "app-calculo-digito",
  templateUrl: "./calculo-digito.component.html"
})
export class CalculoDigitoComponent implements OnInit {
  downloadArquivo: Arquivo;

  constructor(private service: CalculoDigitoService) {}

  ngOnInit() {}

  
  gerarMatriculasComDV(e: Event) {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    for (var i = 0; i < target.files.length; i++) {
      this.gerarMatricasDV(target.files[i],'matriculasComDV');
    }
  }

  matriculasParaVerificar(e: Event) {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    for (var i = 0; i < target.files.length; i++) {
      this.verificarMatriculas(target.files[i],'matriculasVerificadas');
    }
  }

  gerarMatricasDV(arquivo: File, fileName: string) {
    var formData: FormData = new FormData();
    formData.append("text", arquivo, arquivo.name);

    var reader = new FileReader();
    var r = new FileReader();
    reader.readAsBinaryString(arquivo);
    reader.onload = e => {
      //aqui o conteudo do txt e envia pro back-end para ser processado.
      const b64 = reader.result;
      this.service.gerarMatriculasDV(b64).subscribe((data: Arquivo) => {
        this.downloadArquivo = data; //recebe a resposta do back-end e adiciona na variavel downloadArquivo do tipo Arquivo
        //apos o arquivo ser processado no back-end ele realiza o download do txt através desse metódo.
        this.downloadFile(this.downloadArquivo.arquivo, fileName);
      });
    };
  }

  verificarMatriculas(arquivo: File, fileName: string) {
    var formData: FormData = new FormData();
    formData.append("text", arquivo, arquivo.name);

    var reader = new FileReader();
    var r = new FileReader();
    reader.readAsBinaryString(arquivo);
    reader.onload = e => {
      const b64 = reader.result;
      this.service.matriculasParaVerificar(b64).subscribe((data: Arquivo) => {
        this.downloadArquivo = data; //recebe a resposta do back-end e adiciona na variavel downloadArquivo do tipo Arquivo
        this.downloadFile(this.downloadArquivo.arquivo, fileName);
      });
    };
  }

  downloadFile(data: string, fileName: string) {

    /*o back-end retorna uma string base64 do arquivo
    e aqui eu o transformo em blob para conseguir realizar o download.
    */

    var byteCharacters = atob(data);
  var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: "application/octet-stream" }); //conversão de byteArray para Blob
    fileName = fileName + ".txt"; //nome do arquivo e extensão
    
    if(window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    }else{
      var link = document.createElement('a');
      link.setAttribute("type", "hidden");
      link.download = fileName;
      link.href = window.URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
    }

     //faz um reload na página após o processamento.
    window.location.reload();

  }
}
