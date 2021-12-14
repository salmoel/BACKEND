import * as mongoose from 'mongoose';

mongoose.Schema.Types.Boolean.convertToFalse.add('');
export const VoluntarySchema = new mongoose.Schema({
  // _id: {type: mongoose.Schema.Types.ObjectId},
  nome: String,
  CPF: String,
  typeUser: String,
  dataNascimento: String,
  sexo: String,
  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    complemento: String,
    uf: String,
    CEP: String,
  },
  profissao: String,
  telefone: String,
  telefoneFx: String,
  estadoCivil: String,
  email: String,
  password: String,
  nomeIg: String,
  pastor: String,
  typeVoluntary: {
    chekbox1Profissao: Boolean,
    chekbox2Intercessor: Boolean,
    chekbox3Cuidador: Boolean,
    chekbox4CasaDescanso: Boolean,
  },
  chekbox5Aconselhamento: Boolean,
  aconselhamentoBiblico: {
    seuMinistrioNaIgreja: String,
    cursoAconselhamentoBiblico: String,
    ondeCursou: String,
    anoDeConclusaoCurso: String,
    experienciaAconselhamentoBiblico: String,
  },
  voluntarioProfissao: {
    especialidade: String,
    dicasEspecialidade: String,
    servicoOferecido: String,
    servicoOferecidoOutros: String,
  },
  voluntarioIntercessor:{
    ministerioNaIgreja: String,
    habilidadesWhatsapp: String,
  },

  urlsImage: {
    urlImgPrincipal: String,
    urlImgCasaDescansoPrincipal: String,
    urlImgsCasaDescanso: [],
  },

  dataCad: String,
  status: String,
  localDescanso: {
    typeLocalDescanso: {
      casaDePraia: Boolean,
      casaDeCampo: Boolean,
      pousada: Boolean,
      hotel: Boolean,
      outros: Boolean,
    },
    nomeLocalDescanso: String,
    CNPJLocalDescanso: String,
    enderecoLocalDescanso: {
      ruaLocalDescanso: String,
      numeroLocalDescanso: String,
      complementoLocalDescanso: String,
      CEPLocalDescanso: String,
      bairroLocalDescanso: String,
      cidadeLocalDescanso: String,
      ufLocalDescanso: String,
    },
    estaraDisponivel: {
      duranteTodoAno: Boolean,
      exetoFinaisDeSemana: Boolean,
      exetoFeriadosProlongadosComemorativos: Boolean,
      baixaTemporada: Boolean,
      outrasDisponibilidades: Boolean,
      outrasDisponibilidadesDescrito: String,
    },
    maximoDiariaPg: String,
    maximoHospedesPorVez: String,
    qtFamiliaMes: String,
    custoHospedagem: String,
    valorHospedagem: String,
    alimentacao: String,

    valorRefeicoes: String,
    qtQuartos: String,
    qtSuites: String,
    qtCamasCasal: String,
    qtCamasSolteiro: String,
    camaDescrito: String,
    servicosDisponibilizados: {
      quarto: {
        roupaCama: Boolean,
        travesseiros: Boolean,
        outrosQuarto: String,
      },
      cozinha: {
        geladeira: Boolean,
        fogao: Boolean,
        microOndas: Boolean,
        mesaJantar: Boolean,
        itensBasicos: Boolean,
        utensiliosBasicos: Boolean,
        outrosCozinha: String,
      },
      banheiros: {
        roupaBanho: Boolean,
        itensBasicosHigiene: Boolean,
        itensBasicosBeleza: Boolean,
        outrosBanheiro: String,
      },
      salaEstar: {
        TV: Boolean,
        internet: Boolean,
        sofa: Boolean,
        outrosSalaEstar: String,
      },
      areaExterna: {
        garagem: Boolean,
        piscina: Boolean,
        churasqueira: Boolean,
        quadra: Boolean,
        jogos: Boolean,
        restaurantes: Boolean,
        outrosareaExeterna: String,
      },
      outrosServicosOferecidos: Boolean,
      outrosServicosOferecidosDescrito: String,
    },
  },
});
