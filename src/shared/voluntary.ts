import { Document } from 'mongoose';

export class Voluntary extends Document {
  _id?: string;
  typeUser: string;
  nome: string;
  CPF: string;
  dataNascimento: string;
  sexo: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    complemento: string;
    uf: string;
    CEP: string;
  };
  profissao: string;
  telefone: string;
  telefoneFx: string;
  estadoCivil: string;
  email: string;
  password: string;
  nomeIg: string;
  pastor: string;
  typeVoluntary: {
    chekbox1Profissao: boolean;
    chekbox2Intercessor: boolean;
    chekbox3Cuidador: boolean;
    chekbox4CasaDescanso: boolean;
  };
  chekbox5Aconselhamento: boolean;
  aconselhamentoBiblico: {
    seuMinistrioNaIgreja: string;
    cursoAconselhamentoBiblico: string;
    ondeCursou: string;
    anoDeConclusaoCurso: string;
    experienciaAconselhamentoBiblico: string;
  };
  voluntarioProfissao: {
    especialidade: string;
    dicasEspecialidade: string;
    servicoOferecido: {
      servicoOferecidoAtendimentos: boolean;
      servicoOferecidoConsultorias: boolean;
      servicoOferecidoPalestras: boolean;
      servicoOferecidoGruposDeOrientacaoWhatsapp: boolean;
      servicoOferecidoEscreverConteudos: boolean;
      servicoOferecidoOutros: boolean;
      servicoOferecidoOutrosDescrito: string;
    };
  };
  voluntarioIntercessor: {
    ministerioNaIgreja: string;
    habilidadesWhatsapp: string;
  };
  urlsImage: {
    urlImgPrincipal: string;
    urlImgCasaDescansoPrincipal: string;
    urlImgsCasaDescanso: [];
  };
  dataCad: string;
  status: string;
  localDescanso: {
    typeLocalDescanso: {
      casaDePraia: boolean;
      casaDeCampo: boolean;
      pousada: boolean;
      hotel: boolean;
      outros: boolean;
    };
    nomeLocalDescanso: string;
    CNPJLocalDescanso: string;
    enderecoLocalDescanso: {
      ruaLocalDescanso: string;
      numeroLocalDescanso: string;
      complementoLocalDescanso: string;
      CEPLocalDescanso: string;
      bairroLocalDescanso: string;
      cidadeLocalDescanso: string;
      ufLocalDescanso: string;
    };
    estaraDisponivel: {
      duranteTodoAno: boolean;
      exetoFinaisDeSemana: boolean;
      exetoFeriadosProlongadosComemorativos: boolean;
      baixaTemporada: boolean;
      outrasDisponibilidades: boolean;
      outrasDisponibilidadesDescrito: string;
    };
    maximoDiariaPg: string;
    maximoHospedesPorVez: string;
    qtFamiliaMes: string;
    custoHospedagem: string;
    valorHospedagem: string;
    alimentacao: boolean;
    valorRefeicoes: string;
    qtQuartos: string;
    qtSuites: string;
    qtCamasCasal: string;
    qtCamasSolteiro: string;
    camaDescrito: string;
    servicosDisponibilizados: {
      quarto: {
        roupaCama: boolean;
        travesseiros: boolean;
        outrosQuarto: string;
      };
      cozinha: {
        geladeira: boolean;
        fogao: boolean;
        microOndas: boolean;
        mesaJantar: boolean;
        itensBasicos: boolean;
        utensiliosBasicos: boolean;
        outrosCozinha: string;
      };
      banheiros: {
        roupaBanho: boolean;
        itensBasicosHigiene: boolean;
        itensBasicosBeleza: boolean;
        outrosBanheiro: string;
      };
      salaEstar: {
        TV: boolean;
        internet: boolean;
        sofa: boolean;
        outrosSalaEstar: string;
      };
      areaExterna: {
        garagem: boolean;
        piscina: boolean;
        churasqueira: boolean;
        quadra: boolean;
        jogos: boolean;
        restaurantes: boolean;
        outrosareaExeterna: string;
      };
      outrosServicosOferecidos: boolean;
      outrosServicosOferecidosDescrito: string;
    };
  };
}
